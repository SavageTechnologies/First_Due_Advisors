// Regenerates favicon.ico, apple-touch-icon.png, and android-chrome-512x512.png
// from public/images/logo.png. Run via `node scripts/generate-icons.mjs` whenever
// the source logo changes.
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');
const SOURCE = path.join(repoRoot, 'public/images/logo.png');

async function fitOnSquare(size) {
  // Resize preserving aspect ratio, then centre on a transparent square canvas.
  const resized = await sharp(SOURCE)
    .resize(size, size, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();
  return resized;
}

function icoFromPngs(pngs) {
  // Build a multi-image ICO (PNG-compressed entries) from an array of
  // { size, buffer } objects. ICO format: 6-byte header + N 16-byte directory
  // entries + concatenated image payloads.
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(pngs.length, 4);

  const directory = Buffer.alloc(16 * pngs.length);
  let offset = 6 + directory.length;
  pngs.forEach((entry, i) => {
    const d = directory.subarray(i * 16, i * 16 + 16);
    // ICO uses 0 to mean "256" for width/height.
    d.writeUInt8(entry.size >= 256 ? 0 : entry.size, 0);
    d.writeUInt8(entry.size >= 256 ? 0 : entry.size, 1);
    d.writeUInt8(0, 2); // colour palette
    d.writeUInt8(0, 3); // reserved
    d.writeUInt16LE(1, 4); // colour planes
    d.writeUInt16LE(32, 6); // bits per pixel
    d.writeUInt32LE(entry.buffer.length, 8);
    d.writeUInt32LE(offset, 12);
    offset += entry.buffer.length;
  });

  return Buffer.concat([header, directory, ...pngs.map((p) => p.buffer)]);
}

async function main() {
  await mkdir(path.join(repoRoot, 'public/images'), { recursive: true });

  const apple = await fitOnSquare(180);
  await writeFile(path.join(repoRoot, 'public/apple-touch-icon.png'), apple);

  const androidChrome = await fitOnSquare(512);
  await writeFile(
    path.join(repoRoot, 'public/images/android-chrome-512x512.png'),
    androidChrome,
  );

  const ico16 = await fitOnSquare(16);
  const ico32 = await fitOnSquare(32);
  const ico48 = await fitOnSquare(48);
  const ico = icoFromPngs([
    { size: 16, buffer: ico16 },
    { size: 32, buffer: ico32 },
    { size: 48, buffer: ico48 },
  ]);
  await writeFile(path.join(repoRoot, 'public/favicon.ico'), ico);

  console.log('Wrote:');
  console.log('  public/favicon.ico (16/32/48)');
  console.log('  public/apple-touch-icon.png (180)');
  console.log('  public/images/android-chrome-512x512.png (512)');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
