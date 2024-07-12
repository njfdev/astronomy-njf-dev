"use client";

import PhotoCard from "@/components/PhotoCard";
import { DateRangePicker, Select, SelectItem } from "@nextui-org/react";
import { Catalog, ObjectType, SortOption } from "@/types/filtering";

export default function PhotoGrid({
  children,
  pictureData,
}: {
  children: React.ReactNode;
  pictureData: { folder: string; pageUrl?: string }[];
}) {
  return (
    <>
      <div
        className="w-full flex gap-2 mb-4
                     *:w-0 *:grow"
      >
        <Select label="Sort">
          {Object.values(SortOption).map((sortOption: string) => (
            <SelectItem key={sortOption}>{sortOption}</SelectItem>
          ))}
        </Select>
        <Select label="Object Type" selectionMode="multiple">
          {Object.values(ObjectType).map((objectType: string) => (
            <SelectItem key={objectType}>{objectType}</SelectItem>
          ))}
        </Select>
        <Select label="Catalogs" selectionMode="multiple">
          {Object.values(Catalog).map((objectType: string) => (
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
