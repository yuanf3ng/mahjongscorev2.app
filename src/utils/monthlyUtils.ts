import { GameRecord, Player, MonthlyRecord } from '../types';
import { calculatePlayerStats } from './chartUtils';

export function getCurrentMonth(): string {
  const date = new Date();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
}

export function getGameMonth(date: string): string {
  return date.substring(0, 7); // Extract YYYY-MM from YYYY-MM-DD
}

export function shouldResetScores(lastGameDate: string | null): boolean {
  if (!lastGameDate) return false;

  const today = new Date();
  const lastGame = new Date(lastGameDate);
  
  // Check if we're in a new month
  return today.getMonth() !== lastGame.getMonth() ||
         today.getFullYear() !== lastGame.getFullYear();
}

export function createMonthlyRecord(
  month: string,
  games: GameRecord[],
  players: Player[]
): MonthlyRecord {
  const playerStats = players.map(player => {
    const stats = calculatePlayerStats(games, player);
    return {
      id: player.id,
      name: player.name,
      totalScore: stats.totalScore,
      gamesPlayed: stats.gamesPlayed,
      wins: stats.wins,
    };
  });

  return {
    id: crypto.randomUUID(),
    month,
    players: playerStats,
    games,
  };
}