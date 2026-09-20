"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Gift, Home, ShieldCheck } from "lucide-react";
import { LanguageToggle } from "@/components/language-toggle";
import { VoiceToggle } from "@/components/voice-toggle";
import { VoiceEnabledToggle } from "@/components/voice-enabled-toggle";
import { ParentPinModal } from "@/components/parent-pin-modal";
import { ParentControlModal } from "@/components/parent-control-modal";
import { GoldCoin } from "@/components/gold-coin";
import { useLanguage } from "@/lib/language-context";
import { useReward } from "@/lib/reward-context";
import { cn } from "@/lib/utils";

const TOP_NAV_LINKS = [
  { href: "/", key: "nav_home" as const },
  { href: "/#core-subjects", key: "nav_subjects" as const },
  { href: "/english/quiz", key: "nav_quiz" as const },
  { href: "/gifts", key: "nav_gifts" as const },
] as const;

export function Nav() {
  const pathname = usePathname();
  const { t } = useLanguage();
  const { coins, rewardedItemIds } = useReward();

  const [showPinModal, setShowPinModal] = useState(false);
  const [showParentModal, setShowParentModal] = useState(false);

  const handleOpenParentControl = () => {
    setShowPinModal(true);
  };

  const handlePinSuccess = () => {
    setShowParentModal(true);
  };

  return (
    <>
      {/* Top Header */}
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 print:hidden">
        <div className="mx-auto flex h-16 sm:h-20 max-w-6xl items-center justify-between gap-2 px-3 sm:px-6">
          <Link
            href="/"
            className="flex flex-col shrink-0 font-heading text-lg sm:text-xl font-black tracking-tight text-primary"
          >
            <span className="flex items-center gap-1.5">
              <span className="text-xl sm:text-2xl" aria-hidden>🦁</span>
              <span className="hidden xs:inline sm:inline">{t("app_name")}</span>
            </span>
            <span className="hidden text-[10px] font-semibold text-muted-foreground sm:block">
              {t("app_tagline")}
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden items-center gap-1 lg:flex">
            {TOP_NAV_LINKS.map((link) => {
              const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "rounded-full px-3 py-2 text-sm font-bold whitespace-nowrap transition-all active:scale-95",
                    active
                      ? "bg-primary text-primary-foreground shadow-xs"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  {t(link.key)}
                </Link>
              );
            })}
            <button
              type="button"
              onClick={handleOpenParentControl}
              className="rounded-full px-3 py-2 text-sm font-bold text-muted-foreground transition-all hover:bg-accent hover:text-accent-foreground active:scale-95"
            >
              {t("nav_parent_corner")}
            </button>
          </nav>

          {/* Top Header Right Controls (Stars, Coins, Voice, Language) */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Stars earned (rewarded items) */}
            <span className="hidden items-center gap-1 rounded-full border-2 border-amber-300 bg-amber-50 px-2.5 py-1 text-xs font-black text-amber-700 dark:border-amber-600 dark:bg-amber-950/60 dark:text-amber-300 sm:flex">
              <span aria-hidden>⭐</span> {rewardedItemIds.length}
            </span>

            {/* Live Coins Badge */}
            <Link
              href="/gifts"
              className="flex items-center gap-1.5 rounded-full border-2 border-amber-400 bg-amber-50 dark:bg-amber-950/60 dark:border-amber-500 px-2.5 py-1 sm:px-3 sm:py-1.5 transition-all hover:scale-105 active:scale-95 shadow-xs"
            >
              <GoldCoin className="size-5 sm:size-6" />
              <span className="font-heading text-xs sm:text-sm font-black text-amber-700 dark:text-amber-300">
                {coins} <span className="hidden xs:inline text-[11px] font-extrabold">{t("gifts_dong")}</span>
              </span>
            </Link>

            {/* Parent Control Button (mobile/tablet fallback — desktop uses the nav link above) */}
            <button
              type="button"
              onClick={handleOpenParentControl}
              title={t("nav_parent_corner")}
              className="flex items-center gap-1 rounded-full bg-primary/10 border border-primary/20 px-2.5 py-1.5 text-xs font-extrabold text-primary transition-all hover:bg-primary/20 active:scale-95 lg:hidden"
            >
              <ShieldCheck className="size-4" />
            </button>

            <VoiceEnabledToggle />
            <VoiceToggle />
            <LanguageToggle />
          </div>
        </div>
      </header>

      {/* Parent Modals */}
      <ParentPinModal
        open={showPinModal}
        onOpenChange={setShowPinModal}
        onSuccess={handlePinSuccess}
      />
      <ParentControlModal
        open={showParentModal}
        onOpenChange={setShowParentModal}
      />

      {/* Mobile Floating Bottom Navigation Bar */}
      <nav
        aria-label="Mobile Navigation"
        className="fixed bottom-2 left-2 right-2 sm:bottom-4 sm:left-6 sm:right-6 z-50 lg:hidden rounded-3xl border bg-background/95 backdrop-blur-md shadow-2xl mb-[env(safe-area-inset-bottom,0px)] print:hidden"
      >
        <div className="mx-auto grid h-16 sm:h-18 max-w-xs grid-cols-2 items-center px-1">
          {[
            { href: "/", label: t("nav_home"), icon: Home },
            { href: "/gifts", label: t("nav_gifts"), icon: Gift },
          ].map((link) => {
            const Icon = link.icon;
            const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex flex-col items-center justify-center gap-0.5 py-1 px-0.5 rounded-2xl transition-all active:scale-90",
                  active
                    ? "text-primary font-black scale-105"
                    : "text-muted-foreground hover:text-foreground font-bold"
                )}
              >
                <div
                  className={cn(
                    "flex items-center justify-center rounded-2xl p-1 sm:p-1.5 transition-colors",
                    active ? "bg-primary/15 text-primary" : "bg-transparent"
                  )}
                >
                  <Icon className="size-4.5 sm:size-5 shrink-0" />
                </div>
                <span className="text-[9px] sm:text-[11px] text-center leading-none tracking-tighter whitespace-nowrap">
                  {link.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}

