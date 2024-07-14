import { PhotoDetails, PictureData } from "@/types/metadata";
import moment from "moment-timezone";
import { removeOuterQuotes } from "./textTransformations";
import { objectInfo } from "./objectInfo";
import imagesToUseList from "@/public/images_to_use.json";

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

  const objectName = pictureFolder.split("/")[0];
  const folderDate = moment
    .tz(
      pictureFolder.split("/")[1].split("_")[0].split(" ")[0],
      "America/New_York"
    )
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
    dimensions: {
      width: photoData["width"]!,
      height: photoData["height"]!,
    },
  };
}
