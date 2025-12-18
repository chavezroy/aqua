"use client";

import { useState } from "react";
import { useTankStore } from "@/store/useTankStore";
import fishData from "@/lib/fishDatabase.json";
import { Species } from "@/types";
import { Search } from "lucide-react";

export function FishSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const addFish = useTankStore((state) => state.addFish);

  const filteredFish = fishData.filter(
    (fish: Species) =>
      fish.common_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fish.scientific_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" size={20} />
        <input
          type="text"
          placeholder="Search by common or scientific name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400"
        />
      </div>

      {searchTerm && (
        <div className="relative z-10 w-full mt-2 bg-white/95 backdrop-blur-md border border-white/50 rounded-lg shadow-xl max-h-60 overflow-y-auto">
          {filteredFish.length === 0 ? (
            <p className="p-4 text-gray-500">No fish found</p>
          ) : (
            filteredFish.map((fish: Species) => (
              <button
                key={fish.id}
                onClick={() => {
                  addFish(fish);
                  setSearchTerm("");
                }}
                className="w-full text-left p-3 hover:bg-gray-100 border-b border-gray-100 last:border-b-0 text-gray-900"
              >
                <div className="font-medium">{fish.common_name}</div>
                <div className="text-sm text-gray-500 italic">{fish.scientific_name}</div>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}

