"use client";

import { PhotoDetails } from "@/types/metadata";
import { formatDuration } from "@/utils/timeTransformations";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";
import Image from "next/image";
import NextLink from "next/link";
import { use, useEffect, useState } from "react";

export default function PhotoCard({
  children,
  photoDetails,
  pageUrl,
}: {
  children: React.ReactNode;
  photoDetails: PhotoDetails;
  pageUrl?: string;
}) {
  /*timeIsSpecified
    ? pictureDate.toLocaleString()
    : pictureDate.toLocaleDateString();*/

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
          {photoDetails.objectDetails.name &&
          photoDetails.objectDetails.name != photoDetails.objectName
            ? `${photoDetails.objectDetails.name} (${photoDetails.objectName})`
            : photoDetails.objectName}
        </h2>
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
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <Image
          src={`/astrophotos/${photoDetails.pictureFolder}/${photoDetails.objectName}%20-%20Final.jpg`}
          alt={`Image of the ${
            photoDetails.objectDetails.name || photoDetails.objectName
          }`}
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
