// Compara dos PNG y reporta % de píxeles distintos, más las franjas verticales donde se concentran.
import fs from 'node:fs';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';

const [, , a, b, outDiff] = process.argv;
const A = PNG.sync.read(fs.readFileSync(a));
const B = PNG.sync.read(fs.readFileSync(b));
const w = Math.min(A.width, B.width), h = Math.min(A.height, B.height);
const crop = (img) => {
  const o = new PNG({ width: w, height: h });
  PNG.bitblt(img, o, 0, 0, w, h, 0, 0);
  return o;
};
const a2 = crop(A), b2 = crop(B), d = new PNG({ width: w, height: h });
const n = pixelmatch(a2.data, b2.data, d.data, w, h, { threshold: 0.1 });
fs.writeFileSync(outDiff, PNG.sync.write(d));
// filas con diferencias, agrupadas en bandas de 100 px
const bands = {};
for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
  const i = (y * w + x) * 4;
  if (d.data[i] === 255 && d.data[i + 1] === 0 && d.data[i + 2] === 0) bands[Math.floor(y / 100) * 100] = (bands[Math.floor(y / 100) * 100] || 0) + 1;
}
console.log(JSON.stringify({ size: [A.width, A.height, B.width, B.height], diffPx: n, pct: +((n / (w * h)) * 100).toFixed(4), bands }));
