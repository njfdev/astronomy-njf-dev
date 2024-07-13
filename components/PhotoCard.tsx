"use client";

import { PhotoDetails } from "@/types/metadata";
import {
  formatDuration,
  formatDurationToShortForm,
} from "@/utils/timeTransformations";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Chip,
} from "@nextui-org/react";
import Image from "next/image";
import NextLink from "next/link";
import { use, useEffect, useState } from "react";
import { FaStopwatch } from "react-icons/fa6";
import { IoTelescope } from "react-icons/io5";

export default function PhotoCard({
  children,
  photoDetails,
  pageUrl,
}: {
  children: React.ReactNode;
  photoDetails: PhotoDetails;
  pageUrl?: string;
}) {
  return (
    <Card
      as={NextLink}
      href={
        pageUrl ||
        "/astrophotos/" +
          photoDetails.pictureFolder +
          "/" +
          photoDetails.objectName +
          " - Final.jpg"
      }
      isPressable={true}
      className={`aspect-square border-none decoration-transparent hover:scale-105`}
      isFooterBlurred={true}
    >
      <CardHeader className="flex-col items-start gap-1 p-2">
        <Chip
          startContent={<IoTelescope className="text-secondary-700" />}
          variant="solid"
          radius="sm"
          classNames={{
            base: "bg-secondary/70",
            content: "text-secondary-700",
          }}
        >
          {photoDetails.telescopeName}
        </Chip>
        {photoDetails.exposureTime && (
          <Chip
            startContent={<FaStopwatch className="text-success-700" />}
            variant="solid"
            radius="sm"
            classNames={{
              base: "bg-success/70",
              content: "text-success-700",
            }}
          >
            {formatDurationToShortForm(photoDetails.exposureTime)}
          </Chip>
        )}
      </CardHeader>
      <Image
        src={`/astrophotos/${photoDetails.pictureFolder}/${photoDetails.objectName}%20-%20Final.jpg`}
        alt={`Image of the ${
          photoDetails.objectDetails.name || photoDetails.objectName
        }`}
        fill={true}
        className="rounded-lg object-cover mt-0"
        // this can reduce the image size by ~80% (tested with 1 moon image)
        quality={65}
      />
      <CardFooter className="justify-between absolute flex-col bottom-1 mx-1 w-[calc(100%_-_8px)] rounded-lg border-white/20 border-1 overflow-hidden">
        <h2 className="text-2xl font-bold text-center w-full mt-0 mb-0">
          {photoDetails.objectDetails.name &&
          photoDetails.objectDetails.name != photoDetails.objectName
            ? `${photoDetails.objectDetails.name} (${photoDetails.objectName})`
            : photoDetails.objectName}
        </h2>
        {/*
        <p className="text-center text-sm dark:text-gray-300 text-gray-700 mb-2">
          Shot on a {photoDetails.telescopeName}
          {photoDetails.timeIsSpecified
            ? photoDetails.exposureTime
              ? " starting at "
              : " at "
            : " on "}
          {photoDetails.timeIsSpecified
            ? photoDetails.pictureDate.toLocaleString()
            : photoDetails.pictureDate.toLocaleDateString()}
          {photoDetails.exposureTime &&
            ` with an exposure time of ${formatDuration(
              photoDetails.exposureTime
            )}`}
          .
        </p>
        */}
      </CardFooter>
    </Card>
  );
}
