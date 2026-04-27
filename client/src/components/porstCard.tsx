"use client"

import Image from "next/image"

export default function PostCard() {
  return (
    <div className="w-75 rounded-2xl overflow-hidden bg-emerald-600 text-white relative">

      {/* Overlay */}
      <div className="absolute top-3 left-3 z-10 bg-black/50 backdrop-blur px-3 py-1 rounded-md text-sm font-medium">
        PLACE
      </div>

      {/* Image */}
      <Image
        width={1000}
        height={1000}
        alt="image"
        src="/img/1.jpg"
        className="w-full aspect-4/5 object-cover"
      />

      {/* Content */}
      <div className="p-3">
        <div className="font-bold text-lg">MAJOLI</div>
        <div className="text-sm opacity-80">By ADMIN</div>
      </div>

    </div>
  )
}
