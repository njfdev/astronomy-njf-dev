"use server";

import generateRssFeed from "@/utils/generateRSSFeed";

export async function GET() {
  const feedData = await generateRssFeed();

  return new Response(feedData, {
    headers: {
      "Content-Type": "application/rss+xml",
    },
  });
}
