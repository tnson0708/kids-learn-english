"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { playCorrectSound, playVictorySound } from "@/lib/sound-effects";
import { GoldCoin } from "@/components/gold-coin";

interface RewardContextType {
  coins: number;
  redeemedGifts: string[];
  rewardedItemIds: string[];
  customGiftPrices: Record<string, number>;
  parentPin: string;
  isParentUnlocked: boolean;
  dailyQuizCoins: number;
  maxDailyQuizCoins: number;
  streakDays: number;
  addCoins: (amount: number, reason?: string) => void;
  rewardItem: (itemId: string, amount: number, reason?: string) => boolean;
  isItemRewarded: (itemId: string) => boolean;
  addQuizCoins: (amount: number) => number;
  setCoinsManually: (amount: number) => void;
  updateGiftPrice: (giftId: string, newPrice: number) => void;
  getGiftEffectivePrice: (giftId: string, defaultPrice: number) => number;
  redeemGift: (giftId: string, price: number) => boolean;
  verifyPin: (pin: string) => boolean;
  updatePin: (newPin: string) => void;
  lockParent: () => void;
  unlockParent: () => void;
  toast: { amount: number; reason?: string; id: number } | null;
}

const RewardContext = createContext<RewardContextType | undefined>(undefined);

const COINS_KEY = "kids_english_coins_v1";
const REDEEMED_KEY = "kids_english_redeemed_v1";
const REWARDED_ITEMS_KEY = "kids_english_rewarded_items_v1";
const GIFT_PRICES_KEY = "kids_english_gift_prices_v1";
const PIN_KEY = "kids_english_parent_pin_v1";
const QUIZ_DATE_KEY = "kids_english_quiz_date_v1";
const QUIZ_DAILY_COINS_KEY = "kids_english_quiz_daily_v1";
const STREAK_DAYS_KEY = "kids_english_streak_days_v1";
const STREAK_LAST_ACTIVE_KEY = "kids_english_streak_last_active_v1";

export const MAX_DAILY_QUIZ_COINS = 20;

function getTodayString(): string {
  return new Date().toISOString().split("T")[0];
}

export function RewardProvider({ children }: { children: React.ReactNode }) {
  const [coins, setCoins] = useState<number>(0);
  const [redeemedGifts, setRedeemedGifts] = useState<string[]>([]);
  const [rewardedItemIds, setRewardedItemIds] = useState<string[]>([]);
  const [customGiftPrices, setCustomGiftPrices] = useState<Record<string, number>>({});
  const [parentPin, setParentPin] = useState<string>("1234");
  const [isParentUnlocked, setIsParentUnlocked] = useState<boolean>(false);
  const [dailyQuizCoins, setDailyQuizCoins] = useState<number>(0);
  const [streakDays, setStreakDays] = useState<number>(0);
  const [toast, setToast] = useState<{ amount: number; reason?: string; id: number } | null>(null);

  // Load state from localStorage on mount
  useEffect(() => {
    try {
      const savedCoins = localStorage.getItem(COINS_KEY);
      if (savedCoins !== null) {
        setCoins(parseInt(savedCoins, 10) || 0);
      }
      const savedGifts = localStorage.getItem(REDEEMED_KEY);
      if (savedGifts) {
        setRedeemedGifts(JSON.parse(savedGifts));
      }
      const savedRewardedItems = localStorage.getItem(REWARDED_ITEMS_KEY);
      if (savedRewardedItems) {
        setRewardedItemIds(JSON.parse(savedRewardedItems));
      }
      const savedPrices = localStorage.getItem(GIFT_PRICES_KEY);
      if (savedPrices) {
        setCustomGiftPrices(JSON.parse(savedPrices));
      }
      const savedPin = localStorage.getItem(PIN_KEY);
      if (savedPin) {
        setParentPin(savedPin);
      }

      // Check daily quiz coins reset
      const today = getTodayString();
      const savedQuizDate = localStorage.getItem(QUIZ_DATE_KEY);
      if (savedQuizDate === today) {
        const savedQuizCoins = localStorage.getItem(QUIZ_DAILY_COINS_KEY);
        setDailyQuizCoins(parseInt(savedQuizCoins || "0", 10));
      } else {
        localStorage.setItem(QUIZ_DATE_KEY, today);
        localStorage.setItem(QUIZ_DAILY_COINS_KEY, "0");
        setDailyQuizCoins(0);
      }

      // Daily learning streak: count consecutive calendar days the app was opened.
      const lastActive = localStorage.getItem(STREAK_LAST_ACTIVE_KEY);
      const storedStreak = parseInt(localStorage.getItem(STREAK_DAYS_KEY) || "0", 10) || 0;
      if (lastActive === today) {
        setStreakDays(storedStreak || 1);
      } else {
        const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];
        const nextStreak = lastActive === yesterday ? storedStreak + 1 : 1;
        setStreakDays(nextStreak);
        localStorage.setItem(STREAK_DAYS_KEY, nextStreak.toString());
        localStorage.setItem(STREAK_LAST_ACTIVE_KEY, today);
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  const addCoins = (amount: number, reason?: string) => {
    setCoins((prev) => {
      const next = prev + amount;
      try {
        localStorage.setItem(COINS_KEY, next.toString());
      } catch {}
      return next;
    });

    playCorrectSound();

    // Trigger toast notification
    const toastId = Date.now();
    setToast({ amount, reason, id: toastId });
    setTimeout(() => {
      setToast((curr) => (curr?.id === toastId ? null : curr));
    }, 1800);
  };

  const isItemRewarded = (itemId: string): boolean => {
    return rewardedItemIds.includes(itemId);
  };

  const rewardItem = (itemId: string, amount: number, reason?: string): boolean => {
    if (rewardedItemIds.includes(itemId)) {
      return false;
    }
    const next = [...rewardedItemIds, itemId];
    setRewardedItemIds(next);
    try {
      localStorage.setItem(REWARDED_ITEMS_KEY, JSON.stringify(next));
    } catch {}
    addCoins(amount, reason);
    return true;
  };

  const updateGiftPrice = (giftId: string, newPrice: number) => {
    const validPrice = Math.max(1, Math.round(newPrice));
    setCustomGiftPrices((prev) => {
      const next = { ...prev, [giftId]: validPrice };
      try {
        localStorage.setItem(GIFT_PRICES_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const getGiftEffectivePrice = (giftId: string, defaultPrice: number): number => {
    if (customGiftPrices[giftId] !== undefined) {
      return customGiftPrices[giftId];
    }
    return defaultPrice;
  };

  const addQuizCoins = (amount: number): number => {
    const today = getTodayString();
    let currentDaily = dailyQuizCoins;

    try {
      const savedQuizDate = localStorage.getItem(QUIZ_DATE_KEY);
      if (savedQuizDate !== today) {
        localStorage.setItem(QUIZ_DATE_KEY, today);
        localStorage.setItem(QUIZ_DAILY_COINS_KEY, "0");
        currentDaily = 0;
      }
    } catch {}

    const allowed = Math.min(amount, Math.max(0, MAX_DAILY_QUIZ_COINS - currentDaily));
    if (allowed <= 0) return 0;

    const nextDaily = currentDaily + allowed;
    setDailyQuizCoins(nextDaily);

    try {
      localStorage.setItem(QUIZ_DAILY_COINS_KEY, nextDaily.toString());
    } catch {}

    addCoins(allowed, `Quiz (${nextDaily}/${MAX_DAILY_QUIZ_COINS} 🪙)`);
    return allowed;
  };

  const setCoinsManually = (amount: number) => {
    const next = Math.max(0, amount);
    setCoins(next);
    try {
      localStorage.setItem(COINS_KEY, next.toString());
    } catch {}
    playCorrectSound();
  };

  const verifyPin = (inputPin: string): boolean => {
    if (inputPin === parentPin) {
      setIsParentUnlocked(true);
      return true;
    }
    return false;
  };

  const updatePin = (newPin: string) => {
    if (/^\d{4}$/.test(newPin)) {
      setParentPin(newPin);
      try {
        localStorage.setItem(PIN_KEY, newPin);
      } catch {}
    }
  };

  const lockParent = () => setIsParentUnlocked(false);
  const unlockParent = () => setIsParentUnlocked(true);

  const redeemGift = (giftId: string, price: number): boolean => {
    if (coins < price || redeemedGifts.includes(giftId)) {
      return false;
    }

    const nextCoins = coins - price;
    const nextRedeemed = [...redeemedGifts, giftId];

    setCoins(nextCoins);
    setRedeemedGifts(nextRedeemed);

    try {
      localStorage.setItem(COINS_KEY, nextCoins.toString());
      localStorage.setItem(REDEEMED_KEY, JSON.stringify(nextRedeemed));
    } catch {}

    playVictorySound();
    return true;
  };

  return (
    <RewardContext.Provider
      value={{
        coins,
        redeemedGifts,
        rewardedItemIds,
        customGiftPrices,
        parentPin,
        isParentUnlocked,
        dailyQuizCoins,
        maxDailyQuizCoins: MAX_DAILY_QUIZ_COINS,
        streakDays,
        addCoins,
        rewardItem,
        isItemRewarded,
        addQuizCoins,
        setCoinsManually,
        updateGiftPrice,
        getGiftEffectivePrice,
        redeemGift,
        verifyPin,
        updatePin,
        lockParent,
        unlockParent,
        toast,
      }}
    >
      {children}

      {/* Toast Notification Overlay */}
      {toast && (
        <div className="fixed top-20 right-4 z-50 pointer-events-none animate-bounce sm:right-8">
          <div className="flex items-center gap-2 rounded-full border-2 border-amber-400 bg-amber-50 px-4 py-2 text-amber-900 shadow-xl backdrop-blur-md dark:bg-amber-950 dark:text-amber-100 dark:border-amber-500">
            <GoldCoin className="size-6 sm:size-7" />
            <div className="flex flex-col">
              <span className="font-heading text-base sm:text-lg font-black text-amber-600 dark:text-amber-300 leading-none">
                +{toast.amount} đồng!
              </span>
              {toast.reason && (
                <span className="text-[10px] font-bold text-amber-700/80 dark:text-amber-400/80 uppercase tracking-wider">
                  {toast.reason}
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </RewardContext.Provider>
  );
}

export function useReward() {
  const context = useContext(RewardContext);
  if (!context) {
    throw new Error("useReward must be used within a RewardProvider");
  }
  return context;
}



