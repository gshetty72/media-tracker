"use client";

interface StarRatingProps {
  rating: number | null;
  max?: number;
}

export default function StarRating({ rating, max = 5 }: StarRatingProps) {
  const filled = Math.round(rating ?? 0);

  return (
    <div className="flex gap-1.5">
      {Array.from({ length: max }).map((_, i) => (
        <svg
          key={i}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="8"
            cy="8"
            r="7"
            fill={i < filled ? "#F85410" : "none"}
            stroke={i < filled ? "#F85410" : "#666"}
            strokeWidth="1.5"
          />
        </svg>
      ))}
    </div>
  );
}
