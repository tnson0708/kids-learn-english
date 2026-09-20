"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Download, ImageUp, Printer } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { imageDataToColoringPage } from "@/lib/coloring-page";
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
  const [sensitivity, setSensitivity] = useState(55);
  const [smoothing, setSmoothing] = useState(1);
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

    const result = imageDataToColoringPage(source, { sensitivity, smoothing });
    ctx.putImageData(result, 0, 0);
  }, [sensitivity, smoothing]);

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
  }, [sensitivity, smoothing, scheduleProcess]);

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
      <div className="flex w-full shrink-0 flex-col gap-5 rounded-3xl border border-border bg-card p-5 print:hidden md:w-72">
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
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-art-accent px-4 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90"
        >
          <ImageUp className="size-4" />
          {photoUrl ? t("art_coloring_change_photo") : t("art_coloring_upload_button")}
        </button>

        {photoUrl && (
          <>
            <div className="overflow-hidden rounded-xl border border-border">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photoUrl} alt="" className="block max-h-32 w-full object-contain" />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-muted-foreground" htmlFor="sensitivity">
                {t("art_coloring_sensitivity_label")}
              </label>
              <input
                id="sensitivity"
                type="range"
                min={10}
                max={90}
                value={sensitivity}
                onChange={(e) => setSensitivity(Number(e.target.value))}
                className="w-full accent-[var(--art-accent)]"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-muted-foreground" htmlFor="smoothing">
                {t("art_coloring_smoothing_label")}
              </label>
              <input
                id="smoothing"
                type="range"
                min={0}
                max={4}
                value={smoothing}
                onChange={(e) => setSmoothing(Number(e.target.value))}
                className="w-full accent-[var(--art-accent)]"
              />
            </div>

            <button
              type="button"
              onClick={handlePrint}
              className="mt-auto inline-flex items-center justify-center gap-2 rounded-xl bg-foreground px-4 py-3 text-sm font-bold text-background transition-opacity hover:opacity-90"
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
          </>
        )}

        <p className="text-[11px] leading-relaxed text-muted-foreground">{t("art_coloring_privacy_note")}</p>
      </div>

      {/* Result paper */}
      <div className="flex flex-1 justify-center overflow-x-auto print:overflow-visible">
        <div className="w-full max-w-[794px] rounded-2xl bg-card p-8 shadow-md print:rounded-none print:p-6 print:shadow-none sm:p-10">
          {!photoUrl && (
            <p className="py-20 text-center text-sm text-muted-foreground">{t("art_coloring_empty_hint")}</p>
          )}
          <div className={cn("relative", !photoUrl && "hidden")}>
            {isProcessing && (
              <div className="absolute inset-0 flex items-center justify-center bg-card/70 text-sm font-bold text-muted-foreground print:hidden">
                {t("art_coloring_processing")}
              </div>
            )}
            <canvas ref={resultCanvasRef} className="block h-auto w-full rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}
