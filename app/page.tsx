'use client';

import { useState, useEffect } from 'react';
import { Outfit } from 'next/font/google';
import {
  format,
  differenceInDays,
  differenceInMonths,
  differenceInSeconds,
  differenceInYears,
  setYear,
  isPast,
  isToday,
} from 'date-fns';
import { motion } from 'framer-motion';

const outfit = Outfit({ subsets: ['latin'] });

export default function Home() {
  // --- Constants ---
  const BIRTH_MONTH = 3; // April (months are 0-indexed in JS Date: 0=Jan, 3=Apr)
  const BIRTH_DAY = 5;
  const BIRTH_DATE = new Date(2005, BIRTH_MONTH, BIRTH_DAY);
  const HRT_START_DATE = new Date('2023-10-13');
  const RELATIONSHIP_START_DATE = new Date('2024-09-01');

  // --- State ---
  const [currentTime, setCurrentTime] = useState(new Date());
  const [timeFormat, setTimeFormat] = useState<'12h' | '24h'>('12h');
  const [targetBirthdayDate, setTargetBirthdayDate] = useState<Date | null>(
    null,
  );
  const [hasMounted, setHasMounted] = useState(false); // State to check if component has mounted

  // --- Effects ---
  useEffect(() => {
    setHasMounted(true); // Component has mounted on the client
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const savedFormat = localStorage.getItem('timeFormat');
    if (savedFormat === '12h' || savedFormat === '24h') {
      setTimeFormat(savedFormat as '12h' | '24h');
    }
  }, []);

  useEffect(() => {
    // Only run date calculations on the client after mounting
    if (!hasMounted) return;

    const now = currentTime;
    const currentYear = now.getFullYear();
    let nextBirthday = new Date(currentYear, BIRTH_MONTH, BIRTH_DAY);

    if (isToday(nextBirthday) || isPast(nextBirthday)) {
      nextBirthday = setYear(nextBirthday, currentYear + 1);
    }
    setTargetBirthdayDate(nextBirthday);
  }, [currentTime, hasMounted]); // Add hasMounted dependency

  // --- Functions ---
  const toggleTimeFormat = () => {
    const newFormat = timeFormat === '12h' ? '24h' : '12h';
    setTimeFormat(newFormat);
    localStorage.setItem('timeFormat', newFormat);
  };

  const calculateCountdown = () => {
    // Return default values if not mounted or target date not set
    if (!hasMounted || !targetBirthdayDate) {
      const currentYear = new Date().getFullYear();
      let tentativeTarget = new Date(currentYear, BIRTH_MONTH, BIRTH_DAY);
      if (isToday(tentativeTarget) || isPast(tentativeTarget)) {
        tentativeTarget = setYear(tentativeTarget, currentYear + 1);
      }
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        targetYear: tentativeTarget.getFullYear(),
      };
    }

    const totalSeconds = differenceInSeconds(targetBirthdayDate, currentTime);

    if (totalSeconds <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        targetYear: targetBirthdayDate.getFullYear(),
      };
    }

    const days = Math.floor(totalSeconds / (60 * 60 * 24));
    const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
    const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
    const seconds = Math.floor(totalSeconds % 60);
    const targetYear = targetBirthdayDate.getFullYear();

    return { days, hours, minutes, seconds, targetYear };
  };

  const calculateAge = () => {
    if (!hasMounted) return 0; // Return default/placeholder on server
    return differenceInYears(currentTime, BIRTH_DATE);
  };

  const calculateHRTProgress = () => {
    if (!hasMounted) return { months: 0, days: 0, totalDays: 0 }; // Default/placeholder

    const months = differenceInMonths(currentTime, HRT_START_DATE);
    const totalDaysInHRT = differenceInDays(currentTime, HRT_START_DATE);
    const hrtStartPlusMonths = new Date(HRT_START_DATE);
    hrtStartPlusMonths.setMonth(hrtStartPlusMonths.getMonth() + months);
    const daysInCurrentMonth = differenceInDays(
      currentTime,
      hrtStartPlusMonths,
    );

    return { months, days: daysInCurrentMonth, totalDays: totalDaysInHRT };
  };

  const calculateRelationshipDays = () => {
    if (!hasMounted) return 0; // Default/placeholder
    return differenceInDays(currentTime, RELATIONSHIP_START_DATE);
  };

  // --- Calculations ---
  const countdown = calculateCountdown();
  const age = calculateAge();
  const hrtProgress = calculateHRTProgress();
  const relationshipDays = calculateRelationshipDays();

  // --- Framer Motion animations ---
  // ... (keep animations as they are)
  const containerVariants = {
    /* ... */
  };
  const itemVariants = {
    /* ... */
  };

  // --- Render ---
  // Render placeholder or null on server/before mount for dynamic parts
  if (!hasMounted) {
    // Optionally return a loading skeleton or null
    // Returning null might cause layout shifts, a basic structure is often better
    return (
      <main
        className={`min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-100 p-4 md:p-8 ${outfit.className} overflow-hidden`}
      >
        {/* Basic layout skeleton */}
        <div className="max-w-5xl mx-auto relative z-10 opacity-50">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Placeholder blocks matching your layout */}
            <div className="md:col-span-7 h-32 bg-slate-800/40 rounded-2xl"></div>
            <div className="md:col-span-5 h-32 bg-slate-800/40 rounded-2xl"></div>
            <div className="md:col-span-6 h-24 bg-slate-800/40 rounded-2xl"></div>
            <div className="md:col-span-6 h-24 bg-slate-800/40 rounded-2xl"></div>
          </div>
          <div className="mt-12 text-center">
            <p className="text-slate-500 text-xs tracking-widest">Loading...</p>
          </div>
        </div>
      </main>
    );
  }

  // --- Actual Render (Client-side after mount) ---
  return (
    <main
      className={`min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-100 p-4 md:p-8 ${outfit.className} overflow-hidden`}
    >
      {/* Background radials */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-pink-500/5 via-transparent to-transparent pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-purple-500/5 via-transparent to-transparent pointer-events-none"></div>

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-12 gap-6"
        >
          {/* Current Time Block */}
          <motion.div
            variants={itemVariants}
            whileHover={{ boxShadow: '0 0 25px rgba(219, 39, 119, 0.15)' }}
            className="md:col-span-7 bg-slate-800/40 backdrop-blur-md p-6 rounded-2xl border border-slate-700/50 shadow-lg relative overflow-hidden group"
          >
            {/* ... other content ... */}
            <h2 className="text-slate-400 text-sm font-medium mb-2 tracking-wide">
              CURRENT TIME (BULGARIA)
            </h2>
            {/* Add suppressHydrationWarning here */}
            <p
              className="text-5xl font-light tracking-tight"
              suppressHydrationWarning
            >
              {format(
                currentTime,
                timeFormat === '24h' ? 'HH:mm:ss' : 'hh:mm:ss aa',
              )}
            </p>
            {/* And here */}
            <p
              className="text-slate-400 mt-2 tracking-wide"
              suppressHydrationWarning
            >
              {format(currentTime, 'EEEE, MMMM do, yyyy')}
            </p>
            {/* Time format toggle doesn't need suppression */}
            <div className="flex items-center mt-2 space-x-2">
              {/* ... button ... */}
            </div>
          </motion.div>

          {/* Birthday Countdown Block */}
          <motion.div
            variants={itemVariants}
            whileHover={{ boxShadow: '0 0 25px rgba(219, 39, 119, 0.15)' }}
            className="md:col-span-5 bg-slate-800/40 backdrop-blur-md p-6 rounded-2xl border border-slate-700/50 shadow-lg relative overflow-hidden group"
          >
            {/* ... other content ... */}
            <h2 className="text-slate-400 text-sm font-medium mb-2 tracking-wide">
              BIRTHDAY COUNTDOWN
            </h2>
            <div className="grid grid-cols-4 gap-4 mt-4">
              {/* Add suppressHydrationWarning to each changing number */}
              <div className="flex flex-col items-center">
                <span className="text-4xl font-light" suppressHydrationWarning>
                  {countdown.days}
                </span>
                <span className="text-xs text-slate-400 tracking-wide">
                  days
                </span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-4xl font-light" suppressHydrationWarning>
                  {countdown.hours}
                </span>
                <span className="text-xs text-slate-400 tracking-wide">
                  hours
                </span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-4xl font-light" suppressHydrationWarning>
                  {countdown.minutes}
                </span>
                <span className="text-xs text-slate-400 tracking-wide">
                  min
                </span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-4xl font-light" suppressHydrationWarning>
                  {countdown.seconds}
                </span>
                <span className="text-xs text-slate-400 tracking-wide">
                  sec
                </span>
              </div>
            </div>
            {/* Target year might change, so suppress here too */}
            <p
              className="text-slate-400 text-xs mt-4 text-center tracking-wide"
              suppressHydrationWarning
            >
              until April 5, {countdown.targetYear}
            </p>
            {/* Age changes over time */}
            <p
              className="text-slate-400 text-xs mt-2 text-center tracking-wide"
              suppressHydrationWarning
            >
              I am currently{' '}
              <span className="text-pink-300 font-medium">{age}</span> years old
            </p>
          </motion.div>

          {/* HRT Progress Block */}
          <motion.div
            variants={itemVariants}
            whileHover={{ boxShadow: '0 0 25px rgba(147, 51, 234, 0.15)' }}
            className="md:col-span-6 bg-slate-800/40 backdrop-blur-md p-6 rounded-2xl border border-slate-700/50 shadow-lg relative overflow-hidden group"
          >
            {/* ... other content ... */}
            <h2 className="text-slate-400 text-sm font-medium mb-2 tracking-wide">
              HRT PROGRESS
            </h2>
            {/* Suppress warning on the text containing calculated values */}
            <p
              className="text-2xl font-light tracking-tight"
              suppressHydrationWarning
            >
              On HRT for{' '}
              <span className="text-pink-300">{hrtProgress.months} months</span>
              , <span className="text-pink-300">{hrtProgress.days} days</span>
            </p>
            {/* The progress bar style calculation might also cause issues if not handled carefully */}
            {/* Wrapping the dynamic style calculation in a check for `hasMounted` is safer */}
            <div className="w-full h-1 bg-slate-700/50 rounded-full mt-4 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-pink-400 to-purple-400 rounded-full"
                style={{
                  width: `${
                    hasMounted
                      ? Math.min((hrtProgress.months / 24) * 100, 100)
                      : 0
                  }%`,
                }}
              ></div>
            </div>
            {/* Start date is static, no suppression needed */}
            <p className="text-slate-400 text-xs mt-2 tracking-wide">
              Started: {format(HRT_START_DATE, 'MMMM d, yyyy')}
            </p>
          </motion.div>

          {/* Relationship Block */}
          <motion.div
            variants={itemVariants}
            whileHover={{ boxShadow: '0 0 25px rgba(147, 51, 234, 0.15)' }}
            className="md:col-span-6 bg-slate-800/40 backdrop-blur-md p-6 rounded-2xl border border-slate-700/50 shadow-lg relative overflow-hidden group"
          >
            {/* ... other content ... */}
            <h2 className="text-slate-400 text-sm font-medium mb-2 tracking-wide">
              RELATIONSHIP
            </h2>
            {/* Suppress warning on the text containing calculated days */}
            <p
              className="text-2xl font-light tracking-tight"
              suppressHydrationWarning
            >
              Together for{' '}
              <span className="text-purple-300">{relationshipDays} days</span>
            </p>
            <div className="w-full h-1 bg-slate-700/50 rounded-full mt-4 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
                style={{
                  width: `${
                    hasMounted
                      ? Math.min((relationshipDays / 365) * 100, 100)
                      : 0
                  }%`,
                }}
              ></div>
            </div>
            {/* Start date is static */}
            <p className="text-slate-400 text-xs mt-2 tracking-wide">
              Since: {format(RELATIONSHIP_START_DATE, 'MMMM d, yyyy')}
            </p>
          </motion.div>
        </motion.div>

        {/* Footer */}
        <motion.div variants={itemVariants} className="mt-12 text-center">
          <p className="text-slate-500 text-xs tracking-widest">
            Made with <span className="text-pink-400">♥</span> by Hana
          </p>
        </motion.div>
      </div>
    </main>
  );
}
