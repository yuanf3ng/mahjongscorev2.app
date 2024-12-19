import React, { useState } from 'react';
import { Player } from '../types';
import { PlayerForm } from './player/PlayerForm';
import { PlayerList } from './player/PlayerList';
import { PlayerEditModal } from './player/PlayerEditModal';

interface PlayerManagerProps {
  players: Player[];
  onAddPlayer: (player: Player) => void;
  onEditPlayer: (id: string, name: string) => void;
  onDeletePlayer: (id: string) => void;
}

export function PlayerManager({
  players,
  onAddPlayer,
  onEditPlayer,
  onDeletePlayer,
}: PlayerManagerProps) {
  const [editingPlayer, setEditingPlayer] = useState<Player | null>(null);

  return (
    <div className="space-y-6">
      <PlayerForm onSubmit={onAddPlayer} />
      
      <PlayerList
        players={players}
        onEdit={setEditingPlayer}
        onDelete={onDeletePlayer}
      />

      {editingPlayer && (
        <PlayerEditModal
          player={editingPlayer}
          onClose={() => setEditingPlayer(null)}
          onSave={(name) => {
            onEditPlayer(editingPlayer.id, name);
            setEditingPlayer(null);
          }}
        />
      )}
    </div>
  );
}