"use client";

import { useEffect, useState } from "react";
import PostCommentCard from "./postCommentCard";
import api from "@/config/axios";

type Comment =
  {
    id: number;
    text: string;
  };

export default function CommentsCard() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await api.get("/api/comments");
        setComments(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, []);

  // optimistic update
  const addComment = async (text: string) => {
    const newComment: Comment = {
      id: Date.now(),
      text,
    };

    setComments((prev) => [newComment, ...prev]);

    try {
      await api.post("/api/comments", text);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-full mx-auto mt-15 space-y-4">
      {/* Post content */}
      <h1 className="font-bold text-center text-2xl">Reviews</h1>
      <PostCommentCard onSubmit={addComment} />

      <div className="bg-white p-3 rounded-xl shadow space-y-2">
        <h3 className="font-semibold text-sm">Reviews</h3>

        {loading ? (
          <p className="text-sm text-gray-500">Loading...</p>
        ) : comments.length === 0 ? (
          <p className="text-sm text-gray-500">No reviews yet</p>
        ) : (
          comments.map((c) => (
            <div
              key={c.id}
              className="p-2 bg-gray-100 rounded-lg text-sm"
            >
              {c.text}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
