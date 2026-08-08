"use client";

import { useSyncExternalStore } from "react";

const COOKIE_NAME = "age_verified";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return document.cookie.split("; ").includes(`${COOKIE_NAME}=1`);
}

// On the server assume verified so the gate only appears after hydration.
function getServerSnapshot() {
  return true;
}

function confirmAge() {
  document.cookie = `${COOKIE_NAME}=1; max-age=${COOKIE_MAX_AGE}; path=/; samesite=lax`;
  listeners.forEach((listener) => listener());
}

export function AgeGate() {
  const verified = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (verified) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
      <div className="w-full max-w-md rounded-2xl bg-parchment p-8 text-center text-cocoa shadow-xl">
        <p className="text-4xl">🍷</p>
        <h2 className="mt-4 font-display text-xl">Sind Sie mindestens 18 Jahre alt?</h2>
        <p className="mt-2 font-body text-sm text-latte">
          Der Verkauf von alkoholischen Getränken an Personen unter 18 Jahren ist
          gesetzlich verboten (§ 9 JuSchG).
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <button
            className="rounded-lg bg-gold px-5 py-2.5 font-body text-sm font-medium text-parchment hover:bg-honey"
            onClick={confirmAge}
          >
            Ja, ich bin über 18
          </button>
          <a
            href="https://www.jugendschutz.net/"
            className="rounded-lg border border-sand px-5 py-2.5 font-body text-sm font-medium hover:bg-cream"
          >
            Nein
          </a>
        </div>
      </div>
    </div>
  );
}
