"use client";

import { useState } from "react";
import {
  ShieldCheck,
  KeyRound,
  Save,
  Gift,
  Pencil,
  Coins,
  Check,
  Sparkles,
} from "lucide-react";
import { useReward } from "@/lib/reward-context";
import { giftItems } from "@/data/gifts";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { GoldCoin } from "@/components/gold-coin";
import { cn } from "@/lib/utils";

interface ParentControlModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type TabType = "coins" | "gifts" | "pin";

export function ParentControlModal({ open, onOpenChange }: ParentControlModalProps) {
  const {
    coins,
    addCoins,
    setCoinsManually,
    updatePin,
    parentPin,
    updateGiftPrice,
    getGiftEffectivePrice,
  } = useReward();

  const [activeTab, setActiveTab] = useState<TabType>("coins");
  const [customCoins, setCustomCoins] = useState<string>("");
  const [newPinInput, setNewPinInput] = useState<string>("");
  const [pinSuccessMsg, setPinSuccessMsg] = useState<string>("");
  const [editingGiftId, setEditingGiftId] = useState<string | null>(null);
  const [editPriceInput, setEditPriceInput] = useState<string>("");

  const handleSetCustomCoins = () => {
    const val = parseInt(customCoins, 10);
    if (!isNaN(val) && val >= 0) {
      setCoinsManually(val);
      setCustomCoins("");
    }
  };

  const handleUpdatePin = () => {
    if (/^\d{4}$/.test(newPinInput)) {
      updatePin(newPinInput);
      setNewPinInput("");
      setPinSuccessMsg("Đổi mã PIN thành công! 🎉");
      setTimeout(() => setPinSuccessMsg(""), 3000);
    }
  };

  const handleSaveGiftPrice = (giftId: string) => {
    const p = parseInt(editPriceInput, 10);
    if (!isNaN(p) && p > 0) {
      updateGiftPrice(giftId, p);
      setEditingGiftId(null);
      setEditPriceInput("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md sm:max-w-lg w-[95vw] overflow-hidden rounded-3xl p-0 shadow-2xl border-none">
        {/* Banner Header */}
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 px-6 pt-6 pb-5 text-white text-center relative">
          <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md mb-2 shadow-inner">
            <ShieldCheck className="size-7 text-white" />
          </div>
          <DialogTitle className="font-heading text-xl sm:text-2xl font-black text-white tracking-tight">
            Quản Lý Cho Ba Mẹ 👨‍👩‍👧‍👦
          </DialogTitle>
          <p className="mt-1 text-xs text-white/90 font-medium">
            Kiểm tra thành tích & tùy chỉnh thưởng cho bé
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b bg-muted/30 px-2 pt-2">
          {[
            { id: "coins" as TabType, label: "Thưởng Tiền", icon: Coins },
            { id: "gifts" as TabType, label: "Giá Quà Tặng", icon: Gift },
            { id: "pin" as TabType, label: "Mã PIN Security", icon: KeyRound },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex-1 flex items-center justify-center gap-1 sm:gap-1.5 py-3 px-1.5 text-xs sm:text-sm font-extrabold transition-all border-b-2 -mb-px rounded-t-2xl whitespace-nowrap",
                  isActive
                    ? "border-primary text-primary bg-background shadow-2xs"
                    : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                <Icon className="size-4 shrink-0" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Contents */}
        <div className="p-4 sm:p-6">
          {/* TAB 1: COINS MANAGEMENT */}
          {activeTab === "coins" && (
            <div className="space-y-6 animate-in fade-in-50 duration-200">
              {/* Savings Balance Banner */}
              <div className="flex items-center justify-between rounded-3xl bg-gradient-to-r from-amber-500/10 via-amber-400/10 to-yellow-500/10 p-5 border-2 border-amber-300 dark:border-amber-700">
                <div>
                  <span className="block text-[11px] font-extrabold text-amber-800 dark:text-amber-300 uppercase tracking-wider">
                    Tổng Tiền Bé Đang Có
                  </span>
                  <div className="flex items-center gap-2.5 mt-1">
                    <GoldCoin className="size-8 sm:size-9" />
                    <span className="font-heading text-2xl sm:text-3xl font-black text-amber-700 dark:text-amber-300">
                      {coins} đồng
                    </span>
                  </div>
                </div>
                <div className="hidden xs:flex size-12 items-center justify-center rounded-2xl bg-amber-400/20 text-2xl">
                  💰
                </div>
              </div>

              {/* Quick Add Coins */}
              <div>
                <label className="block text-xs font-black text-foreground mb-2 flex items-center gap-1">
                  <Sparkles className="size-4 text-amber-500" /> Thưởng nhanh tiền đồng cho bé:
                </label>
                <div className="grid grid-cols-4 gap-2 sm:gap-2.5">
                  {[+5, +10, +20, +50].map((amt) => (
                    <Button
                      key={amt}
                      type="button"
                      variant="outline"
                      onClick={() => addCoins(amt, "Ba Mẹ khen thưởng")}
                      className="h-12 rounded-2xl font-black text-amber-800 dark:text-amber-200 border-2 border-amber-300 dark:border-amber-700 bg-amber-50/50 hover:bg-amber-100 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-1"
                    >
                      <span className="text-sm">+{amt}</span>
                      <GoldCoin className="size-4" />
                    </Button>
                  ))}
                </div>
              </div>

              {/* Set Exact Coin Balance */}
              <div className="pt-4 border-t">
                <label className="block text-xs font-black text-foreground mb-2">
                  Đặt lại tổng số tiền chính xác (đồng):
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Nhập số tiền chính xác..."
                    value={customCoins}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCustomCoins(e.target.value)}
                    className="flex h-11 w-full rounded-2xl border border-input bg-background px-3.5 py-2 text-sm font-bold placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary"
                  />
                  <Button
                    type="button"
                    onClick={handleSetCustomCoins}
                    className="h-11 rounded-2xl font-black px-5 shrink-0 bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm"
                  >
                    Cập Nhật
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: GIFT PRICES */}
          {activeTab === "gifts" && (
            <div className="space-y-3 sm:space-y-4 animate-in fade-in-50 duration-200">
              <div className="flex items-center justify-between">
                <label className="text-xs font-black text-foreground flex items-center gap-1.5">
                  <Gift className="size-4 text-primary" />
                  Bảng Giá Đổi Đồ Chơi (10 Món Quà):
                </label>
                <span className="text-[11px] font-extrabold text-amber-600 dark:text-amber-400">
                  Bấm bút ✏️ để chỉnh giá
                </span>
              </div>

              <div className="space-y-2 max-h-[320px] overflow-y-auto pr-1">
                {giftItems.map((gift) => {
                  const currentPrice = getGiftEffectivePrice(gift.id, gift.price);
                  const isEditing = editingGiftId === gift.id;

                  return (
                    <div
                      key={gift.id}
                      className="flex items-center justify-between gap-2 rounded-2xl bg-card p-2.5 sm:p-3 border border-border/80 shadow-2xs hover:border-primary/40 transition-colors w-full overflow-hidden"
                    >
                      <div className="flex items-center gap-2.5 min-w-0 flex-1 overflow-hidden">
                        <span className="text-2xl shrink-0 p-1 rounded-xl bg-muted/50">{gift.emoji}</span>
                        <div className="flex flex-col min-w-0 flex-1">
                          <span className="font-heading text-xs sm:text-sm font-extrabold text-foreground truncate block">
                            {gift.nameVi}
                          </span>
                          <span className="text-[10px] text-muted-foreground truncate block">
                            {gift.nameEn}
                          </span>
                        </div>
                      </div>

                      {isEditing ? (
                        <div className="flex items-center gap-1 shrink-0">
                          <input
                            type="number"
                            value={editPriceInput}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditPriceInput(e.target.value)}
                            className="w-16 h-8 rounded-xl border-2 border-primary bg-background px-1.5 text-center text-xs font-black"
                            autoFocus
                          />
                          <Button
                            type="button"
                            size="sm"
                            onClick={() => handleSaveGiftPrice(gift.id)}
                            className="h-8 rounded-xl px-2.5 text-xs font-black bg-emerald-600 hover:bg-emerald-700 text-white shrink-0"
                          >
                            <Check className="size-3.5 mr-0.5" /> Lưu
                          </Button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => {
                            setEditingGiftId(gift.id);
                            setEditPriceInput(currentPrice.toString());
                          }}
                          title="Bấm để đổi giá quà này"
                          className="flex items-center gap-1 rounded-full bg-amber-50 dark:bg-amber-950/80 border-2 border-amber-300 dark:border-amber-700 px-2.5 py-1 text-xs font-black text-amber-900 dark:text-amber-100 transition-all hover:bg-amber-100 hover:scale-105 active:scale-95 shadow-2xs shrink-0"
                        >
                          <GoldCoin className="size-3.5 shrink-0" />
                          <span className="font-extrabold text-amber-800 dark:text-amber-200">{currentPrice} đ</span>
                          <Pencil className="size-3 text-amber-600 dark:text-amber-400 ml-0.5 shrink-0 stroke-[2.5]" />
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: PIN SECURITY */}
          {activeTab === "pin" && (
            <div className="space-y-5 animate-in fade-in-50 duration-200">
              <div className="rounded-2xl bg-primary/10 p-4 border border-primary/20 flex items-center justify-between">
                <div>
                  <span className="block text-xs font-black text-foreground">
                    Bảo Vệ Quyền Ba Mẹ 🔒
                  </span>
                  <span className="text-[11px] font-semibold text-muted-foreground">
                    Mã PIN 4 chữ số bảo vệ các chức năng thưởng tiền & đổi giá quà.
                  </span>
                </div>
                <KeyRound className="size-8 text-primary/70 shrink-0 ml-2" />
              </div>

              <div>
                <label className="block text-xs font-black text-foreground mb-2">
                  Đổi mã PIN mới (4 chữ số):
                </label>
                <div className="flex gap-2">
                  <input
                    type="password"
                    maxLength={4}
                    placeholder="Mã PIN mới (ví dụ 5678)..."
                    value={newPinInput}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewPinInput(e.target.value)}
                    className="flex h-11 w-full rounded-2xl border border-input bg-background px-3.5 py-2 text-sm font-mono tracking-widest text-center placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary"
                  />
                  <Button
                    type="button"
                    onClick={handleUpdatePin}
                    className="h-11 rounded-2xl font-black px-5 shrink-0 bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm"
                  >
                    <Save className="size-4 mr-1" /> Đổi PIN
                  </Button>
                </div>
                {pinSuccessMsg && (
                  <p className="mt-2 text-xs font-extrabold text-emerald-600 flex items-center gap-1">
                    <Check className="size-4 stroke-[3]" /> {pinSuccessMsg}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
