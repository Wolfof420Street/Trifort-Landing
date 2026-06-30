import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';

export async function processImage(buffer: Buffer, uploadDir: string, filenameBase: string) {
  await fs.mkdir(uploadDir, { recursive: true });

  const webpPath = path.join(uploadDir, `${filenameBase}.webp`);
  const avifPath = path.join(uploadDir, `${filenameBase}.avif`);
  const thumbPath = path.join(uploadDir, `${filenameBase}-thumb.webp`);

  await sharp(buffer)
    .resize({ width: 1920, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(webpPath);

  await sharp(buffer)
    .resize({ width: 1920, withoutEnlargement: true })
    .avif({ quality: 75 })
    .toFile(avifPath);

  await sharp(buffer)
    .resize({ width: 400, height: 300, fit: 'cover' })
    .webp({ quality: 80 })
    .toFile(thumbPath);

  return {
    webpPath,
    avifPath,
    thumbPath
  };
}
