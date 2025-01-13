import React from 'react';
import { CDP } from '../types';

interface CDPSelectorProps {
  selectedCDP: CDP;
  onSelect: (cdp: CDP) => void;
}

export default function CDPSelector({ selectedCDP, onSelect }: CDPSelectorProps) {
  const cdps: CDP[] = ['all', 'segment', 'mparticle', 'lytics', 'zeotap'];

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-4xl mx-auto px-4 py-4">
        <select
          value={selectedCDP}
          onChange={(e) => onSelect(e.target.value as CDP)}
          className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm md:text-base bg-white"
        >
          {cdps.map((cdp) => (
            <option key={cdp} value={cdp}>
              {cdp === 'all' ? 'All CDPs' : cdp.charAt(0).toUpperCase() + cdp.slice(1)}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}