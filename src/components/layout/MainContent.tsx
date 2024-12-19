import React from 'react';
import { Player, GameRecord } from '../../types';
import { TabId } from '../../constants/tabs';
import { PlayerManager } from '../PlayerManager';
import { GameForm } from '../GameForm';
import { GameHistory } from '../GameHistory';
import { Leaderboard } from '../Leaderboard';

interface MainContentProps {
  activeTab: TabId;
  players: Player[];
  games: GameRecord[];
  onSaveGame: (game: Omit<GameRecord, 'id'>) => void;
  onUpdateGame: (game: GameRecord) => void;
  onDeleteGame: (id: string) => void;
  onAddPlayer: (player: Player) => void;
  onEditPlayer: (id: string, name: string) => void;
  onDeletePlayer: (id: string) => void;
}

export function MainContent({
  activeTab,
  players,
  games,
  onSaveGame,
  onUpdateGame,
  onDeleteGame,
  onAddPlayer,
  onEditPlayer,
  onDeletePlayer,
}: MainContentProps) {
  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4 pb-6">
      <div className="bg-white rounded-lg shadow-sm p-3 sm:p-6">
        {activeTab === 'players' && (
          <div className="space-y-4 sm:space-y-6">
            <h2 className="text-xl sm:text-2xl font-bold">Player Management</h2>
            <PlayerManager
              players={players}
              onAddPlayer={onAddPlayer}
              onEditPlayer={onEditPlayer}
              onDeletePlayer={onDeletePlayer}
            />
          </div>
        )}

        {activeTab === 'dashboard' && (
          <div className="space-y-4 sm:space-y-6">
            <h2 className="text-xl sm:text-2xl font-bold">New Game</h2>
            <GameForm 
              players={players} 
              onSaveGame={onSaveGame}
            />
          </div>
        )}

        {activeTab === 'history' && (
          <div className="space-y-4 sm:space-y-6">
            <h2 className="text-xl sm:text-2xl font-bold">Game History</h2>
            <GameHistory
              games={games}
              players={players}
              onDeleteGame={onDeleteGame}
              onUpdateGame={onUpdateGame}
              onEditPlayer={onEditPlayer}
            />
          </div>
        )}

        {activeTab === 'leaderboard' && (
          <div className="space-y-4 sm:space-y-6">
            <h2 className="text-xl sm:text-2xl font-bold">Leaderboard</h2>
            <Leaderboard players={players} games={games} />
          </div>
        )}
      </div>
    </div>
  );
}