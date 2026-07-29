"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Gamepad2, HelpCircle, Home, ImageIcon } from "lucide-react";
import { LanguageToggle } from "@/components/language-toggle";
import { VoiceToggle } from "@/components/voice-toggle";
import { useLanguage } from "@/lib/language-context";
import { cn } from "@/lib/utils";

export function Nav() {
  const pathname = usePathname();
  const { t } = useLanguage();

  const links = [
    { href: "/", label: t("nav_home"), icon: Home },
    { href: "/alphabet", label: t("nav_alphabet"), icon: BookOpen },
    { href: "/vocabulary", label: t("nav_vocabulary"), icon: ImageIcon },
    { href: "/qna", label: t("nav_qna"), icon: HelpCircle },
    { href: "/quiz", label: t("nav_quiz"), icon: Gamepad2 },
  ];

  return (
    <>
      {/* Top Header */}
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="mx-auto flex h-16 sm:h-20 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
          <Link
            href="/"
            className="flex items-center gap-2 font-heading text-xl font-black tracking-tight text-primary shrink-0 sm:text-2xl"
          >
            <span className="text-2xl sm:text-3xl" aria-hidden>🐝</span>
            <span>{t("app_name")}</span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-2">
            {links.map((link) => {
              const Icon = link.icon;
              const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-extrabold whitespace-nowrap transition-all active:scale-95 lg:px-5 lg:py-3 lg:text-base",
                    active
                      ? "bg-primary text-primary-foreground shadow-xs"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  <Icon className="size-4.5 lg:size-5 shrink-0" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Top Toggles (Voice & Language) */}
          <div className="flex items-center gap-2 shrink-0">
            <VoiceToggle />
            <LanguageToggle />
          </div>
        </div>
      </header>

      {/* Mobile & iPad Fixed Bottom Navigation Bar (No horizontal scroll, 100% full width touch targets) */}
      <nav aria-label="Mobile Navigation" className="fixed bottom-0 left-0 right-0 z-50 lg:hidden border-t bg-background/98 backdrop-blur shadow-2xl pb-safe">
        <div className="mx-auto grid h-16 sm:h-20 max-w-md sm:max-w-xl grid-cols-5 items-center px-1">
          {links.map((link) => {
            const Icon = link.icon;
            const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex flex-col items-center justify-center gap-1 py-1.5 px-1 rounded-2xl transition-all active:scale-90",
                  active
                    ? "text-primary font-black scale-105"
                    : "text-muted-foreground hover:text-foreground font-bold"
                )}
              >
                <div
                  className={cn(
                    "flex items-center justify-center rounded-2xl p-1.5 transition-colors",
                    active ? "bg-primary/15 text-primary" : "bg-transparent"
                  )}
                >
                  <Icon className="size-5 sm:size-6 shrink-0" />
                </div>
                <span className="text-[10px] sm:text-xs text-center leading-none tracking-tight whitespace-nowrap">
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
