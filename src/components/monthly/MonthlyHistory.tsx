import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { MonthlyRecord } from '../../types';

interface MonthlyHistoryProps {
  records: MonthlyRecord[];
}

export function MonthlyHistory({ records }: MonthlyHistoryProps) {
  const [expandedMonths, setExpandedMonths] = useState<string[]>([]);

  const toggleMonth = (month: string) => {
    setExpandedMonths(current =>
      current.includes(month)
        ? current.filter(m => m !== month)
        : [...current, month]
    );
  };

  const sortedRecords = [...records].sort((a, b) => b.month.localeCompare(a.month));

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Monthly Archives</h3>
      <div className="space-y-4">
        {sortedRecords.map(record => (
          <div key={record.id} className="border rounded-lg">
            <button
              onClick={() => toggleMonth(record.month)}
              className="w-full px-4 py-3 flex justify-between items-center hover:bg-gray-50"
            >
              <span className="font-medium">
                {new Date(record.month + '-01').toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                })}
              </span>
              {expandedMonths.includes(record.month) ? (
                <ChevronUp size={20} />
              ) : (
                <ChevronDown size={20} />
              )}
            </button>
            
            {expandedMonths.includes(record.month) && (
              <div className="px-4 pb-4">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-4 py-2 text-left">Player</th>
                        <th className="px-4 py-2 text-right">Games</th>
                        <th className="px-4 py-2 text-right">Wins</th>
                        <th className="px-4 py-2 text-right">Total Score</th>
                      </tr>
                    </thead>
                    <tbody>
                      {record.players
                        .sort((a, b) => b.totalScore - a.totalScore)
                        .map(player => (
                          <tr key={player.id} className="hover:bg-gray-50">
                            <td className="px-4 py-2">{player.name}</td>
                            <td className="px-4 py-2 text-right">{player.gamesPlayed}</td>
                            <td className="px-4 py-2 text-right">{player.wins}</td>
                            <td className="px-4 py-2 text-right">{player.totalScore}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}