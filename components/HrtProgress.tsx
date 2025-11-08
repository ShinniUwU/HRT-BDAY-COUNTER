"use client";

import { useMemo } from "react";
import { differenceInDays, differenceInMonths, format } from "date-fns";
import { motion } from "framer-motion";
import { useNow } from "@/hooks/useNow";

const HRT_START_DATE = new Date("2023-10-13");

export default function HrtProgress() {
  const now = useNow({ timeZone: "Europe/Sofia", intervalMs: 1000 });

  const { months, days } = useMemo(() => {
    const m = differenceInMonths(now, HRT_START_DATE);
    const anchor = new Date(HRT_START_DATE);
    anchor.setMonth(anchor.getMonth() + m);
    const d = differenceInDays(now, anchor);
    return { months: m, days: d };
  }, [now]);

  const percent = useMemo(() => Math.min((months / 24) * 100, 100), [months]);

  return (
    <motion.div
      whileHover={{ boxShadow: "0 0 25px rgba(147, 51, 234, 0.15)" }}
      className="md:col-span-6 bg-slate-800/40 backdrop-blur-md p-6 rounded-2xl border border-slate-700/50 shadow-lg relative overflow-hidden group"
    >
      <h2 className="text-slate-400 text-sm font-medium mb-2 tracking-wide">HRT PROGRESS</h2>
      <p className="text-2xl font-light tracking-tight" suppressHydrationWarning>
        On HRT for <span className="text-pink-300">{months} months</span>, {" "}
        <span className="text-pink-300">{days} days</span>
      </p>
      <div className="w-full h-1 bg-slate-700/50 rounded-full mt-4 overflow-hidden" role="progressbar" aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100} aria-label="HRT progress">
        <div
          className="h-full bg-gradient-to-r from-pink-400 to-purple-400 rounded-full"
          style={{ width: `${percent}%` }}
        />
      </div>
      <p className="text-slate-400 text-xs mt-2 tracking-wide">
        Started: {format(HRT_START_DATE, "MMMM d, yyyy")}
      </p>
    </motion.div>
  );
}
