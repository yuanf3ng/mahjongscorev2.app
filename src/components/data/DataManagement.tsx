import React, { useRef } from 'react';
import { Download, Upload, FileJson } from 'lucide-react';
import { toast } from 'sonner';
import { DataExportButton } from './DataExportButton';
import { DataImportButton } from './DataImportButton';
import { Player, GameRecord } from '../../types';

interface DataManagementProps {
  players: Player[];
  games: GameRecord[];
  onImport: (data: { players: Player[]; games: GameRecord[] }) => void;
}

export function DataManagement({ players, games, onImport }: DataManagementProps) {
  return (
    <div className="flex items-center gap-2">
      <DataExportButton players={players} games={games} />
      <DataImportButton onImport={onImport} />
    </div>
  );
}