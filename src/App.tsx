import { useState, useLayoutEffect, useRef } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { MealTracker } from './components/MealTracker';
import { StatusQuestion } from './components/StatusQuestion';
import { HistoryLedger } from './components/HistoryLedger';
import { PenaltyOverlay } from './components/PenaltyOverlay';
import { useTracker } from './hooks/useTracker';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const { todayData, toggleMeal, setStatus, history, totalPenalty, currentDay } = useTracker();
  const [isPenaltyOpen, setIsPenaltyOpen] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.from(".hero-title-1", { y: 100, opacity: 0, duration: 1, ease: "expo.out" })
        .from(".hero-title-2", { y: 50, opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.5")
        .from(".hero-sub", { opacity: 0, duration: 0.8 }, "-=0.3")
        .from(".meal-card", { y: 100, opacity: 0, stagger: 0.1, duration: 0.8, ease: "power4.out" }, "-=0.5");

      gsap.from(".history-cell", {
        scrollTrigger: {
          trigger: "#ledger",
          start: "top 70%"
        },
        scale: 0,
        opacity: 0,
        stagger: {
          grid: [3, 30],
          from: "random",
          amount: 1
        },
        duration: 0.5,
        ease: "back.out(1.7)"
      });
    }, mainRef);
    return () => ctx.revert();
  }, []);

  const handleFailed = () => {
    setStatus('failed');
    setIsPenaltyOpen(true);
  };

  const handleClean = () => {
    setStatus('clean');
    gsap.to("#btn-clean", { 
      keyframes: {
        x: [-10, 10, -5, 5, 0],
      },
      duration: 0.4 
    });
  };

  return (
    <div ref={mainRef} className="bg-[#09090b] text-white font-space min-h-screen selection:bg-accent selection:text-black overflow-x-clip relative">
      <div className="noise-bg fixed inset-0 opacity-[0.05] pointer-events-none z-50 mix-blend-overlay bg-[url('https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?auto=format&w=1280&q=80&fit=crop')]"></div>
      
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12 space-y-16 md:space-y-24">
        <Hero />
        <MealTracker meals={todayData.meals} onToggle={toggleMeal} currentDay={currentDay} />
        <StatusQuestion onClean={handleClean} onFailed={handleFailed} />
        <HistoryLedger history={history} totalPenalty={totalPenalty} />
      </main>

      <PenaltyOverlay 
        isOpen={isPenaltyOpen} 
        onClose={() => setIsPenaltyOpen(false)} 
      />

      <footer className="border-t-4 border-white p-12 text-center space-y-6 bg-black">
        <div className="flex flex-wrap justify-center gap-6 md:gap-12 font-anton text-2xl md:text-4xl opacity-20 uppercase tracking-[0.2em]">
          <span>Честность</span>
          <span>Боль</span>
          <span>Рост</span>
        </div>
        <p className="opacity-50 font-bold uppercase tracking-widest text-xs">
          © 2026 <a href="https://maxxmoto.github.io/vexio/" target="_blank" rel="noopener noreferrer" className="text-accent hover:opacity-80 transition-opacity">Vexio Studio</a>. ВСЕ ПРАВА ЗАЩИЩЕНЫ
        </p>
      </footer>
    </div>
  );
}

export default App;
