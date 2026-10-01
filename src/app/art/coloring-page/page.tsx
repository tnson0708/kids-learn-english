"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Download, ImageUp, Printer, SlidersHorizontal, Wand2 } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { DetailLevel, imageDataToColoringPage } from "@/lib/coloring-page";
import { cn } from "@/lib/utils";

const MAX_DIMENSION = 1600;

function loadImageDataFromFile(file: File): Promise<{ url: string; imageData: ImageData }> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      let { width, height } = img;
      if (width > height && width > MAX_DIMENSION) {
        height = Math.round((height * MAX_DIMENSION) / width);
        width = MAX_DIMENSION;
      } else if (height > MAX_DIMENSION) {
        width = Math.round((width * MAX_DIMENSION) / height);
        height = MAX_DIMENSION;
      }

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Canvas not supported"));
        return;
      }
      ctx.drawImage(img, 0, 0, width, height);
      resolve({ url, imageData: ctx.getImageData(0, 0, width, height) });
    };
    img.onerror = () => reject(new Error("Could not read image"));
    img.src = url;
  });
}

export default function ColoringPageTool() {
  const { t } = useLanguage();

  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [detailLevel, setDetailLevel] = useState<DetailLevel>("simple");
  const [lineThickness, setLineThickness] = useState<number>(2);
  const [removeNoiseAmount, setRemoveNoiseAmount] = useState<number>(75);
  const [sensitivity, setSensitivity] = useState<number>(55);
  const [smoothing, setSmoothing] = useState<number>(1);
  const [viewMode, setViewMode] = useState<"result" | "compare">("result");
  const [isProcessing, setIsProcessing] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const resultCanvasRef = useRef<HTMLCanvasElement>(null);
  const sourceImageDataRef = useRef<ImageData | null>(null);
  const rafRef = useRef<number | null>(null);

  const process = useCallback(() => {
    const source = sourceImageDataRef.current;
    const canvas = resultCanvasRef.current;
    if (!source || !canvas) return;

    canvas.width = source.width;
    canvas.height = source.height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const result = imageDataToColoringPage(source, {
      sensitivity,
      smoothing,
      detailLevel,
      lineThickness,
      removeNoiseAmount,
    });
    ctx.putImageData(result, 0, 0);
  }, [sensitivity, smoothing, detailLevel, lineThickness, removeNoiseAmount]);

  const scheduleProcess = useCallback(() => {
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    setIsProcessing(true);
    rafRef.current = requestAnimationFrame(() => {
      process();
      setIsProcessing(false);
    });
  }, [process]);

  useEffect(() => {
    if (sourceImageDataRef.current) scheduleProcess();
  }, [sensitivity, smoothing, detailLevel, lineThickness, removeNoiseAmount, scheduleProcess]);

  useEffect(() => {
    return () => {
      if (photoUrl) URL.revokeObjectURL(photoUrl);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [photoUrl]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    if (photoUrl) URL.revokeObjectURL(photoUrl);

    try {
      const { url, imageData } = await loadImageDataFromFile(file);
      sourceImageDataRef.current = imageData;
      setPhotoUrl(url);
      scheduleProcess();
    } catch {
      sourceImageDataRef.current = null;
      setPhotoUrl(null);
    }
  };

  const handlePrint = () => window.print();

  const handleDownload = () => {
    const canvas = resultCanvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "coloring-page.png";
    link.click();
  };

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 px-4 py-8 md:flex-row print:block print:max-w-none print:px-0 print:py-0">
      {/* Sidebar controls */}
      <div className="flex w-full shrink-0 flex-col gap-5 rounded-3xl border border-border bg-card p-5 print:hidden md:w-80">
        <div>
          <h1 className="font-heading text-xl font-black text-foreground">{t("art_coloring_title")}</h1>
          <p className="mt-1 text-xs text-muted-foreground">{t("art_coloring_subtitle")}</p>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleFileChange}
          className="hidden"
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-art-accent px-4 py-3 text-sm font-bold text-white shadow-sm transition-opacity hover:opacity-90"
        >
          <ImageUp className="size-4" />
          {photoUrl ? t("art_coloring_change_photo") : t("art_coloring_upload_button")}
        </button>

        {photoUrl && (
          <>
            {/* View Mode Toggle */}
            <div className="flex items-center rounded-xl bg-muted/60 p-1">
              <button
                type="button"
                onClick={() => setViewMode("result")}
                className={cn(
                  "flex-1 rounded-lg py-1.5 text-xs font-bold transition-all",
                  viewMode === "result"
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {t("art_coloring_view_result")}
              </button>
              <button
                type="button"
                onClick={() => setViewMode("compare")}
                className={cn(
                  "flex-1 rounded-lg py-1.5 text-xs font-bold transition-all",
                  viewMode === "compare"
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {t("art_coloring_view_compare")}
              </button>
            </div>

            {/* Detail Level Preset */}
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-1.5 text-xs font-bold text-foreground">
                <Wand2 className="size-3.5 text-art-accent" />
                {t("art_coloring_preset_label")}
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {(["simple", "medium", "detailed"] as DetailLevel[]).map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => {
                      setDetailLevel(level);
                      if (level === "simple") {
                        setRemoveNoiseAmount(80);
                        setLineThickness(2);
                      } else if (level === "medium") {
                        setRemoveNoiseAmount(60);
                        setLineThickness(2);
                      } else {
                        setRemoveNoiseAmount(30);
                        setLineThickness(1);
                      }
                    }}
                    className={cn(
                      "rounded-xl border py-2 text-center text-xs font-bold transition-all",
                      detailLevel === level
                        ? "border-art-accent bg-art-accent/10 text-art-accent"
                        : "border-border bg-background/50 text-muted-foreground hover:border-border/80"
                    )}
                  >
                    {level === "simple" && t("art_coloring_preset_simple")}
                    {level === "medium" && t("art_coloring_preset_medium")}
                    {level === "detailed" && t("art_coloring_preset_detailed")}
                  </button>
                ))}
              </div>
            </div>

            {/* Line Thickness */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-foreground">
                {t("art_coloring_line_thickness_label")}
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { value: 1, label: t("art_coloring_thickness_thin") },
                  { value: 2, label: t("art_coloring_thickness_medium") },
                  { value: 3, label: t("art_coloring_thickness_thick") },
                ].map((item) => (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => setLineThickness(item.value)}
                    className={cn(
                      "rounded-xl border py-2 text-center text-xs font-bold transition-all",
                      lineThickness === item.value
                        ? "border-art-accent bg-art-accent/10 text-art-accent"
                        : "border-border bg-background/50 text-muted-foreground hover:border-border/80"
                    )}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Filter Noise Amount */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-foreground">{t("art_coloring_filter_noise_label")}</span>
                <span className="text-muted-foreground">{removeNoiseAmount}%</span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                step={5}
                value={removeNoiseAmount}
                onChange={(e) => setRemoveNoiseAmount(Number(e.target.value))}
                className="w-full accent-[var(--art-accent)]"
              />
            </div>

            {/* Advanced adjustments details */}
            <details className="group rounded-xl border border-border bg-muted/30 p-3">
              <summary className="flex cursor-pointer items-center justify-between text-xs font-bold text-muted-foreground hover:text-foreground">
                <span className="flex items-center gap-1.5">
                  <SlidersHorizontal className="size-3.5" />
                  {t("art_coloring_sensitivity_label")} & {t("art_coloring_smoothing_label")}
                </span>
              </summary>
              <div className="mt-3 flex flex-col gap-3 border-t border-border/50 pt-3">
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between text-[11px] font-bold text-muted-foreground">
                    <span>{t("art_coloring_sensitivity_label")}</span>
                    <span>{sensitivity}</span>
                  </div>
                  <input
                    type="range"
                    min={10}
                    max={90}
                    value={sensitivity}
                    onChange={(e) => setSensitivity(Number(e.target.value))}
                    className="w-full accent-[var(--art-accent)]"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between text-[11px] font-bold text-muted-foreground">
                    <span>{t("art_coloring_smoothing_label")}</span>
                    <span>{smoothing}</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={4}
                    value={smoothing}
                    onChange={(e) => setSmoothing(Number(e.target.value))}
                    className="w-full accent-[var(--art-accent)]"
                  />
                </div>
              </div>
            </details>

            {/* Action buttons */}
            <div className="mt-auto flex flex-col gap-2 pt-2">
              <button
                type="button"
                onClick={handlePrint}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-foreground px-4 py-3 text-sm font-bold text-background transition-opacity hover:opacity-90"
              >
                <Printer className="size-4" />
                {t("art_coloring_print")}
              </button>
              <button
                type="button"
                onClick={handleDownload}
                className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-foreground px-4 py-2.5 text-sm font-bold text-foreground transition-colors hover:bg-muted/60"
              >
                <Download className="size-4" />
                {t("art_coloring_download")}
              </button>
            </div>
          </>
        )}

        <p className="text-[11px] leading-relaxed text-muted-foreground">{t("art_coloring_privacy_note")}</p>
      </div>

      {/* Result paper area */}
      <div className="flex flex-1 justify-center overflow-x-auto print:overflow-visible">
        <div className="w-full max-w-[850px] rounded-2xl bg-card p-6 shadow-md print:rounded-none print:p-6 print:shadow-none sm:p-8">
          {!photoUrl ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="mb-4 flex size-16 items-center justify-center rounded-2xl bg-art-accent/10 text-art-accent">
                <Wand2 className="size-8" />
              </div>
              <p className="max-w-xs text-sm font-semibold text-muted-foreground">{t("art_coloring_empty_hint")}</p>
            </div>
          ) : (
            <div className={cn("grid gap-6", viewMode === "compare" ? "grid-cols-1 md:grid-cols-2 print:grid-cols-1" : "grid-cols-1")}>
              {viewMode === "compare" && (
                <div className="flex flex-col gap-2 print:hidden">
                  <span className="text-xs font-bold text-muted-foreground">{t("art_coloring_original_label")}</span>
                  <div className="overflow-hidden rounded-xl border border-border bg-muted/20 p-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={photoUrl} alt="" className="block h-auto w-full rounded-lg object-contain" />
                  </div>
                </div>
              )}

              <div className="flex flex-col gap-2">
                {viewMode === "compare" && (
                  <span className="text-xs font-bold text-muted-foreground print:hidden">{t("art_coloring_result_label")}</span>
                )}
                <div className="relative overflow-hidden rounded-xl border border-border bg-white p-2 print:border-none print:p-0">
                  {isProcessing && (
                    <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/80 text-sm font-bold text-muted-foreground print:hidden">
                      {t("art_coloring_processing")}
                    </div>
                  )}
                  <canvas ref={resultCanvasRef} className="block h-auto w-full rounded-lg print:rounded-none" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
