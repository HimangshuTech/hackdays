"use client";

import { useState } from "react";
import { Search } from "lucide-react";

export default function SearchBar() {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    console.log("Search:", query);
  };

  return (
    <div className="w-full flex justify-center mt-20 px-4">

      <div className="w-full max-w-2xl flex items-center 
                      rounded-full border border-gray-300 
                      shadow-sm hover:shadow-md transition bg-white overflow-hidden">

        <div className="flex items-center gap-3 px-4 py-3 flex-1">
          <Search className="text-gray-500" size={20} />

          <input
            type="text"
            placeholder="Search places, events, services..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="w-full outline-none text-sm"
          />
        </div>

        <div className="h-6 w-px bg-gray-300" />

        <button
          onClick={handleSearch}
          className="px-5 text-sm font-medium cursor-pointer hover:bg-green-400 h-full"
        >
          Search
        </button>
      </div>
    </div>
  );
}
