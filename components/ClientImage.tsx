"use client";

import Image from "next/image";

export default function ClientImage({
  src,
  alt = "",
  fill = false,
  className = "",
  parentClassName = "",
}: {
  src: string;
  alt: string;
  fill?: boolean;
  className?: string;
  parentClassName?: string;
}) {
  return <div className={`object-cover relative ${parentClassName}`}>
    <Image src={src} alt={alt} fill={fill} className={className} />
  </div>;
}