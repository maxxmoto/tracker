import React from 'react';
import { Crosshair } from './Crosshair';

export const Hero: React.FC = () => {
  return (
    <section className="relative py-16 md:py-32 px-4" id="hero">
      <Crosshair position="tl" />
      <Crosshair position="tr" />
      <Crosshair position="bl" />
      <Crosshair position="br" />
      
      <div className="text-center space-y-8 md:space-y-12">
        <p className="font-bold uppercase tracking-[0.3em] md:tracking-[0.5em] text-accent animate-pulse text-xs md:text-base">
          Уровень сложности: Хард
        </p>
        <h1 className="font-anton text-[16vw] md:text-[12vw] leading-[0.8] uppercase tracking-tighter overflow-hidden">
          <span className="block hero-title-1">НИКАКИХ</span>
          <span className="relative inline-block mt-2 md:mt-4 hero-title-2">
            <span className="absolute inset-0 text-[#09090b] translate-y-1.5 md:translate-y-3 -translate-x-1 md:-translate-x-2 select-none" aria-hidden="true">
              ОТМАЗОК.
            </span>
            <span className="relative text-white">
              ОТМАЗОК.
              <span className="absolute left-0 top-[60%] w-[110%] h-[0.12em] bg-accent -translate-y-1/2 -rotate-2 -ml-[5%]"></span>
            </span>
          </span>
        </h1>
        <div className="max-w-4xl mx-auto pt-6 md:pt-12">
          <p className="font-anton text-lg md:text-5xl uppercase border-y-4 border-white py-4 md:py-8 tracking-wide hero-sub">
            3 приема пищи. Без сладкого. Без перекусов. Дефицит калорий. Или плати за свою слабость.
          </p>
        </div>
      </div>
    </section>
  );
};
