"use server";

import fs from "fs";
import { Feed, FeedOptions } from "feed";
import { getAllPhotos } from "./photos";

export default async function generateRssFeed() {
  const allPictures = getAllPhotos();
  const site_url = process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000";

  const feedOptions: FeedOptions = {
    title: "NJF Astrophotography Images | RSS Feed",
    description:
      "This is a collection of all the public astrophotography images shot and edited by Nicholas Fasching.",
    id: site_url,
    link: site_url,
    copyright:
      "All rights reserved ${new Date().getFullYear()}, Nicholas Fasching",
    feedLinks: {
      rss2: `${site_url}/rss.xml`,
    },
  };

  const feed = new Feed(feedOptions);

  allPictures.forEach((picture) => {
    feed.addItem({
      title: picture.photoDetails.readableName,
      id: `${picture.folder}`,
      link: `${site_url}${picture.photoDetails.imagePath}`,
      image: `${site_url}${picture.photoDetails.imagePath}`,
      date: new Date(picture.photoDetails.pictureDate),
      description: picture.photoDetails.readableDetailsString,
    });
  });

  return feed.rss2();
}
