"use client"

import PostCard from "@/components/porstCard";
import { useEffect, useState } from "react";
import api from "@/config/axios";
import { GetPostsResponse, Post } from "@/types/getAllPost.type";
import SearchBar from "@/components/searchBar";
import Link from "next/link";
import Personalize from "@/components/personalizeButton";

type SearchPostsResponse = {
  success: boolean;
  data: Post[];
};

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const fetchPosts = async (searchQuery = "") => {
    const normalizedQuery = searchQuery.trim();

    try {
      if (normalizedQuery.length > 0) {
        setIsSearching(true);

        const res = await api.get<SearchPostsResponse>("/api/search", {
          params: {
            query: normalizedQuery,
            page: 1,
            limit: 100,
          },
        });

        setPosts(res.data.data);
        return;
      }

      const res = await api.get<GetPostsResponse>("/api/post/getPost");
      setPosts(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSearching(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    const normalized = query.trim();

    if (!normalized) {
      return;
    }

    const timeout = setTimeout(() => {
      fetchPosts(normalized);
    }, 300);

    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <div>
      <div className="flex justify-center">
        <div className="w-full max-w-6xl px-4 md:px-8">

          {/* Search */}
          <div className="mt-5 flex justify-center">
            <SearchBar
              query={query}
              onQueryChange={(value) => {
                setQuery(value);

                if (!value.trim()) {
                  fetchPosts("");
                }
              }}
              onSearch={() => fetchPosts(query)}
              isSearching={isSearching}
            />
          </div>
          <div className="flex items-center justify-center mt-5">

            <Personalize></Personalize>
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
          {!isSearching && posts.length === 0 && (
            <div className="mt-10 text-center text-gray-600">No matching posts found.</div>
          )}

        </div>
      </div>

    </div>
  );
}

