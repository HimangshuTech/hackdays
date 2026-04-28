"use client"

import PostCard from "@/components/porstCard";
import { useEffect, useState } from "react";
import api from "@/config/axios";
import { GetPostsResponse, Post } from "@/types/getAllPost.type";
import SearchBar from "@/components/searchBar";
import Link from "next/link";

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await api.get<GetPostsResponse>("/api/post/getPost");
        setPosts(res.data.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <div className="flex justify-center">
        <div className="w-full max-w-6xl px-4 md:px-8">

          {/* Search */}
          <div className="mt-10 flex justify-center">
            <SearchBar />
          </div>

          {/* Grid */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-10">
            {posts.map((post) => (
              <Link key={post.id} href={`/post/${post.id}`}>
                <PostCard
                  title={post.title}
                  name={post.user?.name ?? "Unknown"}
                  postType={post.postType}
                  image={
                    post.images?.[0]?.url && post.images[0].url !== "#"
                      ? post.images[0].url
                      : "/img/1.jpg"
                  }
                />
              </Link>
            ))}
          </div>

        </div>
      </div>

    </div>
  );
}

