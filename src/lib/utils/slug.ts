/**
 * Converts a string to a URL-safe slug.
 * Example: "Medicare Plans & Benefits" -> "medicare-plans-benefits"
 */
export function toSlug(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}
