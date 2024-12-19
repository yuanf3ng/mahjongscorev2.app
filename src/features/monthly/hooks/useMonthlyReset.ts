import { useEffect } from 'react';
import { toast } from 'sonner';
import { Player, GameRecord, MonthlyRecord } from '../../../types';
import { shouldResetScores, createMonthlyRecord, getGameMonth } from '../utils/monthlyUtils';

export function useMonthlyReset(
  games: GameRecord[],
  players: Player[],
  setGames: (games: GameRecord[]) => void,
  setMonthlyRecords: (records: MonthlyRecord[]) => void,
) {
  useEffect(() => {
    const lastGame = games[games.length - 1];
    if (lastGame && shouldResetScores(lastGame.date)) {
      const lastMonth = getGameMonth(lastGame.date);
      const monthlyGames = games.filter(game => getGameMonth(game.date) === lastMonth);
      
      const monthlyRecord = createMonthlyRecord(lastMonth, monthlyGames, players);
      setMonthlyRecords(prev => [...prev, monthlyRecord]);
      setGames([]);
      
      toast.success(`Started new month! Previous month's records have been archived.`);
    }
  }, [games, players, setGames, setMonthlyRecords]);
}