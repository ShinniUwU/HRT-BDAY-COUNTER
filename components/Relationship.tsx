"use client";

import { useMemo } from "react";
import { differenceInDays, format } from "date-fns";
import { motion } from "framer-motion";
import { useNow } from "@/hooks/useNow";

const RELATIONSHIP_START_DATE = new Date("2024-09-01");

export default function Relationship() {
  const now = useNow({ timeZone: "Europe/Sofia", intervalMs: 1000 });

  const days = useMemo(() => differenceInDays(now, RELATIONSHIP_START_DATE), [now]);
  const percent = useMemo(() => Math.min((days / 365) * 100, 100), [days]);

  return (
    <motion.div
      whileHover={{ boxShadow: "0 0 25px rgba(147, 51, 234, 0.15)" }}
      className="md:col-span-6 bg-slate-800/40 backdrop-blur-md p-6 rounded-2xl border border-slate-700/50 shadow-lg relative overflow-hidden group"
    >
      <h2 className="text-slate-400 text-sm font-medium mb-2 tracking-wide">RELATIONSHIP</h2>
      <p className="text-2xl font-light tracking-tight" suppressHydrationWarning>
        Together for <span className="text-purple-300">{days} days</span>
      </p>
      <div className="w-full h-1 bg-slate-700/50 rounded-full mt-4 overflow-hidden" role="progressbar" aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100} aria-label="Relationship days progress">
        <div
          className="h-full bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
          style={{ width: `${percent}%` }}
        />
      </div>
      <p className="text-slate-400 text-xs mt-2 tracking-wide">
        Since: {format(RELATIONSHIP_START_DATE, "MMMM d, yyyy")}
      </p>
    </motion.div>
  );
}
