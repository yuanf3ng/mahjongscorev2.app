import React, { useState } from 'react';
import { Player, GameRecord } from '../types';
import { GameHistoryItem } from './game/GameHistoryItem';
import { GameEditModal } from './game/GameEditModal';
import { PlayerEditModal } from './player/PlayerEditModal';

interface GameHistoryProps {
  games: GameRecord[];
  players: Player[];
  onDeleteGame: (id: string) => void;
  onUpdateGame: (game: GameRecord) => void;
  onEditPlayer: (id: string, name: string) => void;
}

export function GameHistory({ 
  games, 
  players, 
  onDeleteGame, 
  onUpdateGame,
  onEditPlayer,
}: GameHistoryProps) {
  const [editingGame, setEditingGame] = useState<GameRecord | null>(null);
  const [editingPlayer, setEditingPlayer] = useState<Player | null>(null);

  const sortedGames = [...games].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="space-y-4">
      {sortedGames.map((game) => (
        <GameHistoryItem
          key={game.id}
          game={game}
          players={players}
          onEdit={() => setEditingGame(game)}
          onDelete={() => onDeleteGame(game.id)}
          onEditPlayer={(player) => setEditingPlayer(player)}
        />
      ))}

      {editingGame && (
        <GameEditModal
          game={editingGame}
          players={players}
          onClose={() => setEditingGame(null)}
          onSave={(updatedGame) => {
            onUpdateGame(updatedGame);
            setEditingGame(null);
          }}
        />
      )}

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