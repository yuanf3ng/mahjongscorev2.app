import { useState, useMemo } from 'react';
import { GameRecord } from '../types';

export function useGameFilters(games: GameRecord[]) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');

  const availableMonths = useMemo(() => {
    const months = new Set<string>();
    games.forEach((game) => {
      months.add(game.date.substring(0, 7));
    });
    return Array.from(months).sort().reverse();
  }, [games]);

  const filteredGames = useMemo(() => {
    let filtered = [...games];

    if (selectedMonth) {
      filtered = filtered.filter((game) => 
        game.date.startsWith(selectedMonth)
      );
    } else if (startDate || endDate) {
      filtered = filtered.filter((game) => {
        if (startDate && game.date < startDate) return false;
        if (endDate && game.date > endDate) return false;
        return true;
      });
    }

    return filtered;
  }, [games, startDate, endDate, selectedMonth]);

  return {
    startDate,
    endDate,
    selectedMonth,
    availableMonths,
    filteredGames,
    setStartDate,
    setEndDate,
    setSelectedMonth,
  };
}