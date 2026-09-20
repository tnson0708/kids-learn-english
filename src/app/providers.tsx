"use client";

import { LanguageProvider } from "@/lib/language-context";
import { RewardProvider } from "@/lib/reward-context";
import { VoiceProvider } from "@/lib/voice-context";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <VoiceProvider>
        <RewardProvider>{children}</RewardProvider>
      </VoiceProvider>
    </LanguageProvider>
  );
}

