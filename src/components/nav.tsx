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
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 font-heading text-lg font-extrabold tracking-tight text-primary shrink-0"
        >
          <span aria-hidden>🐝</span>
          <span>{t("app_name")}</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1.5">
          {links.map((link) => {
            const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-bold whitespace-nowrap transition-colors",
                  active
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 shrink-0">
          <VoiceToggle />
          <LanguageToggle />

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="flex md:hidden items-center justify-center rounded-lg border p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
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
