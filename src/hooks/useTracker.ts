import { useState, useEffect, useMemo } from 'react';

export type MealType = 'breakfast' | 'lunch' | 'dinner';
export type DayStatus = 'clean' | 'failed' | 'incomplete';

export interface DayData {
  meals: { [key in MealType]: boolean };
  status: DayStatus;
}

interface HistoryData {
  [date: string]: DayData;
}

export const useTracker = () => {
  const [history, setHistory] = useState<HistoryData>(() => {
    const saved = localStorage.getItem('discipline-history');
    return saved ? JSON.parse(saved) : {};
  });

  const today = useMemo(() => {
    const d = new Date();
    const offset = d.getTimezoneOffset();
    const localDate = new Date(d.getTime() - (offset * 60 * 1000));
    return localDate.toISOString().split('T')[0];
  }, []);

  const todayData = useMemo(() => history[today] || {
    meals: { breakfast: false, lunch: false, dinner: false },
    status: 'incomplete' as DayStatus,
  }, [history, today]);

  const currentDay = useMemo(() => {
    let startDate = localStorage.getItem('tracker-start-date');
    if (!startDate) {
      startDate = today;
      localStorage.setItem('tracker-start-date', startDate);
    }
    const start = new Date(startDate);
    const now = new Date(today);
    const diff = Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return Math.min(diff + 1, 90);
  }, [today]);

  useEffect(() => {
    localStorage.setItem('discipline-history', JSON.stringify(history));
  }, [history]);

  const toggleMeal = (type: MealType) => {
    setHistory((prev) => ({
      ...prev,
      [today]: {
        ...todayData,
        meals: {
          ...todayData.meals,
          [type]: !todayData.meals[type],
        },
      },
    }));
  };

  const setStatus = (status: DayStatus) => {
    setHistory((prev) => ({
      ...prev,
      [today]: {
        ...todayData,
        status,
      },
    }));
  };

  const getHistoryArray = (days: number) => {
    const arr = [];
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const offset = d.getTimezoneOffset();
      const localDate = new Date(d.getTime() - (offset * 60 * 1000));
      const dateStr = localDate.toISOString().split('T')[0];
      arr.push({
        date: dateStr,
        ...(history[dateStr] || { meals: { breakfast: false, lunch: false, dinner: false }, status: 'incomplete' }),
      });
    }
    return arr;
  };

  const totalPenalty = useMemo(() => {
    return Object.values(history).filter(day => day.status === 'failed').length * 100;
  }, [history]);

  return {
    todayData,
    toggleMeal,
    setStatus,
    history: getHistoryArray(90),
    totalPenalty,
    currentDay,
  };
};
