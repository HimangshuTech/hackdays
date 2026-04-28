"use client"

import Image from "next/image";

type PostCardType = {
  title: string;
  image: string;
  name: string;
  postType: "PLACE" | "EVENT" | "SERVICE";
};

export default function PostCard({
  title,
  image,
  name,
  postType,
}: PostCardType) {
  console.log("what is image ", image)
  return (
    <div className="w-full rounded-2xl overflow-hidden bg-emerald-600 text-white relative cursor-pointer transition-transform duration-300 ease-in-out hover:scale-[1.04]">

      <div className="absolute top-3 left-3 z-10 bg-black/50 backdrop-blur px-3 py-1 rounded-md text-sm font-medium">
        {postType}
      </div>

      {/* Image */}
      <Image
        width={500}
        height={500}
        alt={title}
        src={image}
        className="w-full aspect-4/5 object-cover"
      />

      {/* Content */}
      <div className="p-3">
        <div className="font-bold text-lg line-clamp-2">{title}</div>
        <div className="text-sm opacity-80">By {name}</div>
      </div>

    </div>
  );
}
