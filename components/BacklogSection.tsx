"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import type { BacklogItem } from "@/types";
import BacklogEntry from "./BacklogEntry";

interface BacklogSectionProps {
  items: BacklogItem[];
}

export default function BacklogSection({ items }: BacklogSectionProps) {
  const [likedIds, setLikedIds] = useState<Set<number>>(new Set());

  useEffect(() => {
    const voterId = localStorage.getItem("voter_id");
    if (!voterId || items.length === 0) return;

    const ids = items.map((i) => i.id);
    supabase
      .from("backlog_likes")
      .select("backlog_id")
      .eq("voter_id", voterId)
      .in("backlog_id", ids)
      .then(({ data }) => {
        if (data) {
          setLikedIds(new Set(data.map((r) => r.backlog_id)));
        }
      });
  }, [items]);

  if (items.length === 0) return null;

  return (
    <section className="px-20 py-10 w-full">
      <div className="flex flex-col gap-6 items-start w-full">
        <div className="flex flex-col gap-2 items-start w-full">
          <h2 className="font-extrabold text-white text-[72px] leading-none w-full">
            BACKLOG
          </h2>
          <div className="flex gap-1 items-center">
            <p className="font-normal text-[#a8a8a8] text-[16px] leading-normal">
              Help pick my next watch! If an entry gets enough likes, watch it
              move up in the queue.
            </p>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="#ef4444"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
        </div>
        <div className="flex flex-col items-start w-full">
          {items.map((item) => (
            <BacklogEntry key={item.id} item={item} likedIds={likedIds} />
          ))}
        </div>
      </div>
    </section>
  );
}
