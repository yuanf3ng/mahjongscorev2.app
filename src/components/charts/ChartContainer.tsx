import React from 'react';
import { Share2 } from 'lucide-react';

interface ChartContainerProps {
  title: string;
  onShare?: () => void;
  children: React.ReactNode;
}

export function ChartContainer({ title, onShare, children }: ChartContainerProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">{title}</h3>
        {onShare && (
          <button
            onClick={onShare}
            className="flex items-center gap-2 px-3 py-1.5 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            <Share2 size={16} />
            Share
          </button>
        )}
      </div>
      {children}
    </div>
  );
}