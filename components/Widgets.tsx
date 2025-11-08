"use client";

import dynamic from "next/dynamic";

const Clock = dynamic(() => import("./Clock"), {
  ssr: false,
  loading: () => (
    <div className="md:col-span-7 bg-slate-800/40 p-6 rounded-2xl border border-slate-700/50 h-32 animate-pulse" />
  ),
});

const BirthdayCountdown = dynamic(() => import("./BirthdayCountdown"), {
  ssr: false,
  loading: () => (
    <div className="md:col-span-5 bg-slate-800/40 p-6 rounded-2xl border border-slate-700/50 h-32 animate-pulse" />
  ),
});

const HrtProgress = dynamic(() => import("./HrtProgress"), {
  ssr: false,
  loading: () => (
    <div className="md:col-span-6 bg-slate-800/40 p-6 rounded-2xl border border-slate-700/50 h-28 animate-pulse" />
  ),
});

const Relationship = dynamic(() => import("./Relationship"), {
  ssr: false,
  loading: () => (
    <div className="md:col-span-6 bg-slate-800/40 p-6 rounded-2xl border border-slate-700/50 h-28 animate-pulse" />
  ),
});

export default function Widgets() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
      <Clock />
      <BirthdayCountdown />
      <HrtProgress />
      <Relationship />
    </div>
  );
}

