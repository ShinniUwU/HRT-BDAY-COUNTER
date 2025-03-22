"use client"

import { useState, useEffect } from "react"
import { Outfit } from "next/font/google"
import {
  format,
  differenceInDays,
  differenceInMonths,
  differenceInSeconds,
  differenceInYears,
} from "date-fns"
import { motion } from "framer-motion"

const outfit = Outfit({ subsets: ["latin"] })

export default function Home() {
  // Date constants
  const BIRTHDAY_DATE = new Date("2025-04-05")
  const BIRTH_DATE = new Date("2005-04-05") // For calculating your actual age
  const HRT_START_DATE = new Date("2023-10-13")
  const RELATIONSHIP_START_DATE = new Date("2024-09-01")

  // State for current time
  const [currentTime, setCurrentTime] = useState(new Date())

  // State for time format (12h / 24h)
  const [timeFormat, setTimeFormat] = useState<"12h" | "24h">("12h")

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  // Load saved time format from localStorage on mount
  useEffect(() => {
    const savedFormat = localStorage.getItem("timeFormat")
    if (savedFormat === "12h" || savedFormat === "24h") {
      setTimeFormat(savedFormat as "12h" | "24h")
    }
  }, [])

  // Toggle the time format
  const toggleTimeFormat = () => {
    const newFormat = timeFormat === "12h" ? "24h" : "12h"
    setTimeFormat(newFormat)
    localStorage.setItem("timeFormat", newFormat)
  }

  // Calculate countdown to birthday
  const calculateCountdown = () => {
    const totalSeconds = Math.floor(differenceInSeconds(BIRTHDAY_DATE, currentTime))
    if (totalSeconds <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }

    const days = Math.floor(totalSeconds / (60 * 60 * 24))
    const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60))
    const minutes = Math.floor((totalSeconds % (60 * 60)) / 60)
    const seconds = Math.floor(totalSeconds % 60)

    return { days, hours, minutes, seconds }
  }

  // Calculate current age dynamically
  const calculateAge = () => {
    return differenceInYears(currentTime, BIRTH_DATE)
  }

  // Calculate HRT progress
  const calculateHRTProgress = () => {
    const months = differenceInMonths(currentTime, HRT_START_DATE)
    const totalDaysInHRT = differenceInDays(currentTime, HRT_START_DATE)
    // Simple approximation for days in the partial month
    const daysInCurrentMonth = totalDaysInHRT - months * 30
    return { months, days: daysInCurrentMonth }
  }

  // Calculate relationship days
  const calculateRelationshipDays = () => {
    return differenceInDays(currentTime, RELATIONSHIP_START_DATE)
  }

  const countdown = calculateCountdown()
  const age = calculateAge()
  const hrtProgress = calculateHRTProgress()
  const relationshipDays = calculateRelationshipDays()

  // Framer Motion animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  }

  return (
    <main
      className={`min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-100 p-4 md:p-8 ${outfit.className} overflow-hidden`}
    >
      {/* Background radials for subtle glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-pink-500/5 via-transparent to-transparent pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-purple-500/5 via-transparent to-transparent pointer-events-none"></div>

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-12 gap-6"
        >
          {/* Current Time Block (md:col-span-7) */}
          <motion.div
            variants={itemVariants}
            whileHover={{ boxShadow: "0 0 25px rgba(219, 39, 119, 0.15)" }}
            className="md:col-span-7 bg-slate-800/40 backdrop-blur-md p-6 rounded-2xl border border-slate-700/50 shadow-lg relative overflow-hidden group"
          >
            {/* pointer-events-none overlay so toggle is clickable */}
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

            <h2 className="text-slate-400 text-sm font-medium mb-2 tracking-wide">
              CURRENT TIME (BULGARIA)
            </h2>
            <p className="text-5xl font-light tracking-tight">
              {format(currentTime, timeFormat === "24h" ? "HH:mm:ss" : "hh:mm:ss aa")}
            </p>
            <p className="text-slate-400 mt-2 tracking-wide">
              {format(currentTime, "EEEE, MMMM do, yyyy")}
            </p>

            {/* Debug text (optional) */}
            <p className="text-xs text-slate-600 mt-1">
              Current Format: <strong>{timeFormat}</strong>
            </p>

            {/* Single pill toggle for 12h/24h */}
            <div className="flex items-center mt-2 space-x-2">
              <button
                onClick={toggleTimeFormat}
                className="text-xs px-2 py-0.5 rounded-full bg-slate-700/30 border border-slate-700/50 hover:border-pink-500/30 transition-colors duration-300 flex items-center space-x-1"
              >
                <span className={`${timeFormat === "12h" ? "text-pink-300" : "text-slate-400"}`}>
                  12h
                </span>
                <span className="text-slate-500">/</span>
                <span className={`${timeFormat === "24h" ? "text-pink-300" : "text-slate-400"}`}>
                  24h
                </span>
              </button>
            </div>
          </motion.div>

          {/* Birthday Countdown Block (md:col-span-5) + age info */}
          <motion.div
            variants={itemVariants}
            whileHover={{ boxShadow: "0 0 25px rgba(219, 39, 119, 0.15)" }}
            className="md:col-span-5 bg-slate-800/40 backdrop-blur-md p-6 rounded-2xl border border-slate-700/50 shadow-lg relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
            <h2 className="text-slate-400 text-sm font-medium mb-2 tracking-wide">
              BIRTHDAY COUNTDOWN
            </h2>
            <div className="grid grid-cols-4 gap-4 mt-4">
              <div className="flex flex-col items-center">
                <span className="text-4xl font-light">{countdown.days}</span>
                <span className="text-xs text-slate-400 tracking-wide">days</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-4xl font-light">{countdown.hours}</span>
                <span className="text-xs text-slate-400 tracking-wide">hours</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-4xl font-light">{countdown.minutes}</span>
                <span className="text-xs text-slate-400 tracking-wide">min</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-4xl font-light">{countdown.seconds}</span>
                <span className="text-xs text-slate-400 tracking-wide">sec</span>
              </div>
            </div>
            <p className="text-slate-400 text-xs mt-4 text-center tracking-wide">
              until April 5, 2025
            </p>

            {/* Dynamic Age Display */}
            <p className="text-slate-400 text-xs mt-2 text-center tracking-wide">
              You are currently <span className="text-pink-300 font-medium">{age}</span> years old
            </p>
          </motion.div>

          {/* HRT Progress Block (md:col-span-6) */}
          <motion.div
            variants={itemVariants}
            whileHover={{ boxShadow: "0 0 25px rgba(147, 51, 234, 0.15)" }}
            className="md:col-span-6 bg-slate-800/40 backdrop-blur-md p-6 rounded-2xl border border-slate-700/50 shadow-lg relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
            <h2 className="text-slate-400 text-sm font-medium mb-2 tracking-wide">HRT PROGRESS</h2>
            <p className="text-2xl font-light tracking-tight">
              On HRT for <span className="text-pink-300">{hrtProgress.months} months</span>,{" "}
              <span className="text-pink-300">{hrtProgress.days} days</span>
            </p>
            <div className="w-full h-1 bg-slate-700/50 rounded-full mt-4 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-pink-400 to-purple-400 rounded-full"
                style={{ width: `${Math.min((hrtProgress.months / 24) * 100, 100)}%` }}
              ></div>
            </div>
            <p className="text-slate-400 text-xs mt-2 tracking-wide">Started: October 13, 2023</p>
          </motion.div>

          {/* Relationship Block (md:col-span-6) */}
          <motion.div
            variants={itemVariants}
            whileHover={{ boxShadow: "0 0 25px rgba(147, 51, 234, 0.15)" }}
            className="md:col-span-6 bg-slate-800/40 backdrop-blur-md p-6 rounded-2xl border border-slate-700/50 shadow-lg relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
            <h2 className="text-slate-400 text-sm font-medium mb-2 tracking-wide">RELATIONSHIP</h2>
            <p className="text-2xl font-light tracking-tight">
              Together for <span className="text-purple-300">{relationshipDays} days</span>
            </p>
            <div className="w-full h-1 bg-slate-700/50 rounded-full mt-4 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
                style={{ width: `${Math.min((relationshipDays / 365) * 100, 100)}%` }}
              ></div>
            </div>
            <p className="text-slate-400 text-xs mt-2 tracking-wide">Since: September 1, 2024</p>
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
  )
}
