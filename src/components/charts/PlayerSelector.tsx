import React from 'react';
import { Player } from '../../types';

interface PlayerSelectorProps {
  players: Player[];
  selectedPlayers: string[];
  onTogglePlayer: (playerId: string) => void;
}

export function PlayerSelector({ players, selectedPlayers, onTogglePlayer }: PlayerSelectorProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {players.map((player) => (
        <button
          key={player.id}
          onClick={() => onTogglePlayer(player.id)}
          className={`px-3 py-1 rounded-full text-sm transition-colors ${
            selectedPlayers.includes(player.id)
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          {player.name}
        </button>
      ))}
    </div>
  );
}