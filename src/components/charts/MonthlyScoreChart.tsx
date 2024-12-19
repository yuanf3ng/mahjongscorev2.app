import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { GameRecord, Player } from '../../types';
import { getMonthlyScores, getPlayerColor } from '../../utils/chartUtils';
import { formatMonth } from './ChartComponents';
import { PlayerSelector } from './PlayerSelector';
import { ChartContainer } from './ChartContainer';

interface MonthlyScoreChartProps {
  games: GameRecord[];
  players: Player[];
}

export function MonthlyScoreChart({ games, players }: MonthlyScoreChartProps) {
  const [selectedPlayers, setSelectedPlayers] = useState<string[]>(
    players.slice(0, 4).map(p => p.id)
  );

  const handleTogglePlayer = (playerId: string) => {
    setSelectedPlayers(current => 
      current.includes(playerId)
        ? current.filter(id => id !== playerId)
        : [...current, playerId]
    );
  };

  const monthlyData = getMonthlyScores(games, players.filter(p => selectedPlayers.includes(p.id)));

  return (
    <ChartContainer title="Monthly Trends">
      <PlayerSelector
        players={players}
        selectedPlayers={selectedPlayers}
        onTogglePlayer={handleTogglePlayer}
      />
      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={monthlyData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="month" 
              tickFormatter={formatMonth}
            />
            <YAxis />
            <Tooltip 
              labelFormatter={formatMonth}
            />
            <Legend />
            {players
              .filter(player => selectedPlayers.includes(player.id))
              .map((player, index) => (
                <Line
                  key={player.id}
                  type="monotone"
                  dataKey={player.id}
                  name={player.name}
                  stroke={getPlayerColor(index, players.length)}
                  dot={false}
                />
              ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </ChartContainer>
  );
}