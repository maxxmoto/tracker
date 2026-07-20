import React from 'react';
import { TriangleAlert } from 'lucide-react';

interface StatusQuestionProps {
  onClean: () => void;
  onFailed: () => void;
}

export const StatusQuestion: React.FC<StatusQuestionProps> = ({ onClean, onFailed }) => {
  return (
    <section className="border-2 md:border-4 border-white p-6 md:p-12 relative bg-[#18181b] overflow-hidden group/question" id="the-question">
      <div className="absolute inset-0 bg-white/5 opacity-0 group-hover/question:opacity-100 transition-opacity"></div>
      <div className="absolute -right-10 md:-right-20 -top-10 md:-top-20 opacity-10">
        <img 
          src="https://cdn.jsdelivr.net/npm/game-icons-transparent@latest/svgs/lorc/skull-mask.svg" 
          className="w-40 h-40 md:w-80 md:h-80 invert"
          alt=""
        />
      </div>
      <div className="relative z-10 text-center space-y-6 md:space-y-12">
        <div className="flex justify-center gap-3 md:gap-4 mb-2 md:mb-4">
          <TriangleAlert className="text-accent w-6 h-6 md:w-10 md:h-10" />
          <TriangleAlert className="text-accent w-6 h-6 md:w-10 md:h-10" />
          <TriangleAlert className="text-accent w-6 h-6 md:w-10 md:h-10" />
        </div>
        <h2 className="font-anton text-4xl md:text-9xl uppercase leading-none tracking-tighter">
          СЛАДКОЕ ИЛИ ПЕРЕКУС БЫЛИ?
        </h2>
        <div className="flex flex-col md:flex-row gap-4 md:gap-8 justify-center items-stretch max-w-5xl mx-auto">
          <button 
            id="btn-clean"
            onClick={onClean}
            className="flex-1 bg-success text-black font-anton text-4xl md:text-6xl py-6 md:py-10 px-8 md:px-12 border-4 border-black hover:-translate-x-2 md:hover:-translate-x-4 hover:-translate-y-2 md:hover:-translate-y-4 hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] md:hover:shadow-[16px_16px_0px_0px_rgba(255,255,255,1)] active:translate-x-0 active:translate-y-0 active:shadow-none uppercase cursor-pointer transition-all"
          >
            ЧИСТО
          </button>
          <button 
            id="btn-failed"
            onClick={onFailed}
            className="flex-1 bg-failure text-black font-anton text-4xl md:text-6xl py-6 md:py-10 px-8 md:px-12 border-4 border-black hover:translate-x-2 md:hover:translate-x-4 hover:-translate-y-2 md:hover:-translate-y-4 hover:shadow-[-8px_8px_0px_0px_rgba(255,255,255,1)] md:hover:shadow-[-16px_16px_0px_0px_rgba(255,255,255,1)] active:translate-x-0 active:translate-y-0 active:shadow-none uppercase cursor-pointer transition-all"
          >
            СОРВАЛСЯ
          </button>
        </div>
      </div>
    </section>
  );
};
