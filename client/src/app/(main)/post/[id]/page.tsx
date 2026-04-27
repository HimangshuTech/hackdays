"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import api from "@/config/axios";

type ImageType = {
  id: string;
  url: string;
  order: number;
};

type Post = {
  id: string;
  title: string;
  description: string;
  postType: string;
  state: string;
  createdAt: string;
  metadata?: {
    types?: string[];
    activities?: string[];
  };
  images: ImageType[];
  location?: {
    name: string;
  };
  user: {
    name: string;
  };
};

export default function PostPage({ params }: { params: { id: string } }) {
  const [post, setPost] = useState<Post | null>(null);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await api.get(`/api/post/getPost/${params.id}`);
        setPost(res.data.data);
      } catch (err) {
        console.error(err);
      }
    };

    getPost();
  }, [params.id]);

  if (!post) {
    return <div>Loading...</div>;
  }

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % post.images.length);
  };

  const prevSlide = () => {
    setCurrent((prev) =>
      prev === 0 ? post.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold">{post.title}</h1>

      {/* Carousel */}
      <div className="relative w-full h-[400px] rounded-2xl overflow-hidden">
        {post.images.length > 0 && (
          <Image
            src={post.images[current].url}
            alt="post image"
            fill
            className="object-cover"
          />
        )}

        {post.images.length > 1 && (
          <>
            <button onClick={prevSlide} className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white px-3 py-1 rounded">
              ←
            </button>
            <button onClick={nextSlide} className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white px-3 py-1 rounded">
              →
            </button>
          </>
        )}
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2">
        {post.images.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-2 w-2 rounded-full cursor-pointer ${current === index ? "bg-black" : "bg-gray-400"
              }`}
          />
        ))}
      </div>

      <div className="text-sm text-gray-600 flex gap-4 flex-wrap">
        <span>{post.location?.name}</span>
        <span>{post.state}</span>
        <span>{post.user.name}</span>
      </div>

      <p className="text-gray-800 leading-relaxed">
        {post.description}
      </p>

      <div className="space-y-3">
        {post.metadata?.types && (
          <div>
            <h3 className="font-semibold">Types</h3>
            <div className="flex flex-wrap gap-2 mt-1">
              {post.metadata.types.map((type, i) => (
                <span key={i} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                  {type}
                </span>
              ))}
            </div>
          </div>
        )}

        {post.metadata?.activities && (
          <div>
            <h3 className="font-semibold">Activities</h3>
            <div className="flex flex-wrap gap-2 mt-1">
              {post.metadata.activities.map((act, i) => (
                <span key={i} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                  {act}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

