import imageUrlBuilder from "@sanity/image-url"
import { client } from "@/sanity/lib/client"
import DefaultImage from "@/public/user-default-image.png"
import { StaticImageData } from "next/image"

const builder = imageUrlBuilder(client)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function imageUrl(source: any): StaticImageData | string {
  return source?._ref ? builder.image(source).url() : DefaultImage
}
