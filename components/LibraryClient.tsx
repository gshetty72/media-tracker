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
  const isFiltered = activeTab !== "all";

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
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="shrink-0" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.2772 16.515C10.2822 16.405 10.4632 16.361 10.5172 16.457C10.7712 16.907 11.2031 17.568 11.6931 17.869C12.1831 18.17 12.9691 18.255 13.4851 18.277C13.5951 18.282 13.6382 18.463 13.5422 18.517C13.0922 18.771 12.4321 19.203 12.1311 19.693C11.8301 20.183 11.7451 20.969 11.7231 21.485C11.7181 21.595 11.5361 21.638 11.4831 21.542C11.2291 21.092 10.7971 20.432 10.3061 20.131C9.81615 19.83 9.03015 19.745 8.51515 19.723C8.40515 19.718 8.36115 19.536 8.45715 19.483C8.90715 19.229 9.56815 18.797 9.86915 18.306C10.1692 17.816 10.2552 17.03 10.2772 16.515Z" fill="white"/>
                <path opacity="0.5" d="M18.492 15.515C18.483 15.405 18.292 15.359 18.234 15.453C18.062 15.736 17.814 16.076 17.537 16.246C17.26 16.416 16.845 16.482 16.515 16.508C16.405 16.516 16.359 16.708 16.453 16.765C16.735 16.937 17.076 17.185 17.246 17.462C17.416 17.739 17.482 18.155 17.508 18.485C17.516 18.595 17.708 18.64 17.765 18.546C17.937 18.264 18.185 17.923 18.462 17.754C18.739 17.585 19.155 17.517 19.485 17.492C19.595 17.483 19.64 17.292 19.546 17.234C19.264 17.062 18.923 16.814 18.754 16.537C18.585 16.26 18.517 15.845 18.492 15.515Z" fill="white"/>
                <path d="M14.7034 4.00202L14.4614 3.69602C13.5244 2.51302 13.0564 1.92102 12.5114 2.00802C11.9674 2.09602 11.7064 2.80402 11.1854 4.22102L11.0504 4.58702C10.9024 4.99002 10.8284 5.19102 10.6864 5.33902C10.5444 5.48702 10.3504 5.56402 9.96239 5.71902L9.60939 5.86002L9.36239 5.96002C8.16239 6.44002 7.55839 6.71302 7.48039 7.24302C7.39839 7.80802 7.97039 8.29202 9.11439 9.25902L9.41039 9.50902C9.73639 9.78402 9.89839 9.92202 9.99139 10.109C10.0854 10.296 10.0984 10.512 10.1244 10.944L10.1484 11.337C10.2424 12.857 10.2884 13.617 10.7834 13.879C11.2774 14.141 11.8914 13.732 13.1194 12.913L13.4374 12.701C13.7864 12.468 13.9604 12.351 14.1604 12.32C14.3604 12.289 14.5614 12.344 14.9664 12.456L15.3334 12.558C16.7564 12.952 17.4674 13.149 17.8544 12.746C18.2424 12.343 18.0494 11.606 17.6644 10.133L17.5644 9.75202C17.4554 9.33302 17.4004 9.12402 17.4304 8.91702C17.4604 8.71002 17.5724 8.52802 17.7964 8.16502L17.9994 7.83502C18.7844 6.55902 19.1774 5.92102 18.9234 5.40902C18.6684 4.89902 17.9354 4.85202 16.4694 4.76102L16.0894 4.73702C15.6734 4.71102 15.4654 4.69802 15.2844 4.60202C15.1034 4.50602 14.9704 4.33802 14.7044 4.00202" fill="white"/>
                <path opacity="0.5" d="M8.83513 13.326C6.69813 14.37 4.91913 16.024 4.24813 18C3.49613 13.293 4.54013 10.253 6.21313 8.36304C6.35713 8.65804 6.54513 8.90204 6.71313 9.09304C7.06313 9.48904 7.56513 9.91304 8.07513 10.344L8.44213 10.654L8.61213 10.799C8.61713 10.863 8.62213 10.939 8.62713 11.036L8.65713 11.521C8.69713 12.176 8.73713 12.815 8.83513 13.326Z" fill="white"/>
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
          isFiltered={isFiltered}
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
          isFiltered={isFiltered}
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
          isFiltered={isFiltered}
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
          isFiltered={isFiltered}
          items={games.map((g) => ({
            id: g.id,
            title: g.title,
            subtitle: g.studio,
            imageUrl: g.poster_url,
            review: g.review,
          }))}
        />
      )}

      {/* Always mounted so like state and sort order survive tab switches */}
      <div className={isFiltered ? "hidden" : "w-full"}>
        <BacklogSection items={backlog} />
      </div>
    </div>
  );
}
