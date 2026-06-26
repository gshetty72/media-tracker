import MediaCard from "./MediaCard";
import ScrollableRow from "./ScrollableRow";

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
  isFiltered?: boolean;
}

const ROW_SIZE = 5;

function chunkArray<T>(arr: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}

export default function MediaSection({
  heading,
  items,
  isFiltered = false,
}: MediaSectionProps) {
  if (items.length === 0) return null;

  if (isFiltered) {
    const rows = chunkArray(items, ROW_SIZE);
    return (
      <section className="px-20 py-10 w-full">
        <div className="flex flex-col gap-6 items-start w-full">
          <h2 className="font-extrabold text-white text-[72px] leading-none">
            {heading}
          </h2>
          <div className="flex flex-col w-full gap-0 border-t border-[#1E1E1E]">
            {rows.map((row, rowIndex) => (
              <div
                key={rowIndex}
                className="pt-6 pb-6 flex gap-5 items-start"
              >
                {row.map((item) => (
                  <MediaCard
                    key={item.id}
                    title={item.title}
                    subtitle={item.subtitle}
                    imageUrl={item.imageUrl}
                    review={item.review}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="px-20 py-10 w-full">
      <div className="flex flex-col gap-6 items-start w-full">
        <h2 className="font-extrabold text-white text-[72px] leading-none">
          {heading}
        </h2>
        <ScrollableRow items={items} />
      </div>
    </section>
  );
}
