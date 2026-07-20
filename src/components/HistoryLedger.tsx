import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Crosshair } from './Crosshair';
import type { DayData } from '../hooks/useTracker';

interface HistoryLedgerProps {
  history: (DayData & { date: string })[];
  totalPenalty: number;
}

export const HistoryLedger: React.FC<HistoryLedgerProps> = ({ history, totalPenalty }) => {
  return (
    <section className="space-y-8 md:space-y-12" id="ledger">
      <div className="border-2 md:border-4 border-white p-4 md:p-12 relative">
        <Crosshair position="tl" className="w-6 h-6 md:w-12 md:h-12" />
        <Crosshair position="br" className="w-6 h-6 md:w-12 md:h-12" />
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 md:mb-12 gap-4 md:gap-8">
          <div className="space-y-1 md:space-y-2">
            <h2 className="font-anton text-3xl md:text-7xl uppercase">
              ЖУРНАЛ ПОЗОРА
            </h2>
            <p className="font-bold uppercase tracking-widest opacity-60 text-xs md:text-base">
              Последние 90 дней твоей борьбы
            </p>
          </div>
          <div className="text-left md:text-right border-l-4 md:border-l-0 md:border-r-4 border-accent pl-4 md:px-6">
            <p className="font-bold uppercase text-xs md:text-sm opacity-60 mb-1">
              Сумма твоих слабостей
            </p>
            <p className="font-anton text-4xl md:text-7xl text-accent">
              {totalPenalty.toLocaleString('ru-RU')} ₽
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-7 sm:grid-cols-10 md:grid-cols-15 lg:grid-cols-30 gap-0.5 md:gap-1">
          {history.map((day) => (
            <div
              key={day.date}
              className={`aspect-square border border-black md:border-2 md:border-black history-cell ${
                day.status === 'clean' ? 'bg-accent' : 
                day.status === 'failed' ? 'bg-failure' : 
                'bg-zinc-800 border border-white/20 md:border-2 md:border-white/20'
              }`}
              title={day.date}
            />
          ))}
        </div>

        <div className="mt-6 md:mt-12 pt-4 md:pt-8 border-t-4 border-white/10 flex flex-wrap gap-4 md:gap-8 font-bold uppercase text-xs md:text-sm tracking-widest">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-4 h-4 md:w-6 md:h-6 bg-accent border border-black"></div>
            <span>Достоин</span>
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-4 h-4 md:w-6 md:h-6 bg-failure border border-black"></div>
            <span>Слабак</span>
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-4 h-4 md:w-6 md:h-6 bg-zinc-800 border border-white md:border-2 md:border-white"></div>
            <span>Будущее</span>
          </div>
          <div className="ml-auto flex gap-2 md:gap-4">
            <ChevronLeft className="w-6 h-6 md:w-8 md:h-8 cursor-pointer hover:text-accent" />
            <ChevronRight className="w-6 h-6 md:w-8 md:h-8 cursor-pointer hover:text-accent" />
          </div>
        </div>
      </div>
    </section>
  );
};
