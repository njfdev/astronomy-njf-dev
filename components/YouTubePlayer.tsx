"use client";

import YouTube from "react-youtube";

export default function YouTubePlayer({
  videoId,
  autoplay = false,
}: {
  videoId: string;
  autoplay?: boolean;
}) {
  const opts = {
    playerVars: {
      autoplay: autoplay ? 1 : 0,
    },
  };

  return (
    <YouTube
      videoId={videoId}
      opts={opts}
      className="max-w-[36rem] *:w-full aspect-video *:aspect-video"
      onReady={(event: any) => event.target.pauseVideo()}
    />
  );
}
