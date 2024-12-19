import { Player, GameRecord } from '../types';
import { calculatePlayerStats } from './chartUtils';

export function generateLeaderboardText(players: Player[], games: GameRecord[]): string {
  const stats = players
    .map((player) => ({
      player,
      ...calculatePlayerStats(games, player),
    }))
    .filter(stat => stat.totalScore !== 0 || stat.gamesPlayed > 0)
    .sort((a, b) => b.totalScore - a.totalScore);

  const header = '🎲 Mahjong Leaderboard 🏆\n\n';
  const rows = stats.map((stat, index) => 
    `${index + 1}. ${stat.player.name}\n` +
    `   Score: ${stat.totalScore} | Games: ${stat.gamesPlayed} | Win Rate: ${stat.winRate.toFixed(1)}%`
  ).join('\n\n');
  
  return header + rows;
}