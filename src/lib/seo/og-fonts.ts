export async function loadGoogleFont(
  family: string,
  weight: number,
  text?: string,
): Promise<ArrayBuffer> {
  const params = new URLSearchParams({
    family: `${family}:wght@${weight}`,
  });
  if (text) params.set('text', text);
  const cssUrl = `https://fonts.googleapis.com/css2?${params.toString()}`;

  const css = await fetch(cssUrl, {
    headers: {
      // Modern UA required — without it Google returns legacy SVG fonts.
      'User-Agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    },
  }).then((r) => r.text());

  const match = css.match(/src:\s*url\((https:\/\/[^)]+)\)\s*format\('woff2'\)/);
  if (!match) {
    throw new Error(`Could not resolve Google Font URL for ${family} ${weight}`);
  }
  return fetch(match[1]).then((r) => r.arrayBuffer());
}
