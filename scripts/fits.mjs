import fs from "fs";

export function readFITSHeader(filePath) {
  const data = fs.readFileSync(filePath);
  const headerEndIndex = data.indexOf("END" + " ".repeat(77));

  if (headerEndIndex === -1) {
    console.log("Invalid FITS file: END header not found");
    return;
  }

  const headerData = data.slice(0, headerEndIndex);
  const headerString = headerData.toString("ascii");
  // split every 80 characters
  const headerLines = headerString.match(/.{1,80}/g);

  const headerKeyValuePairs = {};

  headerLines.forEach((line) => {
    const key = line.slice(0, 8).trim();
    const value = line.slice(10).trim();

    // split value it it contains a /
    const slashIndex = value.indexOf("/");
    if (slashIndex !== -1) {
      const value1 = value.slice(0, slashIndex).trim();
      const value2 = value.slice(slashIndex + 1).trim();
      headerKeyValuePairs[key] = [value1, value2];
      return;
    }

    if (key) headerKeyValuePairs[key] = value;
  });

  return headerKeyValuePairs;
}
