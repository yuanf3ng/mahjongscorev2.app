import { toast } from 'sonner';
import { Player } from '../types';

export function usePlayerManagement(
  players: Player[],
  setPlayers: (players: Player[]) => void,
) {
  const handleAddPlayer = (player: Player) => {
    setPlayers([...players, player]);
    toast.success('Player added successfully!');
  };

  const handleEditPlayer = (id: string, name: string) => {
    setPlayers(players.map(p => p.id === id ? { ...p, name } : p));
    toast.success('Player updated successfully!');
  };

  const handleDeletePlayer = (id: string) => {
    setPlayers(players.filter(p => p.id !== id));
    toast.success('Player deleted successfully!');
  };

  return {
    handleAddPlayer,
    handleEditPlayer,
    handleDeletePlayer,
  };
}