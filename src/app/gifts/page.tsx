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
    <div className="mx-auto w-full max-w-5xl flex-1 px-4 py-8">
      {/* Back button */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 rounded-full border bg-card px-4 py-2 text-sm font-extrabold text-foreground shadow-xs transition-all hover:bg-accent hover:shadow-md active:scale-95 mb-6"
      >
        <ArrowLeft className="size-5 text-primary" />
        <span>{t("nav_home")}</span>
      </Link>

      {/* Page Header */}
      <div className="relative mb-8 overflow-hidden rounded-3xl bg-gradient-to-r from-amber-400 via-orange-500 to-amber-600 p-6 text-white shadow-lg sm:p-8">
        <div className="relative z-10 text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-xs font-black uppercase tracking-wider backdrop-blur-md">
            <Gift className="size-4" />
            <span>{t("gifts_title")}</span>
          </div>

          <h1 className="mt-3 font-heading text-2xl font-black sm:text-4xl">
            {t("gifts_title")}
          </h1>
          <p className="mt-1 max-w-lg text-xs font-semibold text-white/90 sm:text-sm">
            {t("gifts_subtitle")}
          </p>

          {/* Savings Coin Card */}
          <div className="mt-5 inline-flex items-center gap-3 rounded-full bg-white/95 px-6 py-2.5 text-foreground shadow-md backdrop-blur-md dark:bg-slate-900/90 dark:text-white">
            <GoldCoin className="size-7 sm:size-9 animate-bounce" />
            <div className="text-left">
              <span className="block text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                {t("gifts_my_balance")}
              </span>
              <span className="font-heading text-xl sm:text-2xl font-black text-amber-500">
                {coins} <span className="text-sm font-extrabold text-foreground/80">{t("gifts_dong")}</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Toy Gifts Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6">
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
                "relative flex flex-col overflow-hidden border-2 transition-all duration-200 rounded-3xl",
                isRedeemed
                  ? "border-emerald-500/40 bg-emerald-50/50 dark:bg-emerald-950/20 shadow-xs"
                  : canAfford
                  ? "border-amber-400 bg-card shadow-md hover:-translate-y-1 hover:shadow-xl ring-2 ring-amber-400/30"
                  : "border-border/60 bg-card/60 opacity-90"
              )}
            >
              {/* Card Banner Header */}
              <div
                className={`flex h-32 items-center justify-center bg-gradient-to-br ${gift.gradient} relative p-4 text-center`}
              >
                <span className="text-6xl transition-transform duration-200 hover:scale-110 drop-shadow-md" aria-hidden>
                  {gift.emoji}
                </span>

                {/* Price Badge */}
                <div className="absolute top-3 right-3 rounded-full bg-black/40 px-3 py-1 text-xs font-black text-amber-300 backdrop-blur-md flex items-center gap-1.5">
                  <GoldCoin className="size-4" />
                  <span>{effectivePrice} {t("gifts_dong")}</span>
                </div>

                {isRedeemed && (
                  <div className="absolute top-3 left-3 rounded-full bg-emerald-500 text-white px-2.5 py-1 text-xs font-extrabold flex items-center gap-1 shadow-xs">
                    <CheckCircle2 className="size-3.5" />
                    <span>{t("gifts_claimed")}</span>
                  </div>
                )}
              </div>

              {/* Card Body */}
              <CardContent className="flex flex-1 flex-col justify-between p-5">
                <div>
                  <h3 className="font-heading text-lg font-black text-foreground">
                    {language === "vi" ? gift.nameVi : gift.nameEn}
                  </h3>
                  <p className="mt-1 text-xs font-semibold text-muted-foreground leading-relaxed">
                    {language === "vi" ? gift.descriptionVi : gift.descriptionEn}
                  </p>
                </div>

                {/* Progress bar if not enough coins */}
                {!isRedeemed && !canAfford && (
                  <div className="mt-4 flex flex-col gap-1.5">
                    <div className="flex justify-between text-[11px] font-bold text-muted-foreground">
                      <span>
                        {t("gifts_need_more")} <strong className="text-amber-600">{remaining} {t("gifts_dong")}</strong>
                      </span>
                      <span>{progressPercent}%</span>
                    </div>
                    <div className="h-2.5 w-full overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full bg-gradient-to-r from-amber-400 to-orange-500 transition-all duration-300"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Action Button */}
                <div className="mt-5">
                  {isRedeemed ? (
                    <Button
                      disabled
                      className="w-full rounded-2xl bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-extrabold"
                    >
                      <CheckCircle2 className="size-4 mr-1.5 text-emerald-600" />
                      <span>{t("gifts_claimed")}</span>
                    </Button>
                  ) : canAfford ? (
                    <Button
                      onClick={() => handleRedeem(gift)}
                      className="w-full rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black shadow-md hover:shadow-lg active:scale-95 transition-all text-sm py-5"
                    >
                      <Gift className="size-4 mr-2 animate-bounce" />
                      <span>{t("gifts_redeem_btn")}</span>
                    </Button>
                  ) : (
                    <Button
                      disabled
                      variant="outline"
                      className="w-full rounded-2xl border-dashed font-extrabold text-muted-foreground text-xs py-5"
                    >
                      <Lock className="size-3.5 mr-1.5 text-muted-foreground/70" />
                      <span>
                        {t("gifts_need_more")} {remaining} {t("gifts_dong")}
                      </span>
                    </Button>
                  )}
                </div>
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
