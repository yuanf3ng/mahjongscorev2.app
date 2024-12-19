import { GameRecord, Player } from '../types';

interface DailyScores {
  [key: string]: { [playerId: string]: number };
}

export function getDailyScores(games: GameRecord[], players: Player[]) {
  // Initialize scores for all players
  const dailyScores: DailyScores = {};
  const playerScores: { [playerId: string]: number } = {};
  
  players.forEach(player => {
    playerScores[player.id] = 0;
  });

  // Sort games by date
  const sortedGames = [...games].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  // Calculate cumulative scores for each day
  sortedGames.forEach(game => {
    const date = game.date;
    
    // Update running totals for each player
    players.forEach(player => {
      if (game.players.includes(player.id)) {
        playerScores[player.id] += game.scores[player.id] || 0;
      }
    });
    
    // Store the current cumulative scores for this date
    dailyScores[date] = { ...playerScores };
  });

  // Convert to array format for Recharts
  return Object.entries(dailyScores)
    .map(([date, scores]) => ({
      date,
      ...scores,
    }));
}

export function calculatePlayerStats(games: GameRecord[], player: Player) {
  const playerGames = games.filter(game => game.players.includes(player.id));
  const wins = games.filter(game => game.winners.includes(player.id)).length;
  const totalScore = playerGames.reduce(
    (sum, game) => sum + (game.scores[player.id] || 0),
    0
  );
  const gamesPlayed = playerGames.length;
  const winRate = gamesPlayed ? (wins / gamesPlayed) * 100 : 0;
  const averageScore = gamesPlayed ? totalScore / gamesPlayed : 0;

  return {
    wins,
    gamesPlayed,
    totalScore,
    winRate,
    averageScore,
  };
}

export function getPlayerColor(index: number, totalPlayers: number): string {
  return `hsl(${(index * 360) / totalPlayers}, 70%, 50%)`;
}