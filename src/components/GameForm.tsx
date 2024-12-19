import React, { useState } from 'react';
import { Player, GameRecord } from '../types';
import { PlayerSelector } from './game/PlayerSelector';
import { ScoreInput } from './game/ScoreInput';
import { DatePicker } from './game/DatePicker';
import { validateGame } from '../utils/gameValidation';

interface GameFormProps {
  players: Player[];
  onSaveGame: (game: Omit<GameRecord, 'id'>) => void;
}

export function GameForm({ players, onSaveGame }: GameFormProps) {
  const [selectedPlayers, setSelectedPlayers] = useState<string[]>([]);
  const [scores, setScores] = useState<{ [key: string]: number }>({});
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [error, setError] = useState('');

  const handlePlayerToggle = (playerId: string) => {
    setSelectedPlayers((current) => {
      if (current.includes(playerId)) {
        return current.filter((id) => id !== playerId);
      }
      if (current.length >= 6) return current;
      return [...current, playerId];
    });
  };

  const handleScoreChange = (playerId: string, score: string) => {
    setScores((prev) => ({
      ...prev,
      [playerId]: Number(score) || 0,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationError = validateGame(selectedPlayers, scores);
    if (validationError) {
      setError(validationError);
      return;
    }

    const winners = selectedPlayers.filter((id) => scores[id] > 0);
    
    onSaveGame({
      date,
      players: selectedPlayers,
      scores,
      winners,
    });

    setSelectedPlayers([]);
    setScores({});
    setDate(new Date().toISOString().split('T')[0]);
    setError('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <DatePicker date={date} onChange={setDate} />
      
      <PlayerSelector
        players={players}
        selectedPlayers={selectedPlayers}
        onPlayerToggle={handlePlayerToggle}
      />

      {selectedPlayers.length > 0 && (
        <ScoreInput
          selectedPlayers={selectedPlayers}
          players={players}
          scores={scores}
          onScoreChange={handleScoreChange}
        />
      )}

      {error && (
        <div className="text-red-500">{error}</div>
      )}

      <button
        type="submit"
        className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Save Game
      </button>
    </form>
  );
}