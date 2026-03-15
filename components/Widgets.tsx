"use client";

import dynamic from "next/dynamic";

const Clock = dynamic(() => import("./Clock"), {
  ssr: false,
  loading: () => (
    <div className="md:col-span-12 pb-8 border-b border-white/5 h-32 bg-white/3 animate-pulse rounded-sm" />
  ),
});

const BirthdayCountdown = dynamic(() => import("./BirthdayCountdown"), {
  ssr: false,
  loading: () => (
    <div className="md:col-span-12 h-24 bg-white/3 animate-pulse rounded-sm" />
  ),
});

const HrtProgress = dynamic(() => import("./HrtProgress"), {
  ssr: false,
  loading: () => (
    <div className="md:col-span-6 bg-white/3 border border-white/5 rounded-lg h-28 animate-pulse" />
  ),
});

const Relationship = dynamic(() => import("./Relationship"), {
  ssr: false,
  loading: () => (
    <div className="md:col-span-6 bg-white/3 border border-white/5 rounded-lg h-28 animate-pulse" />
  ),
});

export default function Widgets() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
      <Clock />
      <BirthdayCountdown />
      <HrtProgress />
      <Relationship />
    </div>
  );
}
