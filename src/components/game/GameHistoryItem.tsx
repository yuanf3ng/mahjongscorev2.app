import React from 'react';
import { Edit2, Trash2, UserCog } from 'lucide-react';
import { Player, GameRecord } from '../../types';

interface GameHistoryItemProps {
  game: GameRecord;
  players: Player[];
  onEdit: () => void;
  onDelete: () => void;
  onEditPlayer: (player: Player) => void;
}

export function GameHistoryItem({ 
  game, 
  players, 
  onEdit, 
  onDelete,
  onEditPlayer,
}: GameHistoryItemProps) {
  const getPlayerName = (id: string) => 
    players.find((p) => p.id === id)?.name || 'Unknown Player';

  return (
    <div className="bg-white rounded-lg shadow p-3 sm:p-4 space-y-2">
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-500">
          {new Date(game.date).toLocaleDateString()}
        </div>
        <div className="flex gap-1 sm:gap-2">
          <button
            onClick={onEdit}
            className="p-1 text-blue-500 hover:text-blue-600"
            title="Edit game"
          >
            <Edit2 size={18} />
          </button>
          <button
            onClick={onDelete}
            className="p-1 text-red-500 hover:text-red-600"
            title="Delete game"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
        {game.players.map((playerId) => {
          const player = players.find(p => p.id === playerId);
          if (!player) return null;

          return (
            <div
              key={playerId}
              className={`p-2 sm:p-3 rounded ${
                game.winners.includes(playerId)
                  ? 'bg-green-100'
                  : 'bg-gray-100'
              }`}
            >
              <div className="flex justify-between items-center">
                <div className="font-medium text-sm sm:text-base">{player.name}</div>
                <button
                  onClick={() => onEditPlayer(player)}
                  className="p-1 text-gray-500 hover:text-gray-600"
                  title="Edit player"
                >
                  <UserCog size={16} />
                </button>
              </div>
              <div className="text-base sm:text-lg">
                {game.scores[playerId] > 0 ? '+' : ''}
                {game.scores[playerId]}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}