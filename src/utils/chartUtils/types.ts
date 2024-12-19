export interface DailyScores {
  [key: string]: { [playerId: string]: number };
}

export interface ChartDataPoint {
  [key: string]: string | number;
}