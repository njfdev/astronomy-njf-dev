export function removeOuterQuotes(str: string) {
  if (!str) return str;

  return str.replace(/^["']|["']$/g, "");
}
