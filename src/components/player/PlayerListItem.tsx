import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import { Player } from '../../types';

interface PlayerListItemProps {
  player: Player;
  onEdit: () => void;
  onDelete: () => void;
}

export function PlayerListItem({ player, onEdit, onDelete }: PlayerListItemProps) {
  return (
    <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow">
      <span className="text-lg">{player.name}</span>
      <div className="flex gap-2">
        <button
          onClick={onEdit}
          className="p-1 text-blue-500 hover:text-blue-600"
          title="Edit player"
        >
          <Edit2 size={20} />
        </button>
        <button
          onClick={onDelete}
          className="p-1 text-red-500 hover:text-red-600"
          title="Delete player"
        >
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
}