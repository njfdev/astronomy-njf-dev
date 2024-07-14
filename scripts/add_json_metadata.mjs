// go through all the json files in ../../public/astrophotos and add image metadata (width and height) for next.js

import fs from "fs";
import path from "path";
import sizeOf from "image-size";

// Define the directory containing the JSON files
const directoryPath = "public/astrophotos";

// Recursive function to process each file in directory and subdirectories
async function processDirectory(dirPath) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  entries.forEach(async (entry) => {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      processDirectory(fullPath);
    } else if (entry.isFile() && entry.name.endsWith(".json")) {
      await processFile(fullPath, entry.name);
    }
  });
}

// Function to process each FITS file
async function processFile(filePath, fileName) {
  try {
    const json_string = fs.readFileSync(filePath);
    const json_data = JSON.parse(json_string);

    const image_path =
      path.parse(filePath).dir + "/" + path.parse(filePath).name + ".jpg";

    let { width, height } = await sizeOf(image_path);

    json_data.width = width;
    json_data.height = height;

    fs.writeFileSync(filePath, JSON.stringify(json_data));
  } catch (error) {
    console.error("Error processing JSON file:", error);
  }
}

// Run the function on the initial directory
(async () => await processDirectory(directoryPath))();
