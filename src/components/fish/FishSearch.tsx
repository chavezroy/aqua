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
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search by common or scientific name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#14B8A6]"
        />
      </div>

      {searchTerm && (
        <div className="max-h-60 overflow-y-auto border border-gray-200 rounded-lg">
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
                className="w-full text-left p-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
              >
                <div className="font-medium">{fish.common_name}</div>
                <div className="text-sm text-gray-500">{fish.scientific_name}</div>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}

