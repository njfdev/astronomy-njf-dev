import { PhotoDetails, PictureData } from "@/types/metadata";
import moment from "moment-timezone";
import { removeOuterQuotes } from "./textTransformations";
import { objectInfo } from "./objectInfo";
import imagesToUseList from "@/public/images_to_use.json";
import { formatDuration } from "./timeTransformations";
import { SortOption } from "@/types/filtering";
import {
  extractCatalogNumber,
  extractCatalogString,
} from "./catalogDesignations";

export function getAllPhotos(): PictureData[] {
  let pictureData: PictureData[] = [];

  imagesToUseList.forEach((folder: string) => {
    pictureData.push({
      folder,
      photoDetails: getPhotoDetails(folder),
    });
  });

  return pictureData;
}

export function getPhotoDetails(pictureFolder: string): PhotoDetails {
  let timeIsSpecified = false;

  const catalogName = pictureFolder.split("/")[0];
  const folderDate = moment
    .tz(
      pictureFolder.split("/")[1].split("_")[0].split(" ")[0],
      "America/New_York"
    )
    .toDate();

  const photoData = require(`../public/astrophotos/${pictureFolder}/${catalogName}\ -\ Final.json`);

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

  let objectDetails = objectInfo[catalogName as keyof typeof objectInfo];

  let imagePath = `/astrophotos/${pictureFolder}/${catalogName} - Final.jpg`;
  let readableName =
    objectDetails.name +
    (objectDetails.name != catalogName ? ` (${catalogName})` : "");

  let readableDetailsString = `Shot on a ${telescopeName}${
    timeIsSpecified ? (exposureTime ? " starting at " : " at ") : " on "
  }${
    timeIsSpecified
      ? pictureDate.toLocaleString()
      : pictureDate.toLocaleDateString()
  }${
    exposureTime
      ? ` with an exposure time of ${formatDuration(exposureTime)}`
      : ""
  }.`;

  return {
    timeIsSpecified,
    telescopeName,
    exposureTime,
    catalogName,
    pictureFolder,
    pictureDate,
    imagePath,
    objectDetails,
    readableName,
    readableDetailsString,
    dimensions: {
      width: photoData["width"]!,
      height: photoData["height"]!,
    },
  };
}

export function sortPhotos(pictureData: PictureData[], sort: SortOption) {
  let newFiltering = [...pictureData];

  switch (sort as SortOption) {
    case SortOption.DateAscending:
      newFiltering.sort((a, b) => getDateDifference(a, b));
      break;
    case SortOption.DateDescending:
      newFiltering.sort((a, b) => getDateDifference(b, a));
      break;
    case SortOption.CatalogAscending:
      newFiltering.sort((a, b) => getCatalogNumberDifference(a, b, false));
      break;
    case SortOption.CatalogDescending:
      newFiltering.sort((a, b) => getCatalogNumberDifference(a, b, true));
      break;
    case SortOption.AlphabeticallyAscending:
      newFiltering.sort((a, b) => getNameDifference(a, b));
      break;
    case SortOption.AlphabeticallyDescending:
      newFiltering.sort((a, b) => getNameDifference(b, a));
      break;
  }

  return newFiltering;
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

function getCatalogNumberDifference(
  a: PictureData,
  b: PictureData,
  reverse?: boolean
) {
  let a_name = a.photoDetails.catalogName;
  let b_name = b.photoDetails.catalogName;

  let a_number, b_number;
  let a_catalog = extractCatalogString(a_name);
  let b_catalog = extractCatalogString(b_name);

  let a_has_number =
    a.photoDetails.catalogName != a.photoDetails.objectDetails.name;
  let b_has_number =
    b.photoDetails.catalogName != b.photoDetails.objectDetails.name;

  try {
    a_number = extractCatalogNumber(a_name);
  } catch {
    a_has_number = false;
  }

  try {
    b_number = extractCatalogNumber(b_name);
  } catch {
    b_has_number = false;
  }

  // filter objects without a catalog number last (e.g. Sun, Jupiter)
  if (!a_has_number && !b_has_number) return 0;
  if (!a_has_number && b_has_number) return 1;
  if (!b_has_number && a_has_number) return -1;

  let same_catalog = a_catalog == b_catalog;

  if (!same_catalog) {
    if (a_name! < b_name!) {
      return reverse ? 1 : -1;
    }
    if (a_name! > b_name!) {
      return reverse ? -1 : 1;
    }
    return 0;
  }

  if (a_number! < b_number!) {
    return reverse ? 1 : -1;
  }
  if (a_number! > b_number!) {
    return reverse ? -1 : 1;
  }
  return 0;
}
