"use client";

import { Search } from "lucide-react";

type SearchBarProps = {
  query: string;
  onQueryChange: (value: string) => void;
  onSearch: () => void;
  isSearching?: boolean;
};

export default function SearchBar({
  query,
  onQueryChange,
  onSearch,
  isSearching = false,
}: SearchBarProps) {

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
            onChange={(e) => onQueryChange(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onSearch()}
            className="w-full outline-none text-sm"
          />
        </div>

        <div className="h-6 w-px bg-gray-300" />

        <button
          onClick={onSearch}
          disabled={isSearching}
          className="px-5 text-sm font-medium cursor-pointer hover:bg-green-400 h-full"
        >
          {isSearching ? "Searching..." : "Search"}
        </button>
      </div>
    </div>
  );
}
