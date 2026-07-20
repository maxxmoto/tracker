import React, { useEffect, useRef } from 'react';
import { X, ArrowRightCircle, Building2 } from 'lucide-react';
import gsap from 'gsap';

interface PenaltyOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PenaltyOverlay: React.FC<PenaltyOverlayProps> = ({ isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      gsap.to(overlayRef.current, { display: 'flex', opacity: 1, duration: 0.3 });
      gsap.fromTo(modalRef.current, 
        { scale: 0.5, y: 100, opacity: 0 },
        { scale: 1, y: 0, opacity: 1, duration: 0.6, ease: "back.out(1.2)" }
      );
    } else {
      gsap.to(modalRef.current, {
        scale: 0.5, y: 100, opacity: 0, duration: 0.4, ease: "power2.in",
        onComplete: () => {
          gsap.set(overlayRef.current, { display: 'none', opacity: 0 });
        }
      });
    }
  }, [isOpen]);

  return (
    <div 
      ref={overlayRef}
      className="fixed inset-0 bg-black/90 backdrop-blur-md z-[100] hidden items-center justify-center p-4 opacity-0"
    >
      <div 
        ref={modalRef}
        className="bg-accent text-black p-6 md:p-12 border-[6px] md:border-[12px] border-black max-w-2xl w-full relative shadow-[15px_15px_0px_0px_rgba(255,255,255,0.1)] md:shadow-[30px_30px_0px_0px_rgba(255,255,255,0.1)] overflow-hidden"
      >
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 md:top-4 md:right-4 text-black hover:rotate-90 transition-transform cursor-pointer"
        >
          <X size={28} />
        </button>

        <div className="flex justify-between items-start mb-6 md:mb-12">
          <div>
            <div className="bg-black text-accent inline-block px-2 md:px-3 py-0.5 md:py-1 font-anton text-xs md:text-lg mb-2 md:mb-4">
              УВЕДОМЛЕНИЕ О ШТРАФЕ
            </div>
            <h2 className="font-anton text-4xl md:text-7xl uppercase leading-none tracking-tighter">
              ПРАВИЛА ЕСТЬ ПРАВИЛА
            </h2>
            <p className="font-bold uppercase text-sm md:text-xl mt-2 md:mt-4 tracking-tighter border-l-4 border-black pl-3 md:pl-4">
              Слабость стоит денег. Без исключений.
            </p>
          </div>
          <div className="bg-black p-2 md:p-4 shrink-0 hidden sm:block">
            <img 
              src="https://cdn.jsdelivr.net/npm/game-icons-transparent@latest/svgs/lorc/skull-mask.svg" 
              className="w-10 h-10 md:w-20 md:h-20 invert"
              alt=""
            />
          </div>
        </div>

        <div className="border-y-4 md:border-y-8 border-black py-8 md:py-16 mb-6 md:mb-12 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-8">
          <span className="font-anton text-[5rem] md:text-[10rem] leading-none">
            100 ₽
          </span>
          <div className="text-center md:text-right flex flex-col items-center md:items-end">
            <Building2 size={48} className="mb-2" />
            <span className="font-anton text-lg md:text-2xl uppercase">
              TINKOFF BANK
            </span>
          </div>
        </div>

        <a
          href="tinkoffbank://"
          onClick={() => {
            setTimeout(() => { window.location.href = "https://www.tbank.ru/"; }, 500);
          }}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-black text-accent font-anton text-2xl md:text-5xl py-6 md:py-8 hover:bg-zinc-900 transition-all flex items-center justify-center gap-4 md:gap-6 group cursor-pointer border-b-4 md:border-b-8 border-white/20 no-underline"
        >
          ПЕРЕВЕСТИ СЕЙЧАС
          <ArrowRightCircle className="group-hover:translate-x-4 transition-transform w-8 h-8 md:w-12 md:h-12" />
        </a>
      </div>
    </div>
  );
};
