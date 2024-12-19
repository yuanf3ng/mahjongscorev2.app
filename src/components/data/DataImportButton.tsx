import React, { useRef } from 'react';
import { Upload, FileJson } from 'lucide-react';
import { toast } from 'sonner';
import { Player, GameRecord } from '../../types';

interface DataImportButtonProps {
  onImport: (data: { players: Player[]; games: GameRecord[] }) => void;
}

export function DataImportButton({ onImport }: DataImportButtonProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result as string);
        
        // Validate data structure
        if (!Array.isArray(data.players) || !Array.isArray(data.games)) {
          throw new Error('Invalid data format');
        }

        // Validate required fields
        const isValidData = data.players.every((p: any) => 
          p.id && p.name && p.createdAt
        ) && data.games.every((g: any) => 
          g.id && g.date && Array.isArray(g.players) && 
          g.scores && Array.isArray(g.winners)
        );

        if (!isValidData) {
          throw new Error('Invalid data structure');
        }

        onImport(data);
        toast.success('Data imported successfully!');
      } catch (error) {
        console.error('Error importing data:', error);
        toast.error('Invalid data file');
      }
      
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    };
    reader.readAsText(file);
  };

  return (
    <label className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer">
      <Upload size={20} />
      <span className="hidden sm:inline">Import</span>
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleImport}
        className="hidden"
      />
    </label>
  );
}