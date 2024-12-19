import { toast } from 'sonner';
import { Player, GameRecord, MonthlyRecord } from '../types';

export function useAppData(
  setPlayers: (players: Player[]) => void,
  setGames: (games: GameRecord[]) => void,
  setMonthlyRecords: (records: MonthlyRecord[]) => void,
) {
  const handleImportData = (data: { 
    players: Player[]; 
    games: GameRecord[]; 
    monthlyRecords?: MonthlyRecord[] 
  }) => {
    setPlayers(data.players);
    setGames(data.games);
    if (data.monthlyRecords) {
      setMonthlyRecords(data.monthlyRecords);
    }
    toast.success('Data imported successfully!');
  };

  const handleExportData = () => {
    const data = {
      players,
      games,
      monthlyRecords,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mahjong-data-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return {
    handleImportData,
    handleExportData,
  };
}