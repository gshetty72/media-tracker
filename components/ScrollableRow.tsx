"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import MediaCard from "./MediaCard";

interface MediaItem {
  id: number;
  title: string;
  subtitle: string;
  imageUrl: string | null;
  review: number | null;
}

interface ScrollableRowProps {
  items: MediaItem[];
}

const SCROLL_AMOUNT = 780;

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  return direction === "left" ? (
    <svg width="38" height="38" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M45.4128 52.7281C45.7878 52.353 45.9984 51.8444 45.9984 51.314C45.9984 50.7837 45.7878 50.275 45.4128 49.9L35.5128 40L45.4128 30.1C45.7656 29.7209 45.9577 29.2198 45.9486 28.702C45.9395 28.1842 45.7299 27.6902 45.3639 27.3238C44.9979 26.9574 44.5041 26.7472 43.9863 26.7376C43.4686 26.7279 42.9672 26.9194 42.5878 27.2718L31.2722 38.5843C30.8972 38.9594 30.6865 39.468 30.6865 39.9984C30.6865 40.5288 30.8972 41.0374 31.2722 41.4125L42.5847 52.7281C42.9597 53.1031 43.4684 53.3137 43.9987 53.3137C44.5291 53.3137 45.0377 53.1031 45.4128 52.7281Z" fill="white"/>
    </svg>
  ) : (
    <svg width="38" height="38" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M34.5872 27.2719C34.2122 27.647 34.0016 28.1556 34.0016 28.686C34.0016 29.2163 34.2122 29.725 34.5872 30.1L44.4872 40L34.5872 49.9C34.2344 50.2791 34.0423 50.7802 34.0514 51.298C34.0605 51.8158 34.2701 52.3098 34.6361 52.6762C35.0021 53.0426 35.4959 53.2528 36.0137 53.2624C36.5314 53.2721 37.0328 53.0806 37.4122 52.7282L48.7278 41.4157C49.1028 41.0406 49.3135 40.532 49.3135 40.0016C49.3135 39.4712 49.1028 38.9626 48.7278 38.5875L37.4153 27.2719C37.0403 26.8969 36.5316 26.6863 36.0013 26.6863C35.4709 26.6863 34.9623 26.8969 34.5872 27.2719Z" fill="white"/>
    </svg>
  );
}

export default function ScrollableRow({ items }: ScrollableRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 1);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    const ro = new ResizeObserver(updateScrollState);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      ro.disconnect();
    };
  }, [updateScrollState]);

  function scrollLeft() {
    scrollRef.current?.scrollBy({ left: -SCROLL_AMOUNT, behavior: "smooth" });
  }

  function scrollRight() {
    scrollRef.current?.scrollBy({ left: SCROLL_AMOUNT, behavior: "smooth" });
  }

  return (
    <div className="relative group border-t border-[#1E1E1E] w-full">
      {/* Left button — only participates in hover reveal when there's content to scroll left */}
      <button
        onClick={scrollLeft}
        aria-label="Scroll left"
        className={`absolute left-2 top-[184px] -translate-y-1/2 z-10 flex items-center justify-center w-[56px] h-[56px] rounded-full backdrop-blur-md bg-white/10 border border-white/20 shadow-lg transition-opacity duration-200 cursor-pointer ${
          canScrollLeft ? "opacity-0 group-hover:opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <ArrowIcon direction="left" />
      </button>

      {/* Scrollable cards */}
      <div
        ref={scrollRef}
        className="pt-6 flex gap-5 items-start overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item) => (
          <MediaCard
            key={item.id}
            title={item.title}
            subtitle={item.subtitle}
            imageUrl={item.imageUrl}
            review={item.review}
          />
        ))}
      </div>

      {/* Right button — only participates in hover reveal when there's content to scroll right */}
      <button
        onClick={scrollRight}
        aria-label="Scroll right"
        className={`absolute right-2 top-[184px] -translate-y-1/2 z-10 flex items-center justify-center w-[56px] h-[56px] rounded-full backdrop-blur-md bg-white/10 border border-white/20 shadow-lg transition-opacity duration-200 cursor-pointer ${
          canScrollRight ? "opacity-0 group-hover:opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <ArrowIcon direction="right" />
      </button>
    </div>
  );
}
