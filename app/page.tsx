import { JetBrains_Mono } from 'next/font/google';
import Widgets from '@/components/Widgets';

const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'] });

export const runtime = 'edge';

export default function Home() {
  return (
    <main
      className={`min-h-screen bg-[#090909] text-slate-100 p-6 md:p-10 ${jetbrainsMono.className}`}
      style={{
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.025) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
      }}
    >
      <div className="max-w-xl mx-auto flex flex-col min-h-[calc(100vh-5rem)] justify-center gap-10">
        <Widgets />
        <p className="text-slate-800 text-xs tracking-widest text-center">
          made with ♥ by hana
        </p>
      </div>
    </main>
  );
}
