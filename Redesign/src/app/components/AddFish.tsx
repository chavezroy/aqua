import { useState } from 'react';
import { Search } from 'lucide-react';
import { Fish } from '../types';
import { fishDatabase } from '../data/fishDatabase';

interface AddFishProps {
  onAddFish: (fish: Fish) => void;
}

export function AddFish({ onAddFish }: AddFishProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFish = searchTerm
    ? fishDatabase.filter(
        (fish) =>
          fish.commonName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          fish.scientificName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const handleSelectFish = (fish: Fish) => {
    onAddFish(fish);
    setSearchTerm('');
  };

  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl p-6 mb-6">
      <div className="flex items-center gap-2 mb-6">
        <span className="text-2xl">🐟</span>
        <h2 className="font-semibold text-white text-xl">Add Fish</h2>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
        <input
          type="text"
          placeholder="Search by common or scientific name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400"
        />

        {/* Search Results Dropdown */}
        {searchTerm && (
          <div className="absolute z-10 w-full mt-2 bg-white/95 backdrop-blur-md border border-white/50 rounded-lg shadow-xl max-h-60 overflow-y-auto">
            {filteredFish.length > 0 ? (
              filteredFish.map((fish) => (
                <button
                  key={fish.id}
                  onClick={() => handleSelectFish(fish)}
                  className="w-full text-left px-4 py-3 hover:bg-cyan-50 border-b border-gray-100 last:border-b-0 transition-colors"
                >
                  <div className="font-medium text-gray-900">{fish.commonName}</div>
                  <div className="text-gray-500 italic">{fish.scientificName}</div>
                </button>
              ))
            ) : (
              <div className="px-4 py-3 text-gray-500">No fish found</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}