"use client";

import Image, { type ImageProps } from "next/image";
import { forwardRef, type Ref } from "react";
import { getImageUrl, isUploadsAssetUrl } from "@/lib/utils";

export type SiteImageProps = Omit<ImageProps, "src" | "unoptimized"> & {
  src: string;
  /** Override default: uploads skip Next optimizer (browser fetch, like native img). */
  unoptimized?: boolean;
};

/**
 * next/image runs optimization on the server; it often cannot reach a private backend IP
 * while the user's browser can. For /uploads we default to unoptimized so the browser loads
 * the URL directly (browser fetch, not the optimizer).
 */
const SiteImageInner = (
  { src, unoptimized, ...props }: SiteImageProps,
  ref: Ref<HTMLImageElement | null>,
) => {
  const resolved = getImageUrl(src);
  const isUpload = isUploadsAssetUrl(resolved);
  return (
    <Image
      ref={ref}
      src={resolved}
      {...props}
      unoptimized={unoptimized !== undefined ? unoptimized : isUpload}
    />
  );
};

export const SiteImage = forwardRef(SiteImageInner);
SiteImage.displayName = "SiteImage";
