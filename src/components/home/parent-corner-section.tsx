"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/language-context";
import { ParentPinModal } from "@/components/parent-pin-modal";
import { ParentControlModal } from "@/components/parent-control-modal";

export function ParentCornerSection() {
  const { t } = useLanguage();
  const [showPinModal, setShowPinModal] = useState(false);
  const [showParentModal, setShowParentModal] = useState(false);

  return (
    <section id="parents" className="pt-1 pb-4">
      <div className="flex flex-col justify-between gap-3 rounded-2xl border-2 border-orange-100/90 bg-white p-4 shadow-sm sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-orange-200 bg-orange-50 text-xl text-[#E64A19]">
            🛡️
          </div>
          <div>
            <h3 className="text-base font-extrabold text-gray-900 sm:text-lg">{t("parent_corner_title")}</h3>
            <p className="mt-0.5 max-w-xl text-xs font-medium leading-relaxed text-gray-500 sm:text-sm">
              {t("parent_corner_desc")}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setShowPinModal(true)}
          className="w-full whitespace-nowrap rounded-xl bg-[#FF5722] px-5 py-2.5 text-sm font-extrabold text-white shadow-md shadow-orange-500/20 transition-all hover:bg-orange-600 active:scale-95 sm:w-auto"
        >
          {t("parent_corner_cta")} ⚙️
        </button>
      </div>

      <ParentPinModal open={showPinModal} onOpenChange={setShowPinModal} onSuccess={() => setShowParentModal(true)} />
      <ParentControlModal open={showParentModal} onOpenChange={setShowParentModal} />
    </section>
  );
}
