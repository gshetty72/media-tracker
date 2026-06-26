import Image from "next/image";
import StarRating from "./StarRating";

interface MediaCardProps {
  title: string;
  subtitle: string;
  imageUrl: string | null;
  review: number | null;
}

export default function MediaCard({
  title,
  subtitle,
  imageUrl,
  review,
}: MediaCardProps) {
  return (
    <div className="flex flex-col gap-4 items-start shrink-0">
      <div className="relative w-[240px] h-[320px] bg-black transition-transform duration-300 ease-out hover:-translate-y-2">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-contain"
            sizes="240px"
          />
        ) : (
          <div className="w-full h-full bg-black" />
        )}
      </div>
      <div className="flex flex-col gap-2 items-start">
        <p className="font-semibold text-white text-[16px] leading-normal whitespace-nowrap">
          {title}
        </p>
        <p className="font-normal text-[#a8a8a8] text-[16px] leading-normal whitespace-nowrap">
          {subtitle}
        </p>
        <StarRating rating={review} />
      </div>
    </div>
  );
}
