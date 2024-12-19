import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Player } from '../../types';

interface PlayerFormProps {
  onSubmit: (player: Player) => void;
}

export function PlayerForm({ onSubmit }: PlayerFormProps) {
  const [name, setName] = useState('');

  const handleSubmit = () => {
    if (name.trim()) {
      onSubmit({
        id: crypto.randomUUID(),
        name: name.trim(),
        createdAt: new Date().toISOString(),
      });
      setName('');
    }
  };

  return (
    <div className="flex gap-2">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="New player name"
        className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={handleSubmit}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-2"
      >
        <Plus size={20} /> Add
      </button>
    </div>
  );
}