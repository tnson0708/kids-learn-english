"use client";

import { useState } from "react";
import { Lock, ShieldAlert, KeyRound, Delete } from "lucide-react";
import { useReward } from "@/lib/reward-context";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ParentPinModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
  title?: string;
}

export function ParentPinModal({
  open,
  onOpenChange,
  onSuccess,
  title = "Xác nhận của Ba Mẹ 🛡️",
}: ParentPinModalProps) {
  const { verifyPin, parentPin } = useReward();
  const [pin, setPin] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  const handleNumClick = (num: string) => {
    if (pin.length < 4) {
      const nextPin = pin + num;
      setPin(nextPin);
      setError(false);

      if (nextPin.length === 4) {
        if (verifyPin(nextPin)) {
          setPin("");
          onOpenChange(false);
          if (onSuccess) onSuccess();
        } else {
          setError(true);
          setTimeout(() => {
            setPin("");
          }, 450);
        }
      }
    }
  };

  const handleDelete = () => {
    setPin((prev) => prev.slice(0, -1));
    setError(false);
  };

  const handleClose = (newOpen: boolean) => {
    setPin("");
    setError(false);
    onOpenChange(newOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-xs overflow-hidden rounded-3xl p-0 shadow-2xl border-none text-center">
        {/* Banner Header */}
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 px-6 pt-6 pb-5 text-white">
          <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md mb-2 shadow-inner">
            <Lock className="size-6 text-white" />
          </div>
          <DialogTitle className="font-heading text-lg font-black text-white leading-tight">
            {title}
          </DialogTitle>
          <p className="mt-1 text-[11px] text-white/90 font-medium">
            Nhập mã PIN 4 chữ số của Ba Mẹ
          </p>
        </div>

        <div className="p-5">
          {/* PIN 4-Dot Display */}
          <div
            className={cn(
              "my-3 flex justify-center gap-3.5 transition-transform",
              error && "animate-shake text-destructive"
            )}
          >
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className={cn(
                  "size-4 rounded-full border-2 transition-all duration-150",
                  i < pin.length
                    ? "border-primary bg-primary scale-110 shadow-xs"
                    : "border-muted-foreground/30 bg-muted/40",
                  error && "border-destructive bg-destructive/30"
                )}
              />
            ))}
          </div>

          {error && (
            <p className="text-xs font-black text-destructive flex items-center justify-center gap-1 my-2">
              <ShieldAlert className="size-3.5" /> Mã PIN sai, bé thử nhờ Ba Mẹ nhé!
            </p>
          )}

          {/* Keypad Grid */}
          <div className="grid grid-cols-3 gap-2.5 mt-4">
            {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((num) => (
              <Button
                key={num}
                type="button"
                variant="outline"
                onClick={() => handleNumClick(num)}
                className="h-12 text-lg font-black rounded-2xl border-border/80 hover:bg-primary/10 hover:border-primary/50 active:scale-95 transition-all shadow-2xs"
              >
                {num}
              </Button>
            ))}
            <div />
            <Button
              type="button"
              variant="outline"
              onClick={() => handleNumClick("0")}
              className="h-12 text-lg font-black rounded-2xl border-border/80 hover:bg-primary/10 hover:border-primary/50 active:scale-95 transition-all shadow-2xs"
            >
              0
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={handleDelete}
              className="h-12 rounded-2xl active:scale-95 text-muted-foreground hover:text-foreground"
            >
              <Delete className="size-5" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
