"use client";

import type { ComponentType } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { BookOpen, Gamepad2, Gift, Home, ShieldCheck, X } from "lucide-react";
import { Dialog, DialogOverlay, DialogPortal, DialogTitle } from "@/components/ui/dialog";
import { LanguageToggle } from "@/components/language-toggle";
import { VoiceToggle } from "@/components/voice-toggle";
import { VoiceEnabledToggle } from "@/components/voice-enabled-toggle";
import { subjects } from "@/data/subjects";
import { useLanguage } from "@/lib/language-context";
import type { TranslationKey } from "@/lib/i18n";
import { cn } from "@/lib/utils";

interface MenuLink {
  href: string;
  key: TranslationKey;
  icon: ComponentType<{ className?: string }>;
}

const MENU_LINKS: MenuLink[] = [
  { href: "/", key: "nav_home", icon: Home },
  { href: "/#core-subjects", key: "nav_subjects", icon: BookOpen },
  { href: "/english/quiz", key: "nav_quiz", icon: Gamepad2 },
  { href: "/gifts", key: "nav_gifts", icon: Gift },
];

const isActivePath = (pathname: string, href: string) =>
  href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

interface MobileMenuProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onOpenParentCorner: () => void;
}

export function MobileMenu({ open, onOpenChange, onOpenParentCorner }: MobileMenuProps) {
  const pathname = usePathname();
  const { t } = useLanguage();

  const currentSubject = subjects.find(
    (subject) => subject.lessons?.length && isActivePath(pathname, subject.href)
  );

  const close = () => onOpenChange(false);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogOverlay className="z-[60] bg-black/30" />
        <DialogPrimitive.Popup
          data-slot="mobile-menu"
          className="fixed inset-y-0 left-0 z-[60] flex w-[85%] max-w-xs flex-col gap-4 overflow-y-auto bg-background p-4 pb-[max(1rem,env(safe-area-inset-bottom))] shadow-2xl outline-none duration-200 data-open:animate-in data-open:slide-in-from-left data-closed:animate-out data-closed:slide-out-to-left"
        >
          <DialogTitle className="sr-only">{t("nav_menu")}</DialogTitle>

          <div className="flex items-center justify-between">
            <Link
              href="/"
              onClick={close}
              className="flex items-center gap-2 font-heading text-xl font-black tracking-tight text-primary"
            >
              <span className="text-2xl" aria-hidden>
                🦁
              </span>
              <span>{t("app_name")}</span>
            </Link>
            <DialogPrimitive.Close
              aria-label={t("nav_close")}
              className="flex size-10 items-center justify-center rounded-full border bg-card text-foreground transition-all active:scale-95"
            >
              <X className="size-5" />
            </DialogPrimitive.Close>
          </div>

          <nav className="flex flex-col gap-1">
            {MENU_LINKS.map(({ href, key, icon: Icon }) => {
              const active = isActivePath(pathname, href) && !href.includes("#");
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={close}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-3 py-3 text-base font-extrabold transition-all active:scale-[0.98]",
                    active ? "bg-primary text-primary-foreground shadow-xs" : "text-foreground hover:bg-accent"
                  )}
                >
                  <Icon className="size-5 shrink-0" />
                  <span>{t(key)}</span>
                </Link>
              );
            })}
          </nav>

          {currentSubject?.lessons && (
            <section className="flex flex-col gap-1 border-t pt-3">
              <Link
                href={currentSubject.href}
                onClick={close}
                className="px-3 pb-1 font-heading text-sm font-black text-muted-foreground"
              >
                {currentSubject.emoji} {t(currentSubject.labelKey)}
              </Link>
              {currentSubject.lessons.map((lesson) => {
                const active = isActivePath(pathname, lesson.href);
                return (
                  <Link
                    key={lesson.href}
                    href={lesson.href}
                    onClick={close}
                    className={cn(
                      "rounded-xl px-3 py-2.5 text-sm font-bold transition-all active:scale-[0.98]",
                      active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-accent hover:text-foreground"
                    )}
                  >
                    {t(lesson.labelKey)}
                  </Link>
                );
              })}
            </section>
          )}

          <section className="flex flex-col gap-3 border-t pt-3">
            <h2 className="px-3 font-heading text-sm font-black text-muted-foreground">{t("nav_settings")}</h2>
            <div className="flex items-center justify-between gap-3 px-3">
              <span className="text-sm font-bold text-foreground">{t("nav_sound")}</span>
              <VoiceEnabledToggle />
            </div>
            <div className="flex items-center justify-between gap-3 px-3">
              <span className="text-sm font-bold text-foreground">{t("nav_voice")}</span>
              <VoiceToggle />
            </div>
            {pathname.startsWith("/english") && (
              <div className="flex items-center justify-between gap-3 px-3">
                <span className="text-sm font-bold text-foreground">{t("nav_language")}</span>
                <LanguageToggle />
              </div>
            )}
          </section>

          <button
            type="button"
            onClick={() => {
              close();
              onOpenParentCorner();
            }}
            className="mt-auto flex items-center justify-center gap-2 rounded-xl border border-primary/20 bg-primary/10 px-4 py-3 text-sm font-extrabold text-primary transition-all hover:bg-primary/20 active:scale-95"
          >
            <ShieldCheck className="size-5" />
            {t("nav_parent_corner")}
          </button>
        </DialogPrimitive.Popup>
      </DialogPortal>
    </Dialog>
  );
}
