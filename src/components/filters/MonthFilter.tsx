import React from 'react';
import { CalendarClock } from 'lucide-react';

interface MonthFilterProps {
  selectedMonth: string;
  onMonthChange: (month: string) => void;
  availableMonths: string[];
}

export function MonthFilter({
  selectedMonth,
  onMonthChange,
  availableMonths,
}: MonthFilterProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
      <div className="flex items-center gap-2">
        <CalendarClock size={18} className="text-gray-500" />
        <span className="text-sm font-medium text-gray-700">Month:</span>
      </div>
      <select
        value={selectedMonth}
        onChange={(e) => onMonthChange(e.target.value)}
        className="px-3 py-1.5 border rounded-lg text-sm"
      >
        <option value="">All Time</option>
        {availableMonths.map((month) => (
          <option key={month} value={month}>
            {new Date(month + '-01').toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
            })}
          </option>
        ))}
      </select>
    </div>
  );
}