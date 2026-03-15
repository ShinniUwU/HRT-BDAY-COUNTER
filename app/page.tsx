import { Outfit } from 'next/font/google';
import Widgets from '@/components/Widgets';

const outfit = Outfit({ subsets: ['latin'] });

export const runtime = 'edge';


export default function Home() {
  return (
    <main
      className={`min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-100 p-4 md:p-8 ${outfit.className} overflow-hidden`}
    >
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at top right, rgba(236,72,153,0.05) 0%, transparent 70%)' }} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at bottom left, rgba(168,85,247,0.05) 0%, transparent 70%)' }} />

      <div className="max-w-5xl mx-auto relative z-10">
        <Widgets />

        <div className="mt-12 text-center">
          <p className="text-slate-500 text-xs tracking-widest">
            Made with <span className="text-pink-400">♥</span> by Hana
          </p>
        </div>
      </div>
    </main>
  );
}
