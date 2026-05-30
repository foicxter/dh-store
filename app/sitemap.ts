import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://dh-store.vercel.app",
      lastModified: new Date(),
    },
  ];
}