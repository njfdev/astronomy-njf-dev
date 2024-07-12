"use client";

import PhotoCard from "@/components/PhotoCard";
import { DateRangePicker, Select, SelectItem } from "@nextui-org/react";

// TODO: remove this temporary variable
const objectTypes: string[] = [
  "Galaxy",
  "Nebula",
  "Star Cluster",
  "Lunar",
  "Solar",
  "Eclipse",
];

const sortOptions: string[] = ["Old -> New", "New -> Old", "A -> Z", "Z -> A"];

export default function PhotoGrid({
  children,
  pictureData,
}: {
  children: React.ReactNode;
  pictureData: { folder: string; pageUrl?: string }[];
}) {
  return (
    <>
      <div className="w-full flex">
        <Select label="Sort">
          {sortOptions.map((sortOption: string) => (
            <SelectItem key={sortOption}>{sortOption}</SelectItem>
          ))}
        </Select>
        <Select label="Object Type" selectionMode="multiple">
          {objectTypes.map((objectType: string) => (
            <SelectItem key={objectType}>{objectType}</SelectItem>
          ))}
        </Select>
        <DateRangePicker label="Photo Date Range" />
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
