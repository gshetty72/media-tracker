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
  onLikeChange: (id: number, newCount: number) => void;
}

export default function BacklogEntry({
  item,
  likedIds,
  onLikeChange,
}: BacklogEntryProps) {
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
        // Compute new count before any state update to avoid stale closure
        const newCount = Math.max(0, count - 1);
        setLiked(false);
        setCount(newCount);
        onLikeChange(item.id, newCount);
        await supabase
          .from("backlog")
          .update({ likes: newCount })
          .eq("id", item.id);
      }
    } else {
      const { error } = await supabase
        .from("backlog_likes")
        .insert({ backlog_id: item.id, voter_id: voterId });

      if (!error) {
        const newCount = count + 1;
        setLiked(true);
        setCount(newCount);
        onLikeChange(item.id, newCount);
        await supabase
          .from("backlog")
          .update({ likes: newCount })
          .eq("id", item.id);
      }
    }

    setLoading(false);
  }

  return (
    <div className="flex items-center justify-between py-8 w-full border-t border-[#1E1E1E] first:border-t-0">
      <div className="flex gap-4 items-start">
        <div className="relative w-[80px] h-[121px] shrink-0 bg-black">
          {item.poster_url ? (
            <Image
              src={item.poster_url}
              alt={item.title}
              fill
              className="object-contain"
              sizes="80px"
              unoptimized
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
        className="group flex flex-col items-center w-16 shrink-0 cursor-pointer disabled:opacity-60 transition-opacity"
        aria-label={liked ? "Unlike" : "Like"}
      >
        {liked ? (
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M34 8C27.6 8 24 13.334 24 16C24 13.334 20.4 8 14 8C7.6 8 6 13.334 6 16C6 30 24 40 24 40C24 40 42 30 42 16C42 13.334 40.4 8 34 8Z" fill="#F85410" stroke="#F85410" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        ) : (
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path className="stroke-[#484848] group-hover:stroke-[#F85410] transition-colors duration-150" d="M34 8C27.6 8 24 13.334 24 16C24 13.334 20.4 8 14 8C7.6 8 6 13.334 6 16C6 30 24 40 24 40C24 40 42 30 42 16C42 13.334 40.4 8 34 8Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
        <p className="font-normal text-[#a8a8a8] text-[16px] leading-normal">
          {count}
        </p>
      </button>
    </div>
  );
}
