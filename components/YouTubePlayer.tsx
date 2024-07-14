"use client";

import ReactPlayer from "react-player";

export default function YouTubePlayer({ videoId }: { videoId: string }) {
  return (
    <ReactPlayer
      url={`https://www.youtube.com/watch?v=${videoId}`}
      className="max-w-[36rem] *:w-full *:aspect-video"
      config={{
        youtube: {
          embedOptions: {
            host: "https://www.youtube-nocookie.com",
          },
        },
      }}
    />
  );
}
