export function formatVoucherKey(input: string) {
  // Remove all whitespace characters (spaces, tabs, etc.)
  const cleaned = input.replace(/\s+/g, "");

  // Extract the segments
  const part1 = cleaned.substring(0, 5);
  const part2 = cleaned.substring(5, 10);
  const part3 = cleaned.substring(10, 16);

  // Build the formatted string by inserting hyphens if the parts exist.
  let formatted = part1;
  if (part2) {
    formatted += "-" + part2;
  }
  if (part3) {
    formatted += "-" + part3;
  }
  return formatted;
}
