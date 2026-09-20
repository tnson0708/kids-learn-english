"use client";

import Link from "next/link";
import { HelpCircle } from "lucide-react";
import { qnaCategories } from "@/data/english/qna";
import { useLanguage } from "@/lib/language-context";
import { Card } from "@/components/ui/card";

export function QnaCategoryGrid() {
  const { language } = useLanguage();

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {qnaCategories.map((cat) => {
        const title = language === "vi" ? cat.titleVi : cat.titleEn;
        const description = language === "vi" ? cat.descriptionVi : cat.descriptionEn;

        return (
          <Link key={cat.id} href={`/english/qna/${cat.id}`}>
            <Card
              className={`group flex flex-col justify-between border-none bg-gradient-to-br ${cat.gradient} p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md active:scale-98 h-full`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-5xl transition-transform duration-200 group-hover:scale-110" aria-hidden>
                    {cat.emoji}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-white/70 px-3 py-1 text-xs font-bold text-foreground/80 backdrop-blur-xs">
                    <HelpCircle className="size-3.5" />
                    {cat.questions.length} câu hỏi
                  </span>
                </div>

                <h3 className="mt-4 font-heading text-xl font-extrabold text-foreground group-hover:text-primary transition-colors">
                  {title}
                </h3>
                <p className="mt-1 text-xs font-medium text-foreground/75 leading-relaxed">
                  {description}
                </p>
              </div>

              <div className="mt-6 flex items-center gap-1 text-xs font-bold text-primary group-hover:translate-x-1 transition-transform">
                <span>Vào luyện tập / Start Practice →</span>
              </div>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
