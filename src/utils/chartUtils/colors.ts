export function getPlayerColor(index: number, totalPlayers: number): string {
  return `hsl(${(index * 360) / totalPlayers}, 70%, 50%)`;
}