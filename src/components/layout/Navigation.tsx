import React from 'react';
import { TABS, TabId } from '../../constants/tabs';
import { DataManagement } from '../data/DataManagement';
import { Player, GameRecord } from '../../types';

interface NavigationProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
  onExport: () => void;
  onImport: (data: { players: Player[]; games: GameRecord[] }) => void;
  players: Player[];
  games: GameRecord[];
}

export function Navigation({
  activeTab,
  onTabChange,
  onExport,
  onImport,
  players,
  games,
}: NavigationProps) {
  return (
    <>
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-lg sm:text-xl font-bold">Mahjong Score</h1>
              </div>
            </div>
            <div className="flex items-center">
              <DataManagement
                players={players}
                games={games}
                onImport={onImport}
              />
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex space-x-2 sm:space-x-4 mb-4 overflow-x-auto pb-2 scrollbar-hide">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 rounded-lg whitespace-nowrap text-sm sm:text-base ${
                activeTab === tab.id
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              <tab.icon size={18} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}