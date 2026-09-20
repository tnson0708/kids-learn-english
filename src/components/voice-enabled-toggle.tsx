"use client";

import { Volume2, VolumeX } from "lucide-react";
import { useVoice } from "@/lib/voice-context";
import { useLanguage } from "@/lib/language-context";
import { cn } from "@/lib/utils";

export function VoiceEnabledToggle() {
  const { t } = useLanguage();
  const { enabled, toggleEnabled } = useVoice();

  return (
    <button
      type="button"
      onClick={toggleEnabled}
      title={enabled ? t("voice_on") : t("voice_off")}
      aria-label={enabled ? t("voice_on") : t("voice_off")}
      aria-pressed={enabled}
      className={cn(
        "flex size-9 sm:size-10 items-center justify-center rounded-full border-2 shadow-2xs transition-all active:scale-90",
        enabled
          ? "border-primary/30 bg-primary/10 text-primary"
          : "border-border bg-muted/60 text-muted-foreground"
      )}
    >
      {enabled ? <Volume2 className="size-4 sm:size-5" /> : <VolumeX className="size-4 sm:size-5" />}
    </button>
  );
}
