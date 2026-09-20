"use client";

import React, { createContext, useContext, useSyncExternalStore } from "react";
import {
  getVoiceGender,
  getVoiceGenderServerSnapshot,
  setVoiceGender,
  speakEnglish,
  speakVietnamese,
  subscribeVoiceGender,
  type VoiceGender,
} from "./speech";

const ENABLED_STORAGE_KEY = "ela_kids_voice_enabled";
const enabledListeners = new Set<() => void>();

function readStoredEnabled(): boolean {
  return window.localStorage.getItem(ENABLED_STORAGE_KEY) !== "off";
}

let cachedEnabled: boolean = typeof window !== "undefined" ? readStoredEnabled() : true;

function subscribeEnabled(callback: () => void) {
  enabledListeners.add(callback);
  return () => enabledListeners.delete(callback);
}

function getEnabledSnapshot(): boolean {
  return cachedEnabled;
}

function getEnabledServerSnapshot(): boolean {
  return true;
}

function setEnabled(next: boolean) {
  cachedEnabled = next;
  if (typeof window !== "undefined") {
    window.localStorage.setItem(ENABLED_STORAGE_KEY, next ? "on" : "off");
  }
  enabledListeners.forEach((listener) => listener());
}

interface VoiceContextType {
  enabled: boolean;
  setEnabled: (enabled: boolean) => void;
  toggleEnabled: () => void;
  gender: VoiceGender;
  setGender: (gender: VoiceGender) => void;
  /** Speak text aloud (English by default), muted whenever voice is turned off — the single entry
   * point every subject should call so the global on/off toggle actually mutes all speech. */
  speak: (text: string, lang?: "en" | "vi") => void;
}

const VoiceContext = createContext<VoiceContextType | undefined>(undefined);

export function VoiceProvider({ children }: { children: React.ReactNode }) {
  const enabled = useSyncExternalStore(subscribeEnabled, getEnabledSnapshot, getEnabledServerSnapshot);
  const gender = useSyncExternalStore(subscribeVoiceGender, getVoiceGender, getVoiceGenderServerSnapshot);

  const speak = (text: string, lang: "en" | "vi" = "en") => {
    if (!cachedEnabled) return;
    if (lang === "vi") {
      speakVietnamese(text);
    } else {
      speakEnglish(text);
    }
  };

  return (
    <VoiceContext.Provider
      value={{
        enabled,
        setEnabled,
        toggleEnabled: () => setEnabled(!cachedEnabled),
        gender,
        setGender: setVoiceGender,
        speak,
      }}
    >
      {children}
    </VoiceContext.Provider>
  );
}

export function useVoice() {
  const context = useContext(VoiceContext);
  if (!context) {
    throw new Error("useVoice must be used within a VoiceProvider");
  }
  return context;
}
