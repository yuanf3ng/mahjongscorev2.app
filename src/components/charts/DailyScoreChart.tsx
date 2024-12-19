import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Player, GameRecord } from '../../types';
import { formatDate, CustomTooltip, CustomLegend } from './ChartComponents';
import { getDailyScores, getPlayerColor } from '../../utils/chartUtils';
import { PlayerSelector } from './PlayerSelector';
import { ChartContainer } from './ChartContainer';

interface DailyScoreChartProps {
  games: GameRecord[];
  players: Player[];
}

export function DailyScoreChart({ games, players }: DailyScoreChartProps) {
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

  const dailyData = getDailyScores(games, players.filter(p => selectedPlayers.includes(p.id)));

  return (
    <ChartContainer title="Score Trends">
      <PlayerSelector
        players={players}
        selectedPlayers={selectedPlayers}
        onTogglePlayer={handleTogglePlayer}
      />
      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={dailyData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="date" 
              tickFormatter={formatDate}
            />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomLegend />} />
            {players
              .filter(player => selectedPlayers.includes(player.id))
              .map((player, index) => (
                <Line
                  key={player.id}
                  type="monotone"
                  dataKey={player.id}
                  name={player.name}
                  stroke={getPlayerColor(index, players.length)}
                  dot={true}
                  activeDot={{ r: 6 }}
                />
              ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </ChartContainer>
  );
}