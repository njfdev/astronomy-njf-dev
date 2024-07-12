export function formatDuration(secondsString: string) {
  if (!secondsString) return secondsString;

  let seconds = parseFloat(secondsString);
  const hours = Math.floor(seconds / 3600);
  seconds %= 3600;
  const minutes = Math.floor(seconds / 60);
  seconds = Math.round(seconds % 60);

  if (hours > 0) {
    return `${hours + Number.parseFloat((minutes / 60).toFixed(1))} hours`;
  } else if (minutes > 0) {
    return (
      minutes + " minutes" + (seconds > 0 ? " and " + seconds + " seconds" : "")
    );
  } else {
    return seconds + " seconds";
  }
}

export function formatDurationToShortForm(secondsString: string) {
  if (!secondsString) return secondsString;

  let seconds = Math.floor(parseFloat(secondsString));
  let hours = Math.floor(seconds / 360) / 10;
  let minutes = Math.floor(seconds / 60);

  if (hours >= 1) {
    return `${hours} ${hours == 1 ? "hr" : "hrs"}`;
  } else if (minutes >= 1) {
    return `${minutes} ${minutes == 1 ? "min" : "mins"}`;
  } else {
    return `${seconds} ${seconds == 1 ? "sec" : "secs"}`;
  }
}
