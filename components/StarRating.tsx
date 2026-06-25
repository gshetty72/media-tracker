"use client";

interface StarRatingProps {
  rating: number | null;
  max?: number;
}

export default function StarRating({ rating, max = 5 }: StarRatingProps) {
  const filled = Math.round(rating ?? 0);

  return (
    <div className="flex gap-0.5">
      {Array.from({ length: max }).map((_, i) => (
        <svg
          key={i}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill={i < filled ? "#f97316" : "none"}
          stroke={i < filled ? "#f97316" : "#666"}
          strokeWidth="1.5"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
        </svg>
      ))}
    </div>
  );
}
