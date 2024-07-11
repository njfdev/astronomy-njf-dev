import PhotoCard from "@/components/PhotoCard";
import { DateRangePicker, Select, SelectItem } from "@nextui-org/react";

export default function PhotoGrid({
  children,
  pictureData,
}: {
  children: React.ReactNode;
  pictureData: { folder: string; pageUrl?: string }[];
}) {
  return (
    <>
      <div className="w-full">
        <div className="flex flex-col">
          <DateRangePicker label="Photo Date Range" />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {pictureData.map((data) => (
          <PhotoCard
            key={data.folder}
            pictureFolder={data.folder}
            pageUrl={data.pageUrl}
          >
            {children}
          </PhotoCard>
        ))}
      </div>
    </>
  );
}
