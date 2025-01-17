/**
 * Extracts date from a title string in format "elizaos Eliza (2025-01-12)"
 * First tries to extract from parentheses, then falls back to direct date pattern matching
 */
export function extractDateFromTitle(title: string): string | null {
  // First try to extract from parentheses (current format)
  const parenthesesMatch = title.match(/\(([^)]+)\)/);
  if (parenthesesMatch && isValidDateString(parenthesesMatch[1])) {
    return parenthesesMatch[1];
  }

  // Fall back to direct date pattern matching
  const dateMatch = title.match(/\d{4}-\d{2}-\d{2}/);
  return dateMatch ? dateMatch[0] : null;
}

/**
 * Validates if a string is in YYYY-MM-DD format
 */
export function isValidDateString(dateStr: string): boolean {
  const datePattern = /^\d{4}-\d{2}-\d{2}$/;
  if (!datePattern.test(dateStr)) return false;

  const [year, month, day] = dateStr.split("-").map(Number);
  const date = new Date(year, month - 1, day);

  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
}

/**
 * Normalizes date string by replacing hyphens with underscores
 * e.g., "2025-01-12" -> "2025_01_12"
 */
export function normalizeDate(date: string): string {
  return date.replace(/-/g, "_");
}

/**
 * Denormalizes date string by replacing underscores with hyphens
 * e.g., "2025_01_12" -> "2025-01-12"
 */
export function denormalizeDate(date: string): string {
  return date.replace(/_/g, "-");
}

/**
 * Extracts date from a filename in format "summary_2025_01_12.json"
 */
export function extractDateFromFilename(filename: string): string | null {
  const match = filename.match(/summary_(\d{4}[-_]\d{2}[-_]\d{2})\.json$/);
  return match ? denormalizeDate(match[1]) : null;
}
