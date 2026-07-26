"use client";

import { useSyncExternalStore } from "react";
import {
  getVoiceGender,
  getVoiceGenderServerSnapshot,
  setVoiceGender,
  speakEnglish,
  subscribeVoiceGender,
  type VoiceGender,
} from "@/lib/speech";
import { useLanguage } from "@/lib/language-context";
import { cn } from "@/lib/utils";

export function VoiceToggle() {
  const { t } = useLanguage();
  const gender = useSyncExternalStore(
    subscribeVoiceGender,
    getVoiceGender,
    getVoiceGenderServerSnapshot
  );

  const handleGenderChange = (newGender: VoiceGender) => {
    setVoiceGender(newGender);
    speakEnglish("Hello!", newGender);
  };

  return (
    <div className="flex items-center rounded-full border bg-muted/80 p-1 text-xs shadow-2xs">
      <button
        type="button"
        onClick={() => handleGenderChange("female")}
        className={cn(
          "inline-flex items-center gap-1 rounded-full px-2.5 py-1 font-semibold transition-all duration-150",
          gender === "female"
            ? "bg-primary text-primary-foreground shadow-xs"
            : "text-muted-foreground hover:text-foreground font-normal opacity-70 hover:opacity-100"
        )}
        title={t("voice_female")}
        aria-label={t("voice_female")}
      >
        <span>👩</span>
        <span className="hidden sm:inline">{t("voice_female")}</span>
      </button>

      <button
        type="button"
        onClick={() => handleGenderChange("male")}
        className={cn(
          "inline-flex items-center gap-1 rounded-full px-2.5 py-1 font-semibold transition-all duration-150",
          gender === "male"
            ? "bg-primary text-primary-foreground shadow-xs"
            : "text-muted-foreground hover:text-foreground font-normal opacity-70 hover:opacity-100"
        )}
        title={t("voice_male")}
        aria-label={t("voice_male")}
      >
        <span>👨</span>
        <span className="hidden sm:inline">{t("voice_male")}</span>
      </button>
    </div>
  );
}
