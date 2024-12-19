export function validateGame(
  selectedPlayers: string[],
  scores: { [key: string]: number }
) {
  if (![3, 6].includes(selectedPlayers.length)) {
    return 'Please select exactly 3 or 6 players';
  }

  const totalScore = Object.values(scores).reduce((sum, score) => sum + score, 0);
  if (totalScore !== 0) {
    return 'Total score must be 0';
  }

  const winners = selectedPlayers.filter((id) => scores[id] > 0);
  if (winners.length === 0) {
    return 'There must be at least one winner';
  }

  return null;
}