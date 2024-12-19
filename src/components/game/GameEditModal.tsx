import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Player, GameRecord } from '../../types';
import { DatePicker } from './DatePicker';
import { PlayerSelector } from './PlayerSelector';
import { ScoreInput } from './ScoreInput';
import { validateGame } from '../../utils/gameValidation';

interface GameEditModalProps {
  game: GameRecord;
  players: Player[];
  onClose: () => void;
  onSave: (game: GameRecord) => void;
}

export function GameEditModal({ game, players, onClose, onSave }: GameEditModalProps) {
  const [date, setDate] = useState(game.date);
  const [selectedPlayers, setSelectedPlayers] = useState<string[]>(game.players);
  const [scores, setScores] = useState(game.scores);
  const [error, setError] = useState('');

  const handlePlayerToggle = (playerId: string) => {
    setSelectedPlayers((current) => {
      if (current.includes(playerId)) {
        const newPlayers = current.filter((id) => id !== playerId);
        setScores(prev => {
          const newScores = { ...prev };
          delete newScores[playerId];
          return newScores;
        });
        return newPlayers;
      }
      if (current.length >= 6) return current;
      return [...current, playerId];
    });
  };

  const handleScoreChange = (playerId: string, score: string) => {
    setScores(prev => ({
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
    
    onSave({
      ...game,
      date,
      players: selectedPlayers,
      scores,
      winners,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl p-4 sm:p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Edit Game</h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
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
            <div className="text-red-500 text-sm">{error}</div>
          )}

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 sm:px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg text-sm sm:text-base"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 sm:px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm sm:text-base"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}