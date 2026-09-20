"use client";

import { useState } from "react";
import { ShieldCheck } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { Card } from "@/components/ui/card";
import { ParentPinModal } from "@/components/parent-pin-modal";
import { ParentControlModal } from "@/components/parent-control-modal";

export function ParentCornerSection() {
  const { t } = useLanguage();
  const [showPinModal, setShowPinModal] = useState(false);
  const [showParentModal, setShowParentModal] = useState(false);

  return (
    <section id="parents" className="pt-2 pb-10">
      <div className="bg-white border-2 border-orange-100/90 rounded-[28px] p-6 sm:p-7 flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-sm">
        <div className="flex items-start sm:items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-orange-50 border border-orange-200 flex-shrink-0 flex items-center justify-center text-2xl text-[#E64A19]">
            🛡️
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-extrabold text-gray-900">
              {t("parent_corner_title")}
            </h3>
            <p className="text-sm font-medium text-gray-500 mt-0.5 max-w-xl leading-relaxed">
              {t("parent_corner_desc")}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setShowPinModal(true)}
            className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-[#FF5722] hover:bg-orange-600 text-white font-extrabold text-sm shadow-md shadow-orange-500/20 active:scale-95 transition-all whitespace-nowrap"
          >
            {t("parent_corner_cta")} ⚙️
          </button>
        </div>
      </div>

      <ParentPinModal open={showPinModal} onOpenChange={setShowPinModal} onSuccess={() => setShowParentModal(true)} />
      <ParentControlModal open={showParentModal} onOpenChange={setShowParentModal} />
    </section>
  );
}
