import React from 'react';
import { Player } from '../../types';

interface ScoreInputProps {
  selectedPlayers: string[];
  players: Player[];
  scores: { [key: string]: number };
  onScoreChange: (playerId: string, score: string) => void;
}

export function ScoreInput({ selectedPlayers, players, scores, onScoreChange }: ScoreInputProps) {
  const totalScore = Object.values(scores).reduce((sum, score) => sum + score, 0);

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Scores
      </label>
      <div className="space-y-2">
        {selectedPlayers.map((playerId) => {
          const player = players.find((p) => p.id === playerId);
          if (!player) return null;

          return (
            <div key={playerId} className="flex gap-2 items-center">
              <span className="w-32 font-medium">{player.name}:</span>
              <input
                type="number"
                value={scores[playerId] || ''}
                onChange={(e) => onScoreChange(playerId, e.target.value)}
                className="w-24 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          );
        })}
      </div>
      <div className={`mt-2 font-medium ${totalScore === 0 ? 'text-green-600' : 'text-red-500'}`}>
        Total Score: {totalScore}
      </div>
    </div>
  );
}