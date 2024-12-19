import React from 'react';
import { Player, GameRecord } from '../types';
import { DailyScoreChart } from './charts/DailyScoreChart';
import { LeaderboardTable } from './leaderboard/LeaderboardTable';
import { DateRangeFilter } from './filters/DateRangeFilter';
import { MonthFilter } from './filters/MonthFilter';
import { useGameFilters } from '../hooks/useGameFilters';

interface LeaderboardProps {
  players: Player[];
  games: GameRecord[];
}

export function Leaderboard({ players, games }: LeaderboardProps) {
  const {
    startDate,
    endDate,
    selectedMonth,
    availableMonths,
    filteredGames,
    setStartDate,
    setEndDate,
    setSelectedMonth,
  } = useGameFilters(games);

  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-lg shadow-sm space-y-4">
        <h3 className="text-lg font-semibold mb-4">Filters</h3>
        <div className="flex flex-col sm:flex-row gap-4">
          <MonthFilter
            selectedMonth={selectedMonth}
            onMonthChange={(month) => {
              setSelectedMonth(month);
              setStartDate('');
              setEndDate('');
            }}
            availableMonths={availableMonths}
          />
          <div className="hidden sm:block w-px bg-gray-200" />
          <DateRangeFilter
            startDate={startDate}
            endDate={endDate}
            onStartDateChange={(date) => {
              setStartDate(date);
              setSelectedMonth('');
            }}
            onEndDateChange={(date) => {
              setEndDate(date);
              setSelectedMonth('');
            }}
          />
        </div>
      </div>

      <DailyScoreChart games={filteredGames} players={players} />
      <LeaderboardTable players={players} games={filteredGames} />
    </div>
  );
}