/**
 * Formats a Date or ISO string into a readable date string.
 * Example: "March 10, 2026"
 */
export function formatDate(value: Date | string): string {
  const date = typeof value === 'string' ? new Date(value) : value;
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Formats a raw phone number string into a standard US display format.
 * Input: "5550001234" or "+15550001234"
 * Output: "(555) 000-1234"
 */
export function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, '');
  const local = digits.length === 11 ? digits.slice(1) : digits;
  if (local.length !== 10) return raw;
  return `(${local.slice(0, 3)}) ${local.slice(3, 6)}-${local.slice(6)}`;
}

/**
 * Estimates reading time in minutes for a block of text.
 * Assumes 200 words per minute average reading speed.
 */
export function formatReadingTime(text: string): string {
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}
