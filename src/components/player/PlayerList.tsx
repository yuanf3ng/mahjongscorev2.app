import React from 'react';
import { Player } from '../../types';
import { PlayerListItem } from './PlayerListItem';

interface PlayerListProps {
  players: Player[];
  onEdit: (player: Player) => void;
  onDelete: (id: string) => void;
}

export function PlayerList({ players, onEdit, onDelete }: PlayerListProps) {
  return (
    <div className="space-y-2">
      {players.map((player) => (
        <PlayerListItem
          key={player.id}
          player={player}
          onEdit={() => onEdit(player)}
          onDelete={() => onDelete(player.id)}
        />
      ))}
    </div>
  );
}