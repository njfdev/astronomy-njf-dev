import { PhotoDetails } from "@/types/metadata";
import { formatDuration } from "@/utils/timeTransformations";
import { ModalBody, ModalFooter, ModalHeader } from "@nextui-org/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { TailSpin } from "react-loader-spinner";

export default function PhotoInfoModal({
  photoDetails,
}: {
  photoDetails: PhotoDetails;
}) {
  const [isLoading, setLoading] = useState(true);

  let imagePath = `/astrophotos/${photoDetails.pictureFolder}/${photoDetails.objectName} - Final.jpg`;

  return (
    <>
      <ModalBody className="p-0">
        <div className="grid *:row-start-1 *:col-start-1 bg-black">
          {isLoading && (
            <div className="w-full flex items-center align-middle justify-center">
              <TailSpin width={60} height={60} color="white" />
            </div>
          )}
          <Image
            src={imagePath}
            width={photoDetails.dimensions.width!}
            height={photoDetails.dimensions.height!}
            quality={100}
            alt=""
            onLoad={() => setLoading(false)}
            className="overflow-visible w-full my-0 object-contain lg:max-h-[36rem] max-h-[48rem]"
          />
        </div>
        <div className="px-6 pb-4 pt-2">
          <h2 className="my-0">
            {photoDetails.objectDetails.name &&
            photoDetails.objectDetails.name != photoDetails.objectName
              ? `${photoDetails.objectDetails.name} (${photoDetails.objectName})`
              : photoDetails.objectName}
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
        </div>
      </ModalBody>
    </>
  );
}
