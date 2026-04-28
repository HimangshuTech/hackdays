"use client";

import { useState } from "react";

const TAGS = [
  "eco", "tourism", "sustainable", "travel", "green", "destination",
  "wildlife", "sanctuary", "animal", "spotting", "nature", "reserve",
  "cultural", "heritage", "local", "traditions", "indigenous", "community",
  "adventure", "activities", "outdoor", "exploration", "historical",
  "ancient", "monuments", "history"
];

export default function TagInputCard() {
  const [input, setInput] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [open, setOpen] = useState(false);

  const filtered = TAGS.filter(
    (tag) =>
      tag.toLowerCase().includes(input.toLowerCase()) &&
      !selected.includes(tag)
  );

  const addTag = (tag: string) => {
    setSelected((prev) => [...prev, tag]);
    setInput("");
    setOpen(false);
  };

  const removeTag = (tag: string) => {
    setSelected((prev) => prev.filter((t) => t !== tag));
  };

  return (
    <div className="w-full max-w-lg">
      <h2 className="mb-2 font-semibold text-gray-700">Profile</h2>

      {/* Input container */}
      <div
        className="flex flex-wrap items-center gap-2 border-2 border-blue-400 rounded-lg p-2 focus-within:ring-2 focus-within:ring-blue-300"
        onClick={() => setOpen(true)}
      >
        {/* Selected Chips */}
        {selected.map((tag) => (
          <div
            key={tag}
            className="flex items-center gap-2 bg-blue-500 text-white px-3 py-1 rounded-md"
          >
            {tag}
            <button onClick={() => removeTag(tag)}>×</button>
          </div>
        ))}

        {/* Input */}
        <input
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setOpen(true);
          }}
          className="flex-1 outline-none min-w-30"
          placeholder="Search tags..."
        />
      </div>

      {/* Dropdown */}
      {open && filtered.length > 0 && (
        <div className="border rounded-md mt-1 max-h-60 overflow-y-auto shadow bg-white">
          {filtered.map((tag) => (
            <div
              key={tag}
              onClick={() => addTag(tag)}
              className="px-3 py-2 hover:bg-blue-100 cursor-pointer capitalize"
            >
              {tag}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
