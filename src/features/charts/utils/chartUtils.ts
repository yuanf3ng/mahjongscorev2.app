import { GameRecord, Player } from '../../../types';

interface DailyScores {
  [key: string]: { [playerId: string]: number };
}

export function getDailyScores(games: GameRecord[], players: Player[]) {
  const dailyScores: DailyScores = {};
  const playerScores: { [playerId: string]: number } = {};
  
  players.forEach(player => {
    playerScores[player.id] = 0;
  });

  const sortedGames = [...games].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  sortedGames.forEach(game => {
    const date = game.date;
    players.forEach(player => {
      if (game.players.includes(player.id)) {
        playerScores[player.id] += game.scores[player.id] || 0;
      }
    });
    dailyScores[date] = { ...playerScores };
  });

  return Object.entries(dailyScores)
    .map(([date, scores]) => ({
      date,
      ...scores,
    }));
}

export function getPlayerColor(index: number, totalPlayers: number): string {
  return `hsl(${(index * 360) / totalPlayers}, 70%, 50%)`;
}