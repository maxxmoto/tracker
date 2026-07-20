import React from 'react';
import { Flame, Check } from 'lucide-react';
import { Crosshair } from './Crosshair';
import type { MealType } from '../hooks/useTracker';

interface MealTrackerProps {
  meals: { [key in MealType]: boolean };
  onToggle: (type: MealType) => void;
  currentDay: number;
}

export const MealTracker: React.FC<MealTrackerProps> = ({ meals, onToggle, currentDay }) => {
  const mealItems: { id: MealType; label: string; number: string }[] = [
    { id: 'breakfast', label: 'Завтрак', number: '01' },
    { id: 'lunch', label: 'Обед', number: '02' },
    { id: 'dinner', label: 'Ужин', number: '03' },
  ];

  return (
    <section className="space-y-10 md:space-y-16" id="tracker">
      <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
        <h2 className="font-anton text-4xl md:text-7xl uppercase flex items-center gap-3 md:gap-4">
          <Flame className="w-8 h-8 md:w-12 md:h-12 text-accent shrink-0" />
          <span className="leading-tight">СЕГОДНЯШНИЙ ОТЧЕТ</span>
        </h2>
        <div className="h-1 flex-1 bg-white/20 hidden md:block"></div>
        <div className="bg-accent text-black px-4 md:px-6 py-1 md:py-2 font-anton text-lg md:text-2xl uppercase self-start md:self-auto">
          ДЕНЬ {currentDay} / 90
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-2 md:border-4 border-white relative">
        <Crosshair position="tl" color="#ffdd2d" className="-top-3 -left-3 md:-top-5 md:-left-5" />
        <Crosshair position="tr" color="#ffdd2d" className="-top-3 -right-3 md:-top-5 md:-right-5" />
        
        {mealItems.map((item) => (
          <div
            key={item.id}
            onClick={() => onToggle(item.id)}
            className={`meal-card p-6 md:p-10 border-b-2 md:border-b-4 md:border-b-0 md:border-r-4 last:border-r-0 border-white flex flex-col justify-between aspect-auto md:aspect-square cursor-pointer hover:bg-white/10 transition-colors group ${
              meals[item.id] ? 'bg-accent text-black' : ''
            }`}
          >
            <div className="flex justify-between items-start">
              <span className={`font-anton text-3xl md:text-5xl ${meals[item.id] ? 'opacity-100' : 'opacity-30 group-hover:opacity-100 group-hover:text-accent'}`}>
                {item.number}
              </span>
              <Flame className={`w-5 h-5 md:w-8 md:h-8 ${meals[item.id] ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 transition-opacity'}`} />
            </div>
            <h3 className="font-anton text-5xl md:text-7xl uppercase mt-4 md:mt-0">
              {item.label}
            </h3>
            <div className="flex justify-between items-end mt-4 md:mt-0">
              <span className="font-anton text-base md:text-2xl uppercase tracking-widest">
                {meals[item.id] ? 'ВЫПОЛНЕНО' : 'ОЖИДАНИЕ'}
              </span>
              <div className={`w-10 h-10 md:w-16 md:h-16 border-2 md:border-4 border-white flex items-center justify-center ${meals[item.id] ? 'bg-black text-accent' : 'bg-black'}`}>
                {meals[item.id] && <Check className="w-7 h-7 md:w-12 md:h-12" />}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
