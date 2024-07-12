"use client";

import PhotoCard from "@/components/PhotoCard";
import {
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
import { PhotoDetails } from "@/types/metadata";
import { objectInfo } from "@/utils/objectInfo";
import { parseDate } from "@internationalized/date";

interface PictureData {
  folder: string;
  pageUrl?: string;
  photoDetails?: PhotoDetails;
}

export default function PhotoGrid({
  children,
  pictureData,
}: {
  children: React.ReactNode;
  pictureData: PictureData[];
}) {
  pictureData.forEach((picture) => {
    picture.photoDetails = getPhotoDetails(picture.folder);
  });

  const [filteringOptions, setFilteringOptions] = useState<FilteringOptions>({
    sortOption: SortOption.DateDescending,
    catalogs: [],
    objectTypes: [],
  });
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

        if (value.photoDetails?.objectName.startsWith("M")) {
          catalog = Catalog.Messier;
        } else if (value.photoDetails?.objectName.startsWith("NGC")) {
          catalog = Catalog.NGC;
        } else if (value.photoDetails?.objectName.startsWith("IC")) {
          catalog = Catalog.IC;
        } else if (value.photoDetails?.objectName.startsWith("SH2")) {
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
      <div
        className="w-full flex gap-2 mb-4
                     *:w-0 *:grow"
      >
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
              objectTypes: e.target.value.split(",") as ObjectType[],
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
              catalogs: e.target.value.split(",") as Catalog[],
            });
          }}
        >
          {Object.values(Catalog).map((objectType: string) => (
            <SelectItem key={objectType}>{objectType}</SelectItem>
          ))}
        </Select>
        <DateRangePicker
          label="Photo Date Range"
          visibleMonths={3}
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
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredPictures.map((data) => {
          return (
            <PhotoCard
              key={data.folder}
              photoDetails={data.photoDetails!}
              pageUrl={data.pageUrl}
            >
              {children}
            </PhotoCard>
          );
        })}
      </div>
    </>
  );
}

function getPhotoDetails(pictureFolder: string): PhotoDetails {
  let timeIsSpecified = false;

  const objectName = pictureFolder.split("/")[0];
  const folderDate = moment
    .tz(pictureFolder.split("/")[1].split("_")[0], "America/New_York")
    .toDate();

  const photoData = require(`../public/astrophotos/${pictureFolder}/${objectName}\ -\ Final.json`);

  let pictureDate = folderDate;

  if (photoData["DATE-OBS"]) {
    const dateObs = removeOuterQuotes(photoData["DATE-OBS"]?.[0]);
    const dateObsUTC = new Date(dateObs + "Z");
    if (
      dateObsUTC.toLocaleDateString("en-US", {
        timeZone: "America/New_York",
      }) ===
      folderDate.toLocaleDateString("en-US", {
        timeZone: "America/New_York",
      })
    ) {
      pictureDate = new Date(dateObs + "Z");
      timeIsSpecified = true;
    }
  }

  const telescopeName =
    removeOuterQuotes(photoData["TELESCOP"]?.[0]) || "Seestar S50";

  const exposureTime = removeOuterQuotes(photoData["LIVETIME"]?.[0]);

  let objectDetails = objectInfo[objectName as keyof typeof objectInfo];

  return {
    timeIsSpecified,
    telescopeName,
    exposureTime,
    objectName,
    pictureFolder,
    pictureDate,
    objectDetails,
  };
}

function getDateDifference(a: PictureData, b: PictureData) {
  return (
    a.photoDetails?.pictureDate.getTime()! -
    b.photoDetails?.pictureDate.getTime()!
  );
}

function getNameDifference(a: PictureData, b: PictureData) {
  let a_name =
    a.photoDetails?.objectDetails.name || a.photoDetails?.objectName!;
  let b_name =
    b.photoDetails?.objectDetails.name || b.photoDetails?.objectName!;

  if (a_name < b_name!) {
    return -1;
  }
  if (a_name! > b_name!) {
    return 1;
  }
  return 0;
}
