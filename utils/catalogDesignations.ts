export function extractCatalogNumber(input: string): number {
  if (input.includes("-")) {
    input = input.split("-")[1];
  }

  const match = input.match(/\d+/);

  if (match) {
    return parseInt(match[0], 10);
  } else {
    throw new Error("No number found in the string");
  }
}

export function extractCatalogString(input: string): string {
  if (input.includes("-")) {
    return input.split("-")[0];
  }

  // remove numbers
  return input.replace(/\d+/g, "");
}
