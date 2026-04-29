"use client";

import PostCard from "@/components/porstCard";
import { useEffect, useState } from "react";
import api from "@/config/axios";
import { GetPostsResponse, Post } from "@/types/getAllPost.type";
import SearchBar from "@/components/searchBar";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Personalize from "@/components/personalizeButton";

type SearchPostsResponse =
  {
    success: boolean;
    data: Post[];
  };

type PostTypeFilter = "PLACE" | "EVENT" | "SERVICE" | null;

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const searchParams = useSearchParams();

  const selectedTypeParam = searchParams.get("type")?.toUpperCase();
  const selectedType: PostTypeFilter =
    selectedTypeParam === "PLACE" ||
      selectedTypeParam === "EVENT" ||
      selectedTypeParam === "SERVICE"
      ? selectedTypeParam
      : null;

  const fetchPosts = async (
    searchQuery = "",
    postType: PostTypeFilter = null
  ) => {
    try {
      setIsSearching(true);

      const res = await api.get<SearchPostsResponse | GetPostsResponse>(
        searchQuery || postType ? "/api/search" : "/api/post/getPost",
        {
          params:
            searchQuery || postType
              ? {
                ...(searchQuery ? { query: searchQuery.trim() } : {}),
                ...(postType ? { postType } : {}),
                page: 1,
                limit: 100,
              }
              : {},
        }
      );

      setPosts(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSearching(false);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchPosts(query, selectedType);
    }, 300);

    return () => clearTimeout(timeout);
  }, [query, selectedType]);

  return (
    <div>

      <div className="flex justify-center">
        <div className="w-full max-w-6xl px-4 md:px-8">

          {/* Search */}
          <div className="mt-5 flex justify-center">
            <SearchBar
              query={query}
              onQueryChange={(value) => setQuery(value)} //  only state update
              onSearch={() => fetchPosts(query, selectedType)} // optional manual trigger
              isSearching={isSearching}
            />
          </div>

          <div className="flex items-center justify-center mt-5">
            <Personalize />
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

          {/* Empty State */}
          {!isSearching && posts.length === 0 && (
            <div className="mt-10 text-center text-gray-600">
              No matching posts found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
