"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type UseNowOptions = {
  timeZone?: string; // e.g., "Europe/Sofia"
  intervalMs?: number; // default 1000
};

function nowInTimeZone(tz?: string) {
  if (!tz) return new Date();
  const now = new Date();
  // Create a Date corresponding to the same instant, formatted in tz, then re-parse.
  return new Date(now.toLocaleString("en-US", { timeZone: tz }));
}

export function useNow(options: UseNowOptions = {}) {
  const { timeZone = "Europe/Sofia", intervalMs = 1000 } = options;
  const [now, setNow] = useState(() => nowInTimeZone(timeZone));
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const tick = useCallback(() => setNow(nowInTimeZone(timeZone)), [timeZone]);

  const start = useCallback(() => {
    if (timerRef.current) return;
    timerRef.current = setInterval(tick, intervalMs);
  }, [tick, intervalMs]);

  const stop = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  useEffect(() => {
    // Start immediately and on visibility changes
    const handleVisibility = () => {
      if (document.visibilityState === "visible") {
        tick();
        start();
      } else {
        stop();
      }
    };

    handleVisibility();
    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      stop();
    };
  }, [start, stop, tick]);

  return now;
}

