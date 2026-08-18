export type VoiceGender = "female" | "male";

const GENDER_STORAGE_KEY = "ela_kids_voice_gender";
const VOICE_NAME_STORAGE_KEY = "ela_kids_voice_name";

let currentGender: VoiceGender = "female";
let currentVoiceName: string | null = null;

if (typeof window !== "undefined") {
  const savedGender = localStorage.getItem(GENDER_STORAGE_KEY) as VoiceGender | null;
  if (savedGender === "female" || savedGender === "male") {
    currentGender = savedGender;
  }
  currentVoiceName = localStorage.getItem(VOICE_NAME_STORAGE_KEY);
}

/** Get currently selected voice gender ("female" | "male"). */
export function getVoiceGender(): VoiceGender {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem(GENDER_STORAGE_KEY) as VoiceGender | null;
    if (saved === "female" || saved === "male") {
      return saved;
    }
  }
  return currentGender;
}

/** Set preferred voice gender ("female" | "male"). */
export function setVoiceGender(gender: VoiceGender): void {
  currentGender = gender;
  if (typeof window !== "undefined") {
    localStorage.setItem(GENDER_STORAGE_KEY, gender);
    // Reset specific voice name so the best matching gender voice is picked automatically.
    localStorage.removeItem(VOICE_NAME_STORAGE_KEY);
    currentVoiceName = null;
  }
  genderListeners.forEach((listener) => listener());
}

const genderListeners = new Set<() => void>();

/** Subscribe to voice-gender changes; for use with useSyncExternalStore. */
export function subscribeVoiceGender(callback: () => void) {
  genderListeners.add(callback);
  return () => genderListeners.delete(callback);
}

export function getVoiceGenderServerSnapshot(): VoiceGender {
  return "female";
}

/** Get list of all installed English voices on the user's device. */
export function getAvailableEnglishVoices(): SpeechSynthesisVoice[] {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return [];
  const voices = window.speechSynthesis.getVoices();
  return voices.filter((v) => v.lang.toLowerCase().replace("_", "-").startsWith("en"));
}

/** Classify voice gender based on voice name heuristics (macOS / iOS / Windows / Android / Chrome). */
export function detectVoiceGender(voice: SpeechSynthesisVoice): VoiceGender {
  const name = voice.name.toLowerCase();

  // Explicitly check for female indicators first so "female" and "woman" 
  // don't get incorrectly caught by "male" or "man" checks.
  if (name.includes("female") || name.includes("woman") || name.includes("girl")) {
    return "female";
  }

  // Use word boundaries for "male" and "man" to avoid matching inside 
  // female names like "samantha", "amanda", etc.
  if (/\b(male|man|boy)\b/.test(name)) {
    return "male";
  }

  // Check specific male voice names using word boundaries to avoid 
  // partial matches (e.g., "alex" matching "alexandra").
  const maleNames = /\b(daniel|alex|fred|aaron|arthur|gordon|david|mark|eddy|reed|oliver)\b/;
  if (maleNames.test(name)) {
    return "male";
  }

  return "female"; // Default to female for Samantha, Karen, Victoria, Zira, etc.
}

/** Find best matching English voice for target gender and settings. */
export function getBestEnglishVoice(targetGender?: VoiceGender): {
  voice: SpeechSynthesisVoice | null;
  gender: VoiceGender;
} {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    return { voice: null, gender: targetGender || "female" };
  }

  const voices = getAvailableEnglishVoices();
  const gender = targetGender || getVoiceGender();

  if (voices.length === 0) {
    return { voice: null, gender };
  }

  if (currentVoiceName) {
    const userVoice = voices.find((v) => v.name === currentVoiceName);
    if (userVoice) {
      return { voice: userVoice, gender: detectVoiceGender(userVoice) };
    }
  }

  // Prefer local (on-device) voices — network voices can silently produce no
  // audio when the connection to the remote synthesis service is unavailable.
  const localVoices = voices.filter((v) => v.localService);
  const pool = localVoices.length > 0 ? localVoices : voices;

  // Prefer US English voices for the clearest, most standard pronunciation.
  const usVoices = pool.filter((v) => v.lang.toLowerCase().replace("_", "-") === "en-us");
  const searchPool = usVoices.length > 0 ? usVoices : pool;

  const genderVoices = searchPool.filter((v) => detectVoiceGender(v) === gender);

  const preferredFemale = ["samantha", "karen", "victoria", "moira", "tessa", "susan", "zira"];
  const preferredMale = ["daniel", "alex", "fred", "aaron", "arthur", "david", "mark"];

  const finalList = genderVoices.length > 0 ? genderVoices : searchPool;
  const preferredOrder = gender === "male" ? preferredMale : preferredFemale;

  for (const pref of preferredOrder) {
    const found = finalList.find((v) => v.name.toLowerCase().includes(pref));
    if (found) return { voice: found, gender };
  }

  return { voice: finalList[0] || null, gender };
}

// Keep strong JS references to active utterances to prevent V8 garbage collection
// mid-speech in Chrome/Chromium browsers, which causes SpeechSynthesis to permanently freeze.
const activeUtterances = new Set<SpeechSynthesisUtterance>();

/** Speak English text aloud with the selected voice, gender pitch, and speed. */
export function speakEnglish(text: string, overrideGender?: VoiceGender, rate = 0.85): void {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

  try {
    const synth = window.speechSynthesis;
    if (synth.paused) {
      synth.resume();
    }

    const targetGender = overrideGender || getVoiceGender();
    const { voice, gender } = getBestEnglishVoice(targetGender);

    const wasSpeaking = synth.speaking || synth.pending;
    if (wasSpeaking) {
      synth.cancel();
      activeUtterances.clear();
    }

    const doSpeak = () => {
      try {
        const utter = new SpeechSynthesisUtterance(text);
        activeUtterances.add(utter);

        utter.lang = "en-US";
        utter.rate = rate;

        if (voice) {
          utter.voice = voice;
        }
        utter.pitch = gender === "male" ? 0.9 : 1.05;

        utter.onend = () => {
          activeUtterances.delete(utter);
        };
        utter.onerror = (e) => {
          activeUtterances.delete(utter);
          if (e.error === "canceled" || e.error === "interrupted" || e.error === "not-allowed") return;
          console.error("TTS utterance error event:", e.error);
        };

        synth.speak(utter);
      } catch (err) {
        console.warn("Speech synthesis notice:", err);
      }
    };

    if (wasSpeaking) {
      window.setTimeout(doSpeak, 40);
    } else {
      doSpeak();
    }
  } catch (err) {
    console.warn("Speech synthesis outer notice:", err);
  }
}

/** Speak Vietnamese text aloud with a Vietnamese voice. */
export function speakVietnamese(text: string, rate = 0.9): void {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

  try {
    const synth = window.speechSynthesis;
    if (synth.paused) {
      synth.resume();
    }

    const wasSpeaking = synth.speaking || synth.pending;
    if (wasSpeaking) {
      synth.cancel();
      activeUtterances.clear();
    }

    const doSpeak = () => {
      try {
        const utter = new SpeechSynthesisUtterance(text);
        activeUtterances.add(utter);

        utter.lang = "vi-VN";
        utter.rate = rate;

        const voices = synth.getVoices();
        const viVoice = voices.find(v => v.lang.toLowerCase().startsWith("vi"));
        if (viVoice) {
          utter.voice = viVoice;
        }

        utter.onend = () => {
          activeUtterances.delete(utter);
        };
        utter.onerror = (e) => {
          activeUtterances.delete(utter);
          if (e.error === "canceled" || e.error === "interrupted" || e.error === "not-allowed") return;
          console.error("TTS utterance error event:", e.error);
        };

        synth.speak(utter);
      } catch (err) {
        console.warn("Speech synthesis notice:", err);
      }
    };

    if (wasSpeaking) {
      window.setTimeout(doSpeak, 40);
    } else {
      doSpeak();
    }
  } catch (err) {
    console.warn("Speech synthesis outer notice:", err);
  }
}

// Prime speech voices immediately, and again once the async voice list
// finishes loading (WebKit/Chromium fire 'voiceschanged' after page load).
if (typeof window !== "undefined" && "speechSynthesis" in window) {
  window.speechSynthesis.getVoices();
  window.speechSynthesis.onvoiceschanged = () => {
    getAvailableEnglishVoices();
  };

  // Chrome/Chromium has a long-standing bug where its speechSynthesis engine
  // silently wedges — stops producing any audio, with no error — after being
  // used repeatedly over an extended session. Periodically "nudging" the
  // engine with pause()+resume() while it's actively speaking prevents it
  // from ever reaching that stuck state.
  // See: https://bugs.chromium.org/p/chromium/issues/detail?id=679437
  const win = window as unknown as { __elaKidsSpeechKeepAlive?: boolean };
  if (!win.__elaKidsSpeechKeepAlive) {
    win.__elaKidsSpeechKeepAlive = true;
    window.setInterval(() => {
      const synth = window.speechSynthesis;
      if (synth.speaking && !synth.paused) {
        synth.pause();
        synth.resume();
      }
    }, 5000);
  }
}
