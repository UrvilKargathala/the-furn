import Image, { type ImageProps } from "next/image";

// next/image with a default frame size: CSS classes still set the real box, while Next serves
// a resized AVIF/WebP from `sizes`. Lazy-loads by default; pass `preload` for above-the-fold images.
export function Pic({ alt, sizes = "100vw", width = 1600, height = 1067, ...p }: Omit<ImageProps, "width" | "height"> & { width?: number; height?: number }) {
  return <Image alt={alt} width={width} height={height} sizes={sizes} {...p} />;
}
