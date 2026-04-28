"use client"

import PostCard from "@/components/porstCard";
import { useEffect, useState } from "react";
import api from "@/config/axios";
import { GetPostsResponse, Post } from "@/types/getAllPost.type";
import SearchBar from "@/components/searchBar";
import Link from "next/link";

import { useSearchParams } from "next/navigation";

import Personalize from "@/components/personalizeButton";


type SearchPostsResponse = {
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

  const fetchPosts = async (searchQuery = "", postType: PostTypeFilter = null) => {
    const normalizedQuery = searchQuery.trim();
    const hasSearchCriteria = normalizedQuery.length > 0 || !!postType;

    try {
      if (hasSearchCriteria) {
        setIsSearching(true);

        const res = await api.get<SearchPostsResponse>("/api/search", {
          params: {
            ...(normalizedQuery ? { query: normalizedQuery } : {}),
            ...(postType ? { postType } : {}),
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
    let shouldIgnore = false;

    const loadPosts = async () => {
      try {
        const res = await api.get<GetPostsResponse>("/api/post/getPost");

        if (!shouldIgnore) {
          setPosts(res.data.data);
        }
      } catch (err) {
        console.error(err);
      }
    };

    loadPosts();

    return () => {
      shouldIgnore = true;
    };
  }, []);

  useEffect(() => {
    const normalized = query.trim();

    if (!normalized) {
      fetchPosts("", selectedType);
      return;
    }

    const timeout = setTimeout(() => {
      fetchPosts(normalized, selectedType);
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
              onQueryChange={(value) => {
                setQuery(value);

                if (!value.trim()) {
                  fetchPosts("", selectedType);
                }
              }}
              onSearch={() => fetchPosts(query, selectedType)}
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
