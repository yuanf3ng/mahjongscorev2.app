import React, { useState } from 'react';
import { Player, GameRecord } from '../../../types';
import { DailyScoreChart } from '../../charts/components/DailyScoreChart';
import { LeaderboardTable } from './LeaderboardTable';
import { ShareMenu } from '../../shared/components/ShareMenu';
import { useLeaderboard } from '../hooks/useLeaderboard';

interface LeaderboardViewProps {
  players: Player[];
  games: GameRecord[];
}

export function LeaderboardView({ players, games }: LeaderboardViewProps) {
  const { showShareMenu, handleShare, handleWhatsAppShare, toggleShareMenu } = useLeaderboard(players, games);

  return (
    <div className="space-y-8">
      <DailyScoreChart games={games} players={players} />
      <LeaderboardTable 
        players={players} 
        games={games}
        onShare={() => toggleShareMenu(true)} 
      />

      {showShareMenu && (
        <ShareMenu
          onClose={() => toggleShareMenu(false)}
          onCopy={handleShare}
          onWhatsApp={handleWhatsAppShare}
        />
      )}
    </div>
  );
}