"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BookOpen, Gamepad2, HelpCircle, Home, ImageIcon, Menu, X } from "lucide-react";
import { LanguageToggle } from "@/components/language-toggle";
import { VoiceToggle } from "@/components/voice-toggle";
import { useLanguage } from "@/lib/language-context";
import { cn } from "@/lib/utils";

export function Nav() {
  const pathname = usePathname();
  const { t } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);

  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setMobileOpen(false);
  }

  const links = [
    { href: "/", label: t("nav_home"), icon: Home },
    { href: "/alphabet", label: t("nav_alphabet"), icon: BookOpen },
    { href: "/vocabulary", label: t("nav_vocabulary"), icon: ImageIcon },
    { href: "/qna", label: t("nav_qna"), icon: HelpCircle },
    { href: "/quiz", label: t("nav_quiz"), icon: Gamepad2 },
  ];

  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2.5 font-heading text-xl font-black tracking-tight text-primary shrink-0 sm:text-2xl"
        >
          <span className="text-3xl sm:text-4xl" aria-hidden>🐝</span>
          <span>{t("app_name")}</span>
        </Link>

        <nav className="hidden md:flex items-center gap-2">
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

        <div className="flex items-center gap-2.5 shrink-0">
          <VoiceToggle />
          <LanguageToggle />

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="flex md:hidden items-center justify-center rounded-2xl border bg-card p-3 text-muted-foreground shadow-xs transition-colors hover:bg-accent hover:text-foreground active:scale-95"
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            {mobileOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t bg-background/98 p-3 shadow-lg animate-in slide-in-from-top-2 duration-150">
          <nav className="flex flex-col gap-1">
            {links.map((link) => {
              const Icon = link.icon;
              const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3.5 py-2.5 text-sm font-bold transition-colors",
                    active ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-accent"
                  )}
                >
                  <Icon className="size-4 shrink-0 opacity-80" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
