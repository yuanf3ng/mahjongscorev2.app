import { toast } from 'sonner';
import { Player, GameRecord } from '../types';

export function useDataManagement(
  players: Player[],
  games: GameRecord[],
  setPlayers: (players: Player[]) => void,
  setGames: (games: GameRecord[]) => void,
) {
  const handleImportData = (data: { players: Player[]; games: GameRecord[] }) => {
    setPlayers(data.players);
    setGames(data.games);
    toast.success('Data imported successfully!');
  };

  const handleExportData = () => {
    const data = { players, games };
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mahjong-data-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Data exported successfully!');
  };

  return {
    handleImportData,
    handleExportData,
  };
}