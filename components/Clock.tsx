"use client";

import { useEffect, useMemo, useState } from "react";
import { format } from "date-fns";
import { useNow } from "@/hooks/useNow";

type TimeFormat = "12h" | "24h";

export default function Clock() {
  const currentTime = useNow({ timeZone: "Europe/Sofia", intervalMs: 1000 });
  const [timeFormat, setTimeFormat] = useState<TimeFormat>("12h");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("timeFormat");
      if (saved === "12h" || saved === "24h") setTimeFormat(saved);
    } catch {}
  }, []);

  const timeString = useMemo(
    () => format(currentTime, timeFormat === "24h" ? "HH:mm:ss" : "hh:mm:ss"),
    [currentTime, timeFormat]
  );
  const ampm = useMemo(
    () => (timeFormat === "12h" ? format(currentTime, "aa") : null),
    [currentTime, timeFormat]
  );
  const dateString = useMemo(
    () => format(currentTime, "EEE, MMM d yyyy"),
    [currentTime]
  );

  return (
    <div className="md:col-span-12 pb-8 border-b border-white/5">
      <p className="text-slate-700 text-xs tracking-widest mb-4">
        clock · europe/sofia
      </p>
      <p className="text-6xl md:text-7xl font-light leading-none tracking-tight" suppressHydrationWarning>
        {timeString}
        {ampm && <span className="text-2xl text-slate-600 ml-3">{ampm}</span>}
      </p>
      <div className="flex items-center gap-4 mt-3">
        <p className="text-slate-500 text-sm" suppressHydrationWarning>
          {dateString}
        </p>
        <span className="text-slate-800 text-xs">·</span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => { setTimeFormat("12h"); try { localStorage.setItem("timeFormat", "12h"); } catch {} }}
            className={`text-xs transition-colors ${timeFormat === "12h" ? "text-slate-300" : "text-slate-700 hover:text-slate-500"}`}
          >
            12h
          </button>
          <span className="text-slate-800 text-xs">/</span>
          <button
            type="button"
            onClick={() => { setTimeFormat("24h"); try { localStorage.setItem("timeFormat", "24h"); } catch {} }}
            className={`text-xs transition-colors ${timeFormat === "24h" ? "text-slate-300" : "text-slate-700 hover:text-slate-500"}`}
          >
            24h
          </button>
        </div>
      </div>
    </div>
  );
}
