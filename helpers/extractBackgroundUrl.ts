export function extractBackgroundUrl(input: string | { src: string }): string {
  // Determine if input is an object with a "src" property or a string
  let src;
  if (
    typeof input === "object" &&
    input !== null &&
    typeof input.src === "string"
  ) {
    src = input.src;
  } else if (typeof input === "string") {
    src = input;
  } else {
    console.error("Input must be an object with a 'src' property or a string");
    return "";
  }

  // Split the src to get the filename (last segment)
  const parts = src.split("/");
  const filename = parts.pop();
  if (!filename) return "";

  // Get the base name before the first dot (e.g., "silk_ten" from "silk_ten.26b1fd82.svg")
  const baseName = filename.split(".")[0];
  if (!baseName) return "";

  return baseName;
}
