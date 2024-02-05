import { readFileSync } from 'fs';
import { resolve } from 'path';

export function getImageBase64(orignalname: string): string {
  const path = resolve('uploads', 'products', orignalname);
  const imageBuffer = readFileSync(path);
  const base64 = Buffer.from(imageBuffer).toString('base64');

  return base64;
}
