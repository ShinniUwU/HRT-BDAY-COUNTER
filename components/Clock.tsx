"use client";

import { useEffect, useMemo, useState } from "react";
import { format } from "date-fns";
import { motion } from "framer-motion";
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
    () =>
      format(currentTime, timeFormat === "24h" ? "HH:mm:ss" : "hh:mm:ss aa"),
    [currentTime, timeFormat]
  );
  const dateString = useMemo(
    () => format(currentTime, "EEEE, MMMM do, yyyy"),
    [currentTime]
  );

  return (
    <motion.div
      whileHover={{ boxShadow: "0 0 25px rgba(219, 39, 119, 0.15)" }}
      className="md:col-span-7 bg-slate-800/40 backdrop-blur-md p-6 rounded-2xl border border-slate-700/50 shadow-lg relative overflow-hidden group"
    >
      <h2 className="text-slate-400 text-sm font-medium mb-2 tracking-wide">
        CURRENT TIME (BULGARIA)
      </h2>
      <p className="text-5xl font-light tracking-tight" suppressHydrationWarning>
        {timeString}
      </p>
      <p className="text-slate-400 mt-2 tracking-wide" suppressHydrationWarning>
        {dateString}
      </p>
      <div className="flex items-center mt-3 gap-3">
        <span className="text-xs text-slate-400/90 tracking-wide">Format:</span>
        <div
          role="radiogroup"
          aria-label="Time format"
          className="relative inline-block w-28 h-8 select-none rounded-full border border-slate-700/40 bg-slate-900/30 p-1 backdrop-blur-sm shadow-[inset_0_1px_0_0_rgba(148,163,184,0.2)]"
        >
          <div className="relative h-full w-full overflow-hidden rounded-full">
            <div
              className={`absolute left-0 top-0 h-full w-1/2 rounded-full bg-slate-800/70 transition-transform duration-300 ease-out shadow-[inset_0_0_0_1px_rgba(148,163,184,0.25),0_8px_20px_-6px_rgba(236,72,153,0.25)] ${
                timeFormat === "24h" ? "translate-x-full" : ""
              }`}
              aria-hidden
            />
            <div className="absolute inset-0 z-10 flex">
              <button
                type="button"
                role="radio"
                aria-checked={timeFormat === "12h"}
                className={`flex-1 text-center text-[11px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500/30 ${
                  timeFormat === "12h"
                    ? "text-slate-100"
                    : "text-slate-400 hover:text-slate-300"
                }`}
                onClick={() => {
                  setTimeFormat("12h");
                  try {
                    localStorage.setItem("timeFormat", "12h");
                  } catch {}
                }}
              >
                12h
              </button>
              <button
                type="button"
                role="radio"
                aria-checked={timeFormat === "24h"}
                className={`flex-1 text-center text-[11px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500/30 ${
                  timeFormat === "24h"
                    ? "text-slate-100"
                    : "text-slate-400 hover:text-slate-300"
                }`}
                onClick={() => {
                  setTimeFormat("24h");
                  try {
                    localStorage.setItem("timeFormat", "24h");
                  } catch {}
                }}
              >
                24h
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
