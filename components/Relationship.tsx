"use client";

import { useEffect, useMemo, useState } from "react";
import { differenceInDays, differenceInMonths, differenceInYears, format } from "date-fns";
import { useNow } from "@/hooks/useNow";

const RELATIONSHIP_START_DATE = new Date("2024-09-01");

type Mode = "d" | "mo" | "y";
const MODES: Mode[] = ["d", "mo", "y"];

export default function Relationship() {
  const now = useNow({ timeZone: "Europe/Sofia", intervalMs: 1000 });
  const [mode, setMode] = useState<Mode>("d");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("relMode");
      if (saved === "d" || saved === "mo" || saved === "y") setMode(saved as Mode);
    } catch {}
  }, []);

  function cycleMode() {
    setMode(prev => {
      const next = MODES[(MODES.indexOf(prev) + 1) % MODES.length];
      try { localStorage.setItem("relMode", next); } catch {}
      return next;
    });
  }

  const data = useMemo(() => {
    const totalDays = differenceInDays(now, RELATIONSHIP_START_DATE);
    const totalMonths = differenceInMonths(now, RELATIONSHIP_START_DATE);
    const anchorMo = new Date(RELATIONSHIP_START_DATE);
    anchorMo.setMonth(anchorMo.getMonth() + totalMonths);
    const remDays = differenceInDays(now, anchorMo);
    const years = differenceInYears(now, RELATIONSHIP_START_DATE);
    const afterYears = new Date(RELATIONSHIP_START_DATE);
    afterYears.setFullYear(afterYears.getFullYear() + years);
    const months = differenceInMonths(now, afterYears);
    const afterMonths = new Date(afterYears);
    afterMonths.setMonth(afterMonths.getMonth() + months);
    const days = differenceInDays(now, afterMonths);
    return { totalDays, totalMonths, remDays, years, months, days };
  }, [now]);

  return (
    <div className="md:col-span-6 border border-white/5 rounded-lg p-4 flex flex-col gap-3">
      <p className="text-slate-700 text-xs tracking-widest">relationship · sep 2024</p>

      <button
        type="button"
        onClick={cycleMode}
        className="text-left group cursor-pointer"
        title="click to change unit"
        suppressHydrationWarning
      >
        {mode === "d" && (
          <p className="text-4xl font-light leading-none tabular-nums">
            <span className="text-slate-100">{data.totalDays}</span>
            <span className="text-slate-600 text-lg ml-1">d</span>
          </p>
        )}
        {mode === "mo" && (
          <p className="text-4xl font-light leading-none tabular-nums">
            <span className="text-slate-100">{data.totalMonths}</span>
            <span className="text-slate-600 text-lg ml-1">mo</span>
            <span className="text-slate-800 text-2xl mx-2">·</span>
            <span className="text-slate-400">{data.remDays}</span>
            <span className="text-slate-700 text-lg ml-1">d</span>
          </p>
        )}
        {mode === "y" && (
          <p className="text-4xl font-light leading-none tabular-nums">
            <span className="text-slate-100">{data.years}</span>
            <span className="text-slate-600 text-lg ml-1">y</span>
            <span className="text-slate-800 text-2xl mx-2">·</span>
            <span className="text-slate-400">{data.months}</span>
            <span className="text-slate-700 text-lg ml-1">mo</span>
            <span className="text-slate-800 text-2xl mx-2">·</span>
            <span className="text-slate-600">{data.days}</span>
            <span className="text-slate-700 text-lg ml-1">d</span>
          </p>
        )}
        <p className="text-slate-800 text-xs mt-2 group-hover:text-slate-600 transition-colors">
          {MODES.map((m, i) => (
            <span key={m}>
              <span className={m === mode ? "text-slate-400" : ""}>{m}</span>
              {i < MODES.length - 1 && <span className="mx-1">/</span>}
            </span>
          ))}
        </p>
      </button>

      <p className="text-slate-800 text-xs mt-auto">
        since {format(RELATIONSHIP_START_DATE, "MMM d, yyyy")}
      </p>
    </div>
  );
}
