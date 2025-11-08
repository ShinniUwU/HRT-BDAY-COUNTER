import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { Outfit } from 'next/font/google';

const outfit = Outfit({ subsets: ['latin'] });

export const runtime = 'edge';

const Clock = dynamic(() => import('@/components/Clock'), { suspense: true });

const BirthdayCountdown = dynamic(() => import('@/components/BirthdayCountdown'), { suspense: true });

const HrtProgress = dynamic(() => import('@/components/HrtProgress'), { suspense: true });

const Relationship = dynamic(() => import('@/components/Relationship'), { suspense: true });

export default function Home() {
  return (
    <main
      className={`min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-100 p-4 md:p-8 ${outfit.className} overflow-hidden`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-pink-500/5 via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-purple-500/5 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <Suspense fallback={<div className="md:col-span-7 h-32 rounded-2xl bg-slate-800/40" />}>
            <Clock />
          </Suspense>
          <Suspense fallback={<div className="md:col-span-5 h-32 rounded-2xl bg-slate-800/40" />}>
            <BirthdayCountdown />
          </Suspense>
          <Suspense fallback={<div className="md:col-span-6 h-28 rounded-2xl bg-slate-800/40" />}>
            <HrtProgress />
          </Suspense>
          <Suspense fallback={<div className="md:col-span-6 h-28 rounded-2xl bg-slate-800/40" />}>
            <Relationship />
          </Suspense>
        </div>

        <div className="mt-12 text-center">
          <p className="text-slate-500 text-xs tracking-widest">
            Made with <span className="text-pink-400">♥</span> by Hana
          </p>
        </div>
      </div>
    </main>
  );
}
