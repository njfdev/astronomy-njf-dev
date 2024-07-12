"use client";

import PhotoCard from "@/components/PhotoCard";
import { DateRangePicker, Select, SelectItem } from "@nextui-org/react";
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

  const objectReadableName = require(`../public/object_to_name.json`)[
    objectName
  ];

  const telescopeName =
    removeOuterQuotes(photoData["TELESCOP"]?.[0]) || "Seestar S50";

  const exposureTime = removeOuterQuotes(photoData["LIVETIME"]?.[0]);

  return {
    timeIsSpecified,
    objectReadableName,
    telescopeName,
    exposureTime,
    objectName,
    pictureFolder,
    pictureDate,
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
    a.photoDetails?.objectReadableName || a.photoDetails?.objectName!;
  let b_name =
    b.photoDetails?.objectReadableName || b.photoDetails?.objectName!;

  if (a_name < b_name!) {
    return -1;
  }
  if (a_name! > b_name!) {
    return 1;
  }
  return 0;
}
