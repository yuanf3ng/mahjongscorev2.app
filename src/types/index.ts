export interface Player {
  id: string;
  name: string;
  createdAt: string;
}

export interface GameRecord {
  id: string;
  date: string;
  players: string[];
  scores: { [playerId: string]: number };
  winners: string[];
}

export interface PlayerStats {
  wins: number;
  gamesPlayed: number;
  totalScore: number;
  averageScore: number;
  winRate: number;
}