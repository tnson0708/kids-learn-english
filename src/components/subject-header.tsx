"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft, Home } from "lucide-react";
import { getSubject } from "@/data/subjects";
import { useLanguage } from "@/lib/language-context";
import { recordLastLesson } from "@/lib/last-lesson";
import { cn } from "@/lib/utils";

const ACCENT_CLASSES = {
  english: {
    dot: "bg-english-accent",
    chipActive: "bg-english-accent text-white",
  },
  vietnamese: {
    dot: "bg-vietnamese-accent",
    chipActive: "bg-vietnamese-accent text-white",
  },
  art: {
    dot: "bg-art-accent",
    chipActive: "bg-art-accent text-white",
  },
  soon: {
    dot: "bg-soon",
    chipActive: "bg-soon text-white",
  },
} as const;

export function SubjectHeader({ subjectId }: { subjectId: string }) {
  const pathname = usePathname();
  const { t } = useLanguage();
  const subject = getSubject(subjectId);

  useEffect(() => {
    if (!subject) return;
    const activeLesson = subject.lessons?.find(
      (lesson) => pathname === lesson.href || pathname.startsWith(`${lesson.href}/`)
    );
    if (activeLesson) {
      recordLastLesson({ href: activeLesson.href, labelKey: activeLesson.labelKey });
    }
  }, [pathname, subject]);

  if (!subject) return null;

  const accent = ACCENT_CLASSES[subject.accent];
  const isSubpage = pathname !== subject.href;

  return (
    <div className="border-b bg-card/60 print:hidden">
      <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center gap-3 px-4 py-3">
        <Link
          href={subject.href}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          title={`Trang chủ môn ${t(subject.labelKey)}`}
        >
          <span className={cn("size-3 rounded-full", accent.dot)} aria-hidden />
          <span className="font-heading text-lg font-black text-foreground">
            {subject.emoji} {t(subject.labelKey)}
          </span>
        </Link>

        {subject.lessons && subject.lessons.length > 0 && (
          <nav className="flex flex-1 flex-wrap items-center gap-2">
            {subject.lessons.map((lesson) => {
              const active = pathname === lesson.href || pathname.startsWith(`${lesson.href}/`);
              return (
                <Link
                  key={lesson.href}
                  href={lesson.href}
                  className={cn(
                    "rounded-full border px-3 py-1.5 text-xs font-bold transition-all sm:text-sm",
                    active
                      ? cn("border-transparent shadow-xs", accent.chipActive)
                      : "border-border bg-background text-muted-foreground hover:text-foreground"
                  )}
                >
                  {t(lesson.labelKey)}
                </Link>
              );
            })}
          </nav>
        )}

        <div className="ml-auto flex items-center gap-3">
          {isSubpage ? (
            <>
              <Link
                href={subject.href}
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-extrabold text-[#E64A19] hover:underline"
              >
                <ArrowLeft className="size-3.5" />
                <span>Trang chủ môn {t(subject.labelKey)}</span>
              </Link>
              <span className="text-muted-foreground/30">•</span>
              <Link
                href="/"
                className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground hover:underline"
                title={t("nav_home")}
              >
                <Home className="size-3.5" />
                <span className="hidden xs:inline">{t("nav_home")}</span>
              </Link>
            </>
          ) : (
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-muted-foreground underline-offset-2 hover:text-foreground hover:underline"
            >
              <ArrowLeft className="size-3.5" />
              <span>{t("back_to_home")}</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
