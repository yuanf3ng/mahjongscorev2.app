import React from 'react';
import { Player } from '../../types';

interface PlayerSelectorProps {
  players: Player[];
  selectedPlayers: string[];
  onPlayerToggle: (playerId: string) => void;
}

export function PlayerSelector({ players, selectedPlayers, onPlayerToggle }: PlayerSelectorProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Select Players (3 or 6)
      </label>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {players.map((player) => (
          <button
            key={player.id}
            type="button"
            onClick={() => onPlayerToggle(player.id)}
            className={`p-2 rounded-lg border transition-colors ${
              selectedPlayers.includes(player.id)
                ? 'bg-blue-500 text-white border-blue-600'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
          >
            {player.name}
          </button>
        ))}
      </div>
    </div>
  );
}