import { PhotoDetails } from "@/types/metadata";
import { formatDuration } from "@/utils/timeTransformations";
import { ModalBody, ModalFooter, ModalHeader } from "@nextui-org/react";
import Image from "next/image";

export default function PhotoInfoModal({
  photoDetails,
}: {
  photoDetails: PhotoDetails;
}) {
  let imagePath = `/astrophotos/${photoDetails.pictureFolder}/${photoDetails.objectName} - Final.jpg`;

  return (
    <>
      <ModalHeader className="p-0 max-h-[36rem] bg-black">
        <Image
          src={imagePath}
          width={photoDetails.dimensions.width!}
          height={photoDetails.dimensions.height!}
          quality={100}
          alt=""
          className="overflow-visible w-full my-0 object-contain"
        />
      </ModalHeader>
      <ModalBody className="py-8">
        <h2 className="my-0">
          {photoDetails.objectDetails.name} ({photoDetails.objectName})
        </h2>
        <p className=" dark:text-gray-300 text-gray-700 my-0">
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
      </ModalBody>
    </>
  );
}
