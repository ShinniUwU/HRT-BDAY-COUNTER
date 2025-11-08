"use client";

import { useEffect, useMemo, useState } from "react";
import {
  differenceInDays,
  differenceInSeconds,
  differenceInYears,
  isPast,
  isToday,
  setYear,
} from "date-fns";
import { motion } from "framer-motion";
import { useNow } from "@/hooks/useNow";

const BIRTH_MONTH = 3; // April (0-indexed months)
const BIRTH_DAY = 5;
const BIRTH_DATE = new Date(2005, BIRTH_MONTH, BIRTH_DAY);

export default function BirthdayCountdown() {
  const now = useNow({ timeZone: "Europe/Sofia", intervalMs: 1000 });
  const [target, setTarget] = useState<Date | null>(null);

  useEffect(() => {
    const currentYear = now.getFullYear();
    let next = new Date(currentYear, BIRTH_MONTH, BIRTH_DAY);
    if (isToday(next) || isPast(next)) {
      next = setYear(next, currentYear + 1);
    }
    setTarget(next);
  }, [now]);

  const countdown = useMemo(() => {
    if (!target) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, targetYear: now.getFullYear() };
    }
    const total = differenceInSeconds(target, now);
    if (total <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, targetYear: target.getFullYear() };
    }
    const days = Math.floor(total / 86400);
    const hours = Math.floor((total % 86400) / 3600);
    const minutes = Math.floor((total % 3600) / 60);
    const seconds = Math.floor(total % 60);
    return { days, hours, minutes, seconds, targetYear: target.getFullYear() };
  }, [now, target]);

  const age = useMemo(() => differenceInYears(now, BIRTH_DATE), [now]);

  return (
    <motion.div
      whileHover={{ boxShadow: "0 0 25px rgba(219, 39, 119, 0.15)" }}
      className="md:col-span-5 bg-slate-800/40 backdrop-blur-md p-6 rounded-2xl border border-slate-700/50 shadow-lg relative overflow-hidden group"
    >
      <h2 className="text-slate-400 text-sm font-medium mb-2 tracking-wide">
        BIRTHDAY COUNTDOWN
      </h2>
      <div className="grid grid-cols-4 gap-4 mt-4">
        <div className="flex flex-col items-center">
          <span className="text-4xl font-light" suppressHydrationWarning>
            {countdown.days}
          </span>
          <span className="text-xs text-slate-400 tracking-wide">days</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-4xl font-light" suppressHydrationWarning>
            {countdown.hours}
          </span>
          <span className="text-xs text-slate-400 tracking-wide">hours</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-4xl font-light" suppressHydrationWarning>
            {countdown.minutes}
          </span>
          <span className="text-xs text-slate-400 tracking-wide">min</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-4xl font-light" suppressHydrationWarning>
            {countdown.seconds}
          </span>
          <span className="text-xs text-slate-400 tracking-wide">sec</span>
        </div>
      </div>
      <p
        className="text-slate-400 text-xs mt-4 text-center tracking-wide"
        suppressHydrationWarning
      >
        until April 5, {countdown.targetYear}
      </p>
      <p
        className="text-slate-400 text-xs mt-2 text-center tracking-wide"
        suppressHydrationWarning
      >
        I am currently <span className="text-pink-300 font-medium">{age}</span> years old
      </p>
    </motion.div>
  );
}
