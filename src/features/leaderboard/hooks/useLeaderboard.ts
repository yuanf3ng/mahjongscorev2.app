import { useState } from 'react';
import { toast } from 'sonner';
import { Player, GameRecord } from '../../../types';
import { generateLeaderboardText } from '../utils/leaderboardText';

export function useLeaderboard(players: Player[], games: GameRecord[]) {
  const [showShareMenu, setShowShareMenu] = useState(false);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(generateLeaderboardText(players, games));
      toast.success('Leaderboard copied to clipboard!');
    } catch (error) {
      toast.error('Failed to copy to clipboard');
    }
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(generateLeaderboardText(players, games));
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return {
    showShareMenu,
    toggleShareMenu: setShowShareMenu,
    handleShare,
    handleWhatsAppShare,
  };
}