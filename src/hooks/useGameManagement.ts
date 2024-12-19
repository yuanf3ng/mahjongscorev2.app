import { useState } from 'react';
import { toast } from 'sonner';
import { GameRecord } from '../types';
import { TabId } from '../constants/tabs';

export function useGameManagement(
  games: GameRecord[],
  setGames: (games: GameRecord[]) => void,
  setActiveTab: (tab: TabId) => void,
) {
  const handleSaveGame = (game: Omit<GameRecord, 'id'>) => {
    const newGame = {
      ...game,
      id: crypto.randomUUID(),
    };
    setGames([...games, newGame]);
    toast.success('Game saved successfully!');
    setActiveTab('history');
  };

  const handleUpdateGame = (updatedGame: GameRecord) => {
    setGames(games.map(g => g.id === updatedGame.id ? updatedGame : g));
    toast.success('Game updated successfully!');
  };

  const handleDeleteGame = (id: string) => {
    setGames(games.filter(g => g.id !== id));
    toast.success('Game deleted successfully!');
  };

  return {
    handleSaveGame,
    handleUpdateGame,
    handleDeleteGame,
  };
}