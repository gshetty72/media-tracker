"use client";

import { useState } from "react";
import MediaSection from "./MediaSection";
import BacklogSection from "./BacklogSection";
import type { Book, Movie, TvShow, Game, BacklogItem } from "@/types";

type Tab = "all" | "books" | "movies" | "tv" | "games";

const TABS: { id: Tab; label: string }[] = [
  { id: "all", label: "All" },
  { id: "books", label: "Books" },
  { id: "movies", label: "Movies" },
  { id: "tv", label: "TV Shows" },
  { id: "games", label: "Games" },
];

interface LibraryClientProps {
  books: Book[];
  movies: Movie[];
  tvShows: TvShow[];
  games: Game[];
  backlog: BacklogItem[];
}

export default function LibraryClient({
  books,
  movies,
  tvShows,
  games,
  backlog,
}: LibraryClientProps) {
  const [activeTab, setActiveTab] = useState<Tab>("all");

  const show = (tab: Tab) => activeTab === "all" || activeTab === tab;

  return (
    <div className="flex flex-col items-start w-full">
      {/* Header */}
      <div className="px-20 py-10 w-full">
        <div className="flex flex-col gap-8 items-start w-full">
          <div className="flex flex-col gap-2 items-start w-full">
            <h1 className="font-extrabold text-white text-[36px] leading-normal w-full">
              MY LIBRARY
            </h1>
            <div className="flex gap-0.5 items-center">
              <p className="font-normal text-[#a8a8a8] text-[16px] leading-normal">
                Check out all the things I&apos;ve been reading, watching and
                playing recently.
              </p>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                className="shrink-0"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2L9.19 8.63L2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2z"
                  fill="#f97316"
                />
              </svg>
            </div>
          </div>
          <div className="flex gap-2 items-center flex-wrap">
            {TABS.map((tab) => {
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-full text-[16px] leading-normal transition-colors cursor-pointer ${
                    active
                      ? "bg-white text-black font-semibold"
                      : "border border-[#a8a8a8] text-[#a8a8a8] font-normal hover:border-white hover:text-white"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Sections */}
      {show("books") && (
        <MediaSection
          heading="BOOKS"
          items={books.map((b) => ({
            id: b.id,
            title: b.title,
            subtitle: b.author,
            imageUrl: b.cover_url,
            review: b.review,
          }))}
        />
      )}
      {show("movies") && (
        <MediaSection
          heading="MOVIES"
          items={movies.map((m) => ({
            id: m.id,
            title: m.title,
            subtitle: m.director,
            imageUrl: m.poster_url,
            review: m.review,
          }))}
        />
      )}
      {show("tv") && (
        <MediaSection
          heading="TV SHOWS"
          items={tvShows.map((t) => ({
            id: t.id,
            title: t.title,
            subtitle: t.streaming_service,
            imageUrl: t.poster_url,
            review: t.review,
          }))}
        />
      )}
      {show("games") && (
        <MediaSection
          heading="GAMES"
          items={games.map((g) => ({
            id: g.id,
            title: g.title,
            subtitle: g.studio,
            imageUrl: g.poster_url,
            review: g.review,
          }))}
        />
      )}

      {/* Backlog always visible */}
      <BacklogSection items={backlog} />
    </div>
  );
}
