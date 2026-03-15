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
import { useNow } from "@/hooks/useNow";

const BIRTH_MONTH = 3; // April (0-indexed months)
const BIRTH_DAY = 5;
const BIRTH_DATE = new Date(2005, BIRTH_MONTH, BIRTH_DAY);

function pad(n: number) {
  return String(n).padStart(2, "0");
}

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
    <div className="md:col-span-12">
      <p className="text-slate-700 text-xs tracking-widest mb-4">
        birthday · april 5, {countdown.targetYear}
      </p>
      <div className="grid grid-cols-4 gap-2" suppressHydrationWarning>
        {[
          { value: pad(countdown.days), unit: "days" },
          { value: pad(countdown.hours), unit: "hours" },
          { value: pad(countdown.minutes), unit: "min" },
          { value: pad(countdown.seconds), unit: "sec" },
        ].map(({ value, unit }) => (
          <div key={unit} className="border border-white/5 rounded-lg p-3 flex flex-col gap-1.5">
            <span className="text-3xl font-light text-slate-100 tabular-nums leading-none">
              {value}
            </span>
            <span className="text-slate-700 text-xs">{unit}</span>
          </div>
        ))}
      </div>
      <p className="text-slate-700 text-xs mt-3" suppressHydrationWarning>
        currently <span className="text-slate-500">{age}</span> yrs old
      </p>
    </div>
  );
}
