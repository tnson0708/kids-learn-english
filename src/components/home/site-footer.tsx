"use client";

import { useLanguage } from "@/lib/language-context";
import { ShieldCheck, Sparkles, GraduationCap } from "lucide-react";

export function SiteFooter() {
  const { t } = useLanguage();

  return (
    <footer className="bg-amber-50/70 border-t border-amber-200/60 mt-12 py-8 px-4 sm:px-6 lg:px-10">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top Badges / Guarantees */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-bold text-gray-600">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-amber-200 shadow-sm">
            <span>🛡️</span> {t("footer_badge_safe")}
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-amber-200 shadow-sm">
            <span>🚫</span> {t("footer_badge_no_ads")}
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-amber-200 shadow-sm">
            <span>🎓</span> {t("footer_badge_edu")}
          </span>
        </div>

        {/* Divider */}
        <div className="border-t border-amber-200/40"></div>

        {/* Bottom Links & Legal */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-gray-500">
          <div className="flex items-center gap-2">
            <span>🦁 {t("app_name")}</span>
            <span>•</span>
            <span>© {new Date().getFullYear()} {t("app_name")}. Mọi quyền được bảo lưu.</span>
          </div>
          <div className="flex flex-wrap items-center gap-5">
            <a className="hover:text-[#FF5722] transition-colors" href="#">{t("footer_link_terms")}</a>
            <a className="hover:text-[#FF5722] transition-colors" href="#">{t("footer_link_privacy")}</a>
            <a className="hover:text-[#FF5722] transition-colors" href="#">{t("footer_link_contact")}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
