"use client";

import { useState } from "react";
import { Gift, CheckCircle2, Lock, Sparkles, ArrowLeft, Trophy } from "lucide-react";
import Link from "next/link";
import { GoldCoin } from "@/components/gold-coin";
import { giftItems, type GiftItem } from "@/data/gifts";
import { useLanguage } from "@/lib/language-context";
import { useReward } from "@/lib/reward-context";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function GiftsPage() {
  const { language, t } = useLanguage();
  const { coins, redeemedGifts, redeemGift, getGiftEffectivePrice } = useReward();
  const [selectedGift, setSelectedGift] = useState<GiftItem | null>(null);

  const handleRedeem = (gift: GiftItem) => {
    const effectivePrice = getGiftEffectivePrice(gift.id, gift.price);
    const success = redeemGift(gift.id, effectivePrice);
    if (success) {
      setSelectedGift(gift);
    }
  };

  return (
    <div className="mx-auto w-full max-w-5xl flex-1 px-4 py-4 sm:py-6">
      {/* Page Header */}
      <div className="mb-4 flex flex-col gap-3 rounded-2xl bg-gradient-to-r from-amber-400 via-orange-500 to-amber-600 p-4 text-white shadow-md sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            aria-label={t("nav_home")}
            className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition-all hover:bg-white/30 active:scale-95"
          >
            <ArrowLeft className="size-5" />
          </Link>
          <div>
            <h1 className="flex items-center gap-2 font-heading text-xl font-black sm:text-2xl">
              <Gift className="size-5" />
              {t("gifts_title")}
            </h1>
            <p className="text-xs font-semibold text-white/90">{t("gifts_subtitle")}</p>
          </div>
        </div>

        {/* Savings Coin */}
        <div className="inline-flex items-center gap-2 self-start rounded-full bg-white/95 px-4 py-1.5 text-foreground shadow-md dark:bg-slate-900/90 dark:text-white sm:self-auto">
          <GoldCoin className="size-6" />
          <div className="text-left leading-tight">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              {t("gifts_my_balance")}
            </span>
            <span className="font-heading text-lg font-black text-amber-500">
              {coins} <span className="text-xs font-extrabold text-foreground/80">{t("gifts_dong")}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Toy Gifts Grid */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {giftItems.map((gift) => {
          const effectivePrice = getGiftEffectivePrice(gift.id, gift.price);
          const isRedeemed = redeemedGifts.includes(gift.id);
          const canAfford = coins >= effectivePrice;
          const remaining = effectivePrice - coins;
          const progressPercent = Math.min(100, Math.round((coins / effectivePrice) * 100));

          return (
            <Card
              key={gift.id}
              className={cn(
                "relative flex-row gap-3 rounded-2xl border-2 p-3 transition-all duration-200",
                isRedeemed
                  ? "border-emerald-500/40 bg-emerald-50/50 shadow-xs dark:bg-emerald-950/20"
                  : canAfford
                  ? "border-amber-400 bg-card shadow-md ring-2 ring-amber-400/30 hover:-translate-y-0.5 hover:shadow-lg"
                  : "border-border/60 bg-card/60 opacity-90"
              )}
            >
              <div
                className={`relative flex size-20 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${gift.gradient}`}
              >
                <span className="text-4xl drop-shadow-md" aria-hidden>
                  {gift.emoji}
                </span>
                {isRedeemed && (
                  <span className="absolute -top-1.5 -left-1.5 flex size-6 items-center justify-center rounded-full bg-emerald-500 text-white shadow-xs">
                    <CheckCircle2 className="size-4" />
                  </span>
                )}
              </div>

              <CardContent className="flex min-w-0 flex-1 flex-col justify-between gap-1.5 p-0">
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-heading text-sm font-black leading-tight text-foreground">
                      {language === "vi" ? gift.nameVi : gift.nameEn}
                    </h3>
                    <span className="flex shrink-0 items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-[11px] font-black text-amber-800 dark:bg-amber-950/60 dark:text-amber-300">
                      <GoldCoin className="size-3.5" />
                      {effectivePrice}
                    </span>
                  </div>
                  <p className="mt-0.5 line-clamp-2 text-[11px] font-semibold leading-snug text-muted-foreground">
                    {language === "vi" ? gift.descriptionVi : gift.descriptionEn}
                  </p>
                </div>

                {isRedeemed ? (
                  <Button
                    disabled
                    className="h-8 w-full rounded-xl bg-emerald-500/20 text-xs font-extrabold text-emerald-700 dark:text-emerald-300"
                  >
                    <CheckCircle2 className="mr-1 size-3.5 text-emerald-600" />
                    <span>{t("gifts_claimed")}</span>
                  </Button>
                ) : canAfford ? (
                  <Button
                    onClick={() => handleRedeem(gift)}
                    className="h-8 w-full rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-xs font-black text-white shadow-md transition-all hover:from-amber-600 hover:to-orange-600 active:scale-95"
                  >
                    <Gift className="mr-1.5 size-3.5 animate-bounce" />
                    <span>{t("gifts_redeem_btn")}</span>
                  </Button>
                ) : (
                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between text-[11px] font-bold text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Lock className="size-3 text-muted-foreground/70" />
                        {t("gifts_need_more")} <strong className="text-amber-600">{remaining}</strong>
                      </span>
                      <span>{progressPercent}%</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full bg-gradient-to-r from-amber-400 to-orange-500 transition-all duration-300"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Celebration Modal */}
      {selectedGift && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-sm overflow-hidden rounded-3xl bg-card p-6 text-center shadow-2xl border-4 border-amber-400 animate-in zoom-in-95 duration-200">
            <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-gradient-to-br from-amber-300 to-orange-400 text-6xl shadow-lg">
              {selectedGift.emoji}
            </div>

            <div className="mt-4 flex items-center justify-center gap-1 text-amber-500">
              <Sparkles className="size-5 animate-spin" />
              <Trophy className="size-6" />
              <Sparkles className="size-5 animate-spin" />
            </div>

            <h2 className="mt-2 font-heading text-xl font-black text-foreground">
              {t("gifts_congrats_title")}
            </h2>
            <p className="mt-2 text-sm font-semibold text-muted-foreground">
              {t("gifts_congrats_desc")}
            </p>

            <div className="mt-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 p-3 border border-amber-200 dark:border-amber-800">
              <span className="font-heading text-base font-black text-amber-700 dark:text-amber-300">
                {language === "vi" ? selectedGift.nameVi : selectedGift.nameEn}
              </span>
            </div>

            <Button
              onClick={() => setSelectedGift(null)}
              className="mt-6 w-full rounded-2xl bg-primary text-primary-foreground font-black py-5 text-base shadow-md active:scale-95"
            >
              Học bài tiếp để nhận quà 🎉
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
