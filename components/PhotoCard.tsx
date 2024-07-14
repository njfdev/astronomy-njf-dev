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
  Modal,
  ModalContent,
  ModalBody,
} from "@nextui-org/react";
import Image from "next/image";
import NextLink from "next/link";
import { use, useEffect, useState } from "react";
import { FaStopwatch } from "react-icons/fa6";
import { IoTelescope } from "react-icons/io5";
import PhotoInfoModal from "./PhotoInfoModal";
import { PiHandTapBold } from "react-icons/pi";

export default function PhotoCard({
  children,
  photoDetails,
}: {
  children: React.ReactNode;
  photoDetails: PhotoDetails;
}) {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <Card
      isPressable={true}
      className={`aspect-square border-none decoration-transparent hover:scale-105`}
      isFooterBlurred={true}
      onPress={() => {
        setModalOpen(true);
      }}
    >
      <CardHeader className="flex-col items-start gap-1 p-2 h-full">
        <Chip
          startContent={
            <IoTelescope className="text-secondary-100 dark:text-secondary-700" />
          }
          variant="solid"
          radius="sm"
          classNames={{
            base: "bg-secondary-400/70 dark:bg-secondary/70",
            content: "text-secondary-100 dark:text-secondary-700",
          }}
        >
          {photoDetails.telescopeName}
        </Chip>
        {photoDetails.exposureTime && (
          <Chip
            startContent={
              <FaStopwatch className="text-success-100 dark:text-success-700" />
            }
            variant="solid"
            radius="sm"
            classNames={{
              base: "bg-success-500/70 dark:bg-success/70",
              content: "text-success-100 dark:text-success-700",
            }}
          >
            {formatDurationToShortForm(photoDetails.exposureTime)}
          </Chip>
        )}

        <div className="grow" />

        <div className="relative place-self-end mb-[18px] mr-[18px]">
          <PiHandTapBold className="text-gray-300 mix-blend-difference absolute" />
        </div>
      </CardHeader>
      <Image
        src={photoDetails.imagePath}
        alt={`Image of the ${
          photoDetails.objectDetails.name || photoDetails.catalogName
        }`}
        fill={true}
        className="rounded-lg object-cover mt-0"
        // this can reduce the image size by ~80% (tested with 1 moon image)
        quality={65}
      />
      <CardFooter className="justify-between absolute flex-col bottom-1 mx-1 w-[calc(100%_-_8px)] rounded-lg border-white/20 border-1 overflow-hidden">
        <h2 className="text-2xl font-bold text-center text-white w-full mt-0 mb-0 px-2">
          {photoDetails.readableName}
        </h2>
      </CardFooter>

      <Modal
        size="4xl"
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        scrollBehavior="inside"
      >
        <ModalContent className="overflow-clip">
          <PhotoInfoModal photoDetails={photoDetails} />
        </ModalContent>
      </Modal>
    </Card>
  );
}
