"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Gamepad2, Gift, HelpCircle, Home, ImageIcon, ShieldCheck } from "lucide-react";
import { LanguageToggle } from "@/components/language-toggle";
import { VoiceToggle } from "@/components/voice-toggle";
import { ParentPinModal } from "@/components/parent-pin-modal";
import { ParentControlModal } from "@/components/parent-control-modal";
import { GoldCoin } from "@/components/gold-coin";
import { useLanguage } from "@/lib/language-context";
import { useReward } from "@/lib/reward-context";
import { cn } from "@/lib/utils";

export function Nav() {
  const pathname = usePathname();
  const { t } = useLanguage();
  const { coins, isParentUnlocked } = useReward();

  const [showPinModal, setShowPinModal] = useState(false);
  const [showParentModal, setShowParentModal] = useState(false);

  const handleOpenParentControl = () => {
    setShowPinModal(true);
  };

  const handlePinSuccess = () => {
    setShowParentModal(true);
  };

  const links = [
    { href: "/", label: t("nav_home"), icon: Home },
    { href: "/alphabet", label: t("nav_alphabet"), icon: BookOpen },
    { href: "/vocabulary", label: t("nav_vocabulary"), icon: ImageIcon },
    { href: "/qna", label: t("nav_qna"), icon: HelpCircle },
    { href: "/quiz", label: t("nav_quiz"), icon: Gamepad2 },
    { href: "/gifts", label: t("nav_gifts"), icon: Gift },
  ];

  return (
    <>
      {/* Top Header */}
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="mx-auto flex h-16 sm:h-20 max-w-6xl items-center justify-between gap-2 px-3 sm:px-6">
          <Link
            href="/"
            className="flex items-center gap-2 font-heading text-lg sm:text-2xl font-black tracking-tight text-primary shrink-0"
          >
            <span className="text-xl sm:text-3xl" aria-hidden>🐝</span>
            <span className="hidden xs:inline sm:inline">{t("app_name")}</span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1.5">
            {links.map((link) => {
              const Icon = link.icon;
              const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-extrabold whitespace-nowrap transition-all active:scale-95 lg:px-4 lg:py-2.5 lg:text-sm",
                    active
                      ? "bg-primary text-primary-foreground shadow-xs"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  <Icon className="size-4 shrink-0" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Top Header Right Controls (Coins, Parent Control, Voice, Language) */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
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

            {/* Parent Control Button */}
            <button
              type="button"
              onClick={handleOpenParentControl}
              title="Quản lý của Ba Mẹ / Parent Control"
              className="flex items-center gap-1 rounded-full bg-primary/10 border border-primary/20 px-2.5 py-1.5 text-xs font-extrabold text-primary transition-all hover:bg-primary/20 active:scale-95"
            >
              <ShieldCheck className="size-4" />
              <span className="hidden md:inline">Ba Mẹ</span>
            </button>

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
        className="fixed bottom-2 left-2 right-2 sm:bottom-4 sm:left-6 sm:right-6 z-50 xl:hidden rounded-3xl border bg-background/95 backdrop-blur-md shadow-2xl mb-[env(safe-area-inset-bottom,0px)]"
      >
        <div className="mx-auto grid h-16 sm:h-18 max-w-lg grid-cols-6 items-center px-1">
          {links.map((link) => {
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

