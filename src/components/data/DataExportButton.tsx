import React from 'react';
import { Download, FileJson } from 'lucide-react';
import { toast } from 'sonner';
import { Player, GameRecord } from '../../types';

interface DataExportButtonProps {
  players: Player[];
  games: GameRecord[];
}

export function DataExportButton({ players, games }: DataExportButtonProps) {
  const handleExport = () => {
    try {
      const data = { players, games };
      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: 'application/json',
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      const timestamp = new Date().toISOString().split('T')[0];
      a.href = url;
      a.download = `mahjong-data-${timestamp}.json`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success('Data exported successfully!');
    } catch (error) {
      console.error('Error exporting data:', error);
      toast.error('Failed to export data');
    }
  };

  return (
    <button
      onClick={handleExport}
      className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      title="Export data"
    >
      <Download size={20} />
      <span className="hidden sm:inline">Export</span>
    </button>
  );
}