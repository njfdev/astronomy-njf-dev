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
    height: "390",
    width: "640",
    playerVars: {
      autoplay: autoplay ? 1 : 0,
    },
  };

  return (
    <YouTube
      videoId={videoId}
      opts={opts}
      onReady={(event) => event.target.pauseVideo()}
    />
  );
}
