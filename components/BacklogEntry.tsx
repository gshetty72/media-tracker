"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import type { BacklogItem, MediaType } from "@/types";

const MEDIA_LABELS: Record<MediaType, string> = {
  book: "Book",
  movie: "Movie",
  tv: "TV Show",
  game: "Game",
};

function getVoterId(): string {
  const stored = localStorage.getItem("voter_id");
  if (stored) return stored;
  const id = crypto.randomUUID();
  localStorage.setItem("voter_id", id);
  return id;
}

interface BacklogEntryProps {
  item: BacklogItem;
  likedIds: Set<number>;
}

export default function BacklogEntry({ item, likedIds }: BacklogEntryProps) {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(item.likes);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLiked(likedIds.has(item.id));
  }, [likedIds, item.id]);

  async function toggleLike() {
    if (loading) return;
    setLoading(true);

    const voterId = getVoterId();

    if (liked) {
      const { error } = await supabase
        .from("backlog_likes")
        .delete()
        .eq("backlog_id", item.id)
        .eq("voter_id", voterId);

      if (!error) {
        setLiked(false);
        setCount((c) => c - 1);
        await supabase
          .from("backlog")
          .update({ likes: count - 1 })
          .eq("id", item.id);
      }
    } else {
      const { error } = await supabase
        .from("backlog_likes")
        .insert({ backlog_id: item.id, voter_id: voterId });

      if (!error) {
        setLiked(true);
        setCount((c) => c + 1);
        await supabase
          .from("backlog")
          .update({ likes: count + 1 })
          .eq("id", item.id);
      }
    }

    setLoading(false);
  }

  return (
    <div className="flex items-center justify-between py-8 w-full border-t border-[#484848] first:border-t-0">
      <div className="flex gap-4 items-start">
        <div className="relative w-[80px] h-[121px] shrink-0 bg-black">
          {item.poster_url ? (
            <Image
              src={item.poster_url}
              alt={item.title}
              fill
              className="object-contain"
              sizes="80px"
            />
          ) : (
            <div className="w-full h-full bg-black" />
          )}
        </div>
        <div className="flex flex-col gap-2 items-start">
          <div className="flex gap-4 items-end">
            <p className="font-semibold text-white text-[16px] leading-normal">
              {item.title}
            </p>
            <div className="bg-[#1e1e1e] px-2 py-1 rounded-full">
              <p className="font-semibold text-[#a8a8a8] text-[12px] leading-normal">
                {MEDIA_LABELS[item.media_type]}
              </p>
            </div>
          </div>
          {item.summary && (
            <p className="font-normal text-[#a8a8a8] text-[16px] leading-normal max-w-3xl">
              {item.summary}
            </p>
          )}
        </div>
      </div>
      <button
        onClick={toggleLike}
        disabled={loading}
        className="flex flex-col items-center w-16 shrink-0 cursor-pointer disabled:opacity-60 transition-opacity"
        aria-label={liked ? "Unlike" : "Like"}
      >
        {liked ? (
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="#F85410"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        ) : (
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#a8a8a8"
            strokeWidth="1.5"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        )}
        <p className="font-normal text-[#a8a8a8] text-[16px] leading-normal">
          {count}
        </p>
      </button>
    </div>
  );
}
