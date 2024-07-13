"use server";

import { PhotoDetails } from "@/types/metadata";
import getPhotoDetails from "@/utils/photos";
import sizeOf from "image-size";
import Image from "next/image";

export default async function PhotoInfoPage({
  photoDetails,
}: {
  photoDetails: PhotoDetails;
}) {
  let imagePath = `/astrophotos/${photoDetails.pictureFolder}/${photoDetails.objectName} - Final.jpg`;

  let { width, height } = await sizeOf("public" + imagePath);

  console.log(width, height);

  return (
    <>
      <Image
        src={imagePath}
        width={width!}
        height={height!}
        quality={100}
        alt=""
      />
    </>
  );
}
