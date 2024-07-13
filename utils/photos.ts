import { PhotoDetails } from "@/types/metadata";
import moment from "moment-timezone";
import { removeOuterQuotes } from "./textTransformations";
import { objectInfo } from "./objectInfo";

export default function getPhotoDetails(pictureFolder: string): PhotoDetails {
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
  };
}
