"use client";

import PhotoCard from "@/components/PhotoCard";
import {
  Button,
  CalendarDate,
  DateRangePicker,
  Select,
  SelectItem,
} from "@nextui-org/react";
import {
  Catalog,
  FilteringOptions,
  ObjectType,
  SortOption,
} from "@/types/filtering";
import { useEffect, useState } from "react";
import moment from "moment-timezone";
import { removeOuterQuotes } from "@/utils/textTransformations";
import { PhotoDetails, PictureData } from "@/types/metadata";
import { objectInfo } from "@/utils/objectInfo";
import { parseDate } from "@internationalized/date";
import { FaFilterCircleXmark } from "react-icons/fa6";
import { getAllPhotos } from "@/utils/photos";
import imagesToUseList from "@/public/images_to_use.json";

const defaultFilteringOptions: FilteringOptions = {
  sortOption: SortOption.DateDescending,
  catalogs: [],
  objectTypes: [],
};

export default function PhotoGrid({ children }: { children: React.ReactNode }) {
  const pictureData = getAllPhotos();

  const [filteringOptions, setFilteringOptions] = useState<FilteringOptions>(
    defaultFilteringOptions
  );
  const [filteredPictures, setFilteredPictures] = useState<PictureData[]>(
    [...pictureData].sort((a, b) => getDateDifference(b, a))
  );

  const updateFiltering = () => {
    let newFiltering = [...pictureData];

    if (filteringOptions.objectTypes.length > 0) {
      newFiltering = newFiltering.filter((value, _index, _array) => {
        return filteringOptions.objectTypes.includes(
          value.photoDetails?.objectDetails.objectType!
        );
      });
    }

    if (filteringOptions.dateRangeStart) {
      newFiltering = newFiltering.filter((value, _index, _array) => {
        return (
          value.photoDetails?.pictureDate.getTime()! >
          filteringOptions.dateRangeStart?.toDate("EST").getTime()!
        );
      });
    }

    if (filteringOptions.dateRangeEnd) {
      newFiltering = newFiltering.filter((value, _index, _array) => {
        return (
          value.photoDetails?.pictureDate.getTime()! <
          filteringOptions.dateRangeEnd?.toDate("EST").getTime()!
        );
      });
    }

    if (filteringOptions.catalogs.length > 0) {
      newFiltering = newFiltering.filter((value, _index, _array) => {
        let catalog = Catalog.Other;

        if (value.photoDetails?.catalogName.startsWith("M")) {
          catalog = Catalog.Messier;
        } else if (value.photoDetails?.catalogName.startsWith("NGC")) {
          catalog = Catalog.NGC;
        } else if (value.photoDetails?.catalogName.startsWith("IC")) {
          catalog = Catalog.IC;
        } else if (value.photoDetails?.catalogName.startsWith("SH2")) {
          catalog = Catalog.SH2;
        }

        return filteringOptions.catalogs.includes(catalog);
      });
    }

    switch (filteringOptions.sortOption as SortOption) {
      case SortOption.DateAscending:
        newFiltering.sort((a, b) => getDateDifference(a, b));
        break;
      case SortOption.DateDescending:
        newFiltering.sort((a, b) => getDateDifference(b, a));
        break;
      case SortOption.AlphabeticallyAscending:
        newFiltering.sort((a, b) => getNameDifference(a, b));
        break;
      case SortOption.AlphabeticallyDescending:
        newFiltering.sort((a, b) => getNameDifference(b, a));
        break;
    }

    setFilteredPictures(newFiltering);
  };

  useEffect(updateFiltering, [filteringOptions, pictureData]);

  return (
    <>
      <div className="flex flex-col w-full">
        <div className="flex justify-between mb-1 items-center">
          <span className="mt-0 mb-0 font-bold text-xl text-default-foreground">
            Filters
          </span>
          <Button
            variant="light"
            className={`text-red-600 dark:text-red-400 transition-opacity ${
              JSON.stringify(filteringOptions) ==
                JSON.stringify(defaultFilteringOptions) &&
              "opacity-0 hover:cursor-default"
            }`}
            startContent={<FaFilterCircleXmark />}
            onPress={() => {
              setFilteringOptions(defaultFilteringOptions);
            }}
          >
            Reset Filters
          </Button>
        </div>
        <div className="w-full grid gap-2 mb-4 xl:grid-cols-4 sm:grid-cols-2 grid-cols-1">
          <Select
            label="Sort"
            selectedKeys={[filteringOptions.sortOption]}
            onChange={(e) => {
              if (!e.target.value) return;

              setFilteringOptions({
                ...filteringOptions,
                sortOption: e.target.value as SortOption,
              });
            }}
          >
            {Object.values(SortOption).map((sortOption: string) => (
              <SelectItem key={sortOption}>{sortOption}</SelectItem>
            ))}
          </Select>
          <Select
            label="Object Type"
            selectionMode="multiple"
            selectedKeys={filteringOptions.objectTypes}
            onChange={(e) => {
              setFilteringOptions({
                ...filteringOptions,
                objectTypes: (e.target.value.split(",") as ObjectType[]).filter(
                  (s) => s
                ),
              });
            }}
          >
            {Object.values(ObjectType).map((objectType: string) => (
              <SelectItem key={objectType}>{objectType}</SelectItem>
            ))}
          </Select>
          <Select
            label="Catalogs"
            selectionMode="multiple"
            selectedKeys={filteringOptions.catalogs}
            onChange={(e) => {
              setFilteringOptions({
                ...filteringOptions,
                catalogs: (e.target.value.split(",") as Catalog[]).filter(
                  (s) => s
                ),
              });
            }}
          >
            {Object.values(Catalog).map((objectType: string) => (
              <SelectItem key={objectType}>{objectType}</SelectItem>
            ))}
          </Select>
          <DateRangePicker
            label="Photo Date Range"
            visibleMonths={1}
            value={{
              start: filteringOptions.dateRangeStart!,
              end: filteringOptions.dateRangeEnd!,
            }}
            onChange={(e) => {
              setFilteringOptions({
                ...filteringOptions,
                dateRangeStart: e?.start || undefined,
                dateRangeEnd: e?.end || undefined,
              });
            }}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredPictures.map((data) => {
          return (
            <PhotoCard key={data.folder} photoDetails={data.photoDetails!}>
              {children}
            </PhotoCard>
          );
        })}
      </div>
    </>
  );
}

function getDateDifference(a: PictureData, b: PictureData) {
  return (
    a.photoDetails?.pictureDate.getTime()! -
    b.photoDetails?.pictureDate.getTime()!
  );
}

function getNameDifference(a: PictureData, b: PictureData) {
  let a_name =
    a.photoDetails?.objectDetails.name || a.photoDetails?.catalogName!;
  let b_name =
    b.photoDetails?.objectDetails.name || b.photoDetails?.catalogName!;

  if (a_name < b_name!) {
    return -1;
  }
  if (a_name! > b_name!) {
    return 1;
  }
  return 0;
}
