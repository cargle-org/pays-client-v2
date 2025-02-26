export function formatMetricsAmount(amount: number, approximate = false) {
  // approximate = true means we use suffixes like K or M
  if (approximate) {
    if (amount >= 1e6) {
      // For millions, show one decimal point
      return `₦${(amount / 1e6).toFixed(1)}M`;
    } else if (amount >= 1e3) {
      // For thousands, show one decimal point
      return `₦${(amount / 1e3).toFixed(1)}K`;
    } else {
      return `₦${amount}`;
    }
  } else {
    // If not approximated, return full number with comma separators.
    return `₦${amount.toLocaleString("en-NG")}`;
  }
}
