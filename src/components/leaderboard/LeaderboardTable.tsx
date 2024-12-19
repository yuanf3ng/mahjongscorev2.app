import React from 'react';
import { Trophy, Share2 } from 'lucide-react';
import { Player, GameRecord } from '../../types';
import { calculatePlayerStats } from '../../utils/chartUtils';

interface LeaderboardTableProps {
  players: Player[];
  games: GameRecord[];
  onShare: () => void;
}

export function LeaderboardTable({ players, games, onShare }: LeaderboardTableProps) {
  const stats = players
    .map((player) => ({
      player,
      ...calculatePlayerStats(games, player),
    }))
    .filter(stat => stat.totalScore !== 0 || stat.gamesPlayed > 0)
    .sort((a, b) => b.totalScore - a.totalScore);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Rankings</h3>
        <button
          onClick={onShare}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          <Share2 size={20} />
          Share Rankings
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-2 text-left">Rank</th>
              <th className="px-4 py-2 text-left">Player</th>
              <th className="px-4 py-2 text-right">Games</th>
              <th className="px-4 py-2 text-right">Wins</th>
              <th className="px-4 py-2 text-right">Win Rate</th>
              <th className="px-4 py-2 text-right">Avg Score</th>
              <th className="px-4 py-2 text-right">Total Score</th>
            </tr>
          </thead>
          <tbody>
            {stats.map((stat, index) => (
              <tr
                key={stat.player.id}
                className={`${
                  index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                } hover:bg-gray-100`}
              >
                <td className="px-4 py-2 flex items-center gap-2">
                  {index < 3 && (
                    <Trophy
                      size={20}
                      className={
                        index === 0
                          ? 'text-yellow-400'
                          : index === 1
                          ? 'text-gray-400'
                          : 'text-amber-600'
                      }
                    />
                  )}
                  {index + 1}
                </td>
                <td className="px-4 py-2">{stat.player.name}</td>
                <td className="px-4 py-2 text-right">{stat.gamesPlayed}</td>
                <td className="px-4 py-2 text-right">{stat.wins}</td>
                <td className="px-4 py-2 text-right">
                  {stat.winRate.toFixed(1)}%
                </td>
                <td className="px-4 py-2 text-right">
                  {stat.averageScore.toFixed(1)}
                </td>
                <td className="px-4 py-2 text-right">{stat.totalScore}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}