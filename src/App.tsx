import React, { useState } from 'react';
import { Toaster } from 'sonner';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Player, GameRecord } from './types';
import { Navigation } from './components/layout/Navigation';
import { TabId } from './constants/tabs';
import { useGameManagement } from './hooks/useGameManagement';
import { usePlayerManagement } from './hooks/usePlayerManagement';
import { useDataManagement } from './hooks/useDataManagement';
import { MainContent } from './components/layout/MainContent';

export function App() {
  const [players, setPlayers] = useLocalStorage<Player[]>('mahjong-players', []);
  const [games, setGames] = useLocalStorage<GameRecord[]>('mahjong-games', []);
  const [activeTab, setActiveTab] = useState<TabId>('players');

  const { handleSaveGame, handleUpdateGame, handleDeleteGame } = useGameManagement(games, setGames, setActiveTab);
  const { handleAddPlayer, handleEditPlayer, handleDeletePlayer } = usePlayerManagement(players, setPlayers);
  const { handleImportData, handleExportData } = useDataManagement(players, games, setPlayers, setGames);

  return (
    <div className="min-h-screen bg-gray-100">
      <Toaster position="top-right" />
      <Navigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onExport={handleExportData}
        onImport={handleImportData}
        players={players}
        games={games}
      />

      <MainContent
        activeTab={activeTab}
        players={players}
        games={games}
        onSaveGame={handleSaveGame}
        onUpdateGame={handleUpdateGame}
        onDeleteGame={handleDeleteGame}
        onAddPlayer={handleAddPlayer}
        onEditPlayer={handleEditPlayer}
        onDeletePlayer={handleDeletePlayer}
      />
    </div>
  );
}