import React, { useEffect, useRef } from 'react';
import { Copy, MessageCircle } from 'lucide-react';

interface ShareMenuProps {
  onClose: () => void;
  onCopy: () => void;
  onWhatsApp: () => void;
}

export function ShareMenu({ onClose, onCopy, onWhatsApp }: ShareMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-20 flex items-start justify-center z-50">
      <div
        ref={menuRef}
        className="mt-20 bg-white rounded-lg shadow-lg border p-2 w-48"
      >
        <button
          onClick={() => {
            onCopy();
            onClose();
          }}
          className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded transition-colors"
        >
          <Copy size={18} />
          Copy to Clipboard
        </button>
        <button
          onClick={() => {
            onWhatsApp();
            onClose();
          }}
          className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded transition-colors"
        >
          <MessageCircle size={18} />
          Share on WhatsApp
        </button>
      </div>
    </div>
  );
}