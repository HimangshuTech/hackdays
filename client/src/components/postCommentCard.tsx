"use client";

import { useState } from "react";

export default function PostCommentCard({
  onSubmit,
}: {
  onSubmit?: (comment: string) => void;
}) {
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    if (!comment.trim()) return;

    if (onSubmit) {
      onSubmit(comment);
    } else {
      console.log("Comment:", comment);
    }

    setComment("");
  };

  return (
    <div className="w-full border rounded-xl p-3 bg-white shadow-sm">
      {/* Input */}
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write a comment..."
        className="w-full resize-none border rounded-lg p-2 text-sm focus:outline-none"
        rows={3}
      />

      {/* Actions */}
      <div className="flex justify-end mt-2">
        <button
          onClick={handleSubmit}
          className="bg-black text-white px-4 py-1.5 rounded-lg text-sm"
        >
          Post
        </button>
      </div>
    </div>
  );
}
