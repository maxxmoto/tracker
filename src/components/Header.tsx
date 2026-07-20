import React from 'react';

export const Header: React.FC = () => {
  const today = new Date().toLocaleDateString('ru-RU');

  return (
    <header className="border-b-4 border-white p-4 md:p-6 flex justify-between items-center sticky top-0 bg-[#09090b] z-40">
      <div className="flex items-center gap-2 md:gap-4 min-w-0">
        <img 
          src="https://cdn.jsdelivr.net/npm/game-icons-transparent@latest/svgs/lorc/skull-mask.svg" 
          alt="Logo" 
          className="w-8 h-8 md:w-10 md:h-10 invert shrink-0"
        />
        <span className="font-anton text-lg md:text-2xl tracking-widest uppercase truncate">
          ФУДКОРТ
        </span>
      </div>
      <div className="hidden md:flex gap-8 font-bold uppercase text-sm tracking-widest">
        <a href="#" className="hover:text-accent">Лог</a>
        <a href="#" className="hover:text-accent">Правила</a>
        <a href="#" className="hover:text-accent">Статистика</a>
      </div>
      <div className="font-anton text-sm md:text-xl border-2 border-white px-3 md:px-4 py-0.5 md:py-1 shrink-0">
        {today}
      </div>
    </header>
  );
};
