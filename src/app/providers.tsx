"use client";

import { LanguageProvider } from "@/lib/language-context";
import { RewardProvider } from "@/lib/reward-context";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <RewardProvider>{children}</RewardProvider>
    </LanguageProvider>
  );
}

