// go through all the fits or fit files in ../../public/astrophotos and extract the header into a txt file

import fs from "fs";
import path from "path";
import { readFITSHeader } from "./fits.mjs";

// Define the directory containing the FITS files
const directoryPath = "public/astrophotos";

// Recursive function to process each file in directory and subdirectories
function processDirectory(dirPath) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  entries.forEach((entry) => {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      processDirectory(fullPath);
    } else if (
      entry.isFile() &&
      (entry.name.endsWith(".fits") || entry.name.endsWith(".fit"))
    ) {
      processFile(fullPath, entry.name);
    }
  });
}

// Function to process each FITS file
function processFile(filePath, fileName) {
  try {
    const header = readFITSHeader(filePath);
    const headerStr = JSON.stringify(header, null, 2);
    const outputFileName = path.basename(filePath, path.extname(filePath));
    const outputFilePath = path.join(
      path.dirname(filePath),
      `${outputFileName}.json`
    );
    fs.writeFileSync(outputFilePath, headerStr);
    console.log(`Header extracted for ${fileName}`);
  } catch (error) {
    console.error("Error processing FITS file:", error);
  }

  // remove the FITS file
  fs.unlinkSync(filePath);
}

// Run the function on the initial directory
processDirectory(directoryPath);
