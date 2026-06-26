import MediaCard from "./MediaCard";

interface MediaItem {
  id: number;
  title: string;
  subtitle: string;
  imageUrl: string | null;
  review: number | null;
}

interface MediaSectionProps {
  heading: string;
  items: MediaItem[];
}

export default function MediaSection({ heading, items }: MediaSectionProps) {
  if (items.length === 0) return null;

  return (
    <section className="px-20 py-10 w-full">
      <div className="flex flex-col gap-6 items-start w-full">
        <h2 className="font-extrabold text-white text-[72px] leading-none">
          {heading}
        </h2>
        <div className="border-t border-[#484848] pt-6 flex gap-5 items-start overflow-x-auto w-full [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
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
      </div>
    </section>
  );
}
