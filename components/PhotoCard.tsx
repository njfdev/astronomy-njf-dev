"use client";

import { removeOuterQuotes } from "@/utils/textTransformations";
import { formatDuration } from "@/utils/timeTransformations";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";
import Image from "next/image";
import NextLink from "next/link";
import { use, useEffect, useState } from "react";
import moment from "moment-timezone";

export default function PhotoCard({
  children,
  pictureFolder,
  pageUrl,
}: {
  children: React.ReactNode;
  pictureFolder: string;
  pageUrl?: string;
}) {
  const [pictureDateString, setPictureDateString] = useState<string>("");

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
    console.log(dateObs);
    console.log(
      dateObsUTC.toLocaleDateString("en-US", { timeZone: "America/New_York" })
    );
    console.log(folderDate);
    console.log(
      folderDate.toLocaleDateString("en-US", { timeZone: "America/New_York" })
    );
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

  useEffect(() => {
    setPictureDateString(
      timeIsSpecified
        ? pictureDate.toLocaleString()
        : pictureDate.toLocaleDateString()
    );
  }, [pictureDate, timeIsSpecified]);

  return (
    <Card
      as={pageUrl ? NextLink : undefined}
      href={pageUrl}
      isPressable={!!pageUrl}
      className={`h-[36rem] px-2 ${
        pageUrl ? "hover:decoration-inherit decoration-transparent" : ""
      }`}
    >
      <CardHeader className="pb-0 pt-2 flex flex-col">
        <h2 className="text-2xl font-bold text-center w-full mb-0 mt-8">
          {objectReadableName
            ? `${objectReadableName} (${objectName})`
            : objectName}
        </h2>
        <p className="text-center text-sm dark:text-gray-300 text-gray-700 mb-2">
          Shot on a {telescopeName}
          {timeIsSpecified ? (exposureTime ? " starting at " : " at ") : " on "}
          {pictureDateString || folderDate.toDateString()}
          {exposureTime &&
            ` with an exposure time of ${formatDuration(exposureTime)}`}
          .
        </p>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <Image
          src={`/astrophotos/${pictureFolder}/${objectName}%20-%20Final.jpg`}
          alt={`Image of the ${objectReadableName || objectName}`}
          fill={true}
          className="rounded-lg object-cover"
        />
      </CardBody>
      <CardFooter>
        <div className="mt-4">{children}</div>
      </CardFooter>
    </Card>
  );
}
