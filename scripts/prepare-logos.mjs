/**
 * One-off asset prep: trims the transparent padding off the source logos and
 * emits web-ready files. Sources live in assets/logos/, outputs in public/ and app/.
 *
 *   node scripts/prepare-logos.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";
import { deflateSync, inflateSync } from "node:zlib";

function decode(path) {
  const buf = readFileSync(path);
  let offset = 8;
  let header = null;
  const chunks = [];

  while (offset < buf.length) {
    const length = buf.readUInt32BE(offset);
    const type = buf.toString("ascii", offset + 4, offset + 8);
    const data = buf.subarray(offset + 8, offset + 8 + length);

    if (type === "IHDR") {
      header = {
        width: data.readUInt32BE(0),
        height: data.readUInt32BE(4),
        depth: data[8],
        colorType: data[9],
        interlace: data[12],
      };
    } else if (type === "IDAT") {
      chunks.push(data);
    } else if (type === "IEND") {
      break;
    }

    offset += 12 + length;
  }

  if (header.depth !== 8 || header.colorType !== 6 || header.interlace !== 0) {
    throw new Error(`expected 8-bit RGBA, got ${JSON.stringify(header)}`);
  }

  const { width, height } = header;
  const stride = width * 4;
  const raw = inflateSync(Buffer.concat(chunks));
  const pixels = Buffer.alloc(stride * height);

  let pos = 0;
  for (let y = 0; y < height; y += 1) {
    const filter = raw[pos];
    pos += 1;
    const line = raw.subarray(pos, pos + stride);
    pos += stride;

    const cur = pixels.subarray(y * stride, (y + 1) * stride);
    const prev = y > 0 ? pixels.subarray((y - 1) * stride, y * stride) : null;

    for (let x = 0; x < stride; x += 1) {
      const a = x >= 4 ? cur[x - 4] : 0;
      const b = prev ? prev[x] : 0;
      const c = prev && x >= 4 ? prev[x - 4] : 0;
      const v = line[x];

      let value;
      switch (filter) {
        case 0: value = v; break;
        case 1: value = v + a; break;
        case 2: value = v + b; break;
        case 3: value = v + ((a + b) >> 1); break;
        case 4: {
          const p = a + b - c;
          const pa = Math.abs(p - a);
          const pb = Math.abs(p - b);
          const pc = Math.abs(p - c);
          value = v + (pa <= pb && pa <= pc ? a : pb <= pc ? b : c);
          break;
        }
        default: throw new Error(`unsupported filter ${filter}`);
      }
      cur[x] = value & 0xff;
    }
  }

  return { width, height, pixels };
}

const CRC_TABLE = (() => {
  const table = new Int32Array(256);
  for (let n = 0; n < 256; n += 1) {
    let c = n;
    for (let k = 0; k < 8; k += 1) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    table[n] = c;
  }
  return table;
})();

function crc32(buf) {
  let c = 0xffffffff;
  for (const byte of buf) c = CRC_TABLE[(c ^ byte) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length);
  const body = Buffer.concat([Buffer.from(type, "ascii"), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body));
  return Buffer.concat([length, body, crc]);
}

function encode({ width, height, pixels }) {
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;

  const stride = width * 4;
  const raw = Buffer.alloc((stride + 1) * height);
  for (let y = 0; y < height; y += 1) {
    raw[y * (stride + 1)] = 0;
    pixels.copy(raw, y * (stride + 1) + 1, y * stride, (y + 1) * stride);
  }

  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk("IHDR", ihdr),
    chunk("IDAT", deflateSync(raw, { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

function alphaBounds(img) {
  const { width, height, pixels } = img;
  let x0 = Infinity, y0 = Infinity, x1 = -1, y1 = -1;

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      if (pixels[y * width * 4 + x * 4 + 3] > 8) {
        if (x < x0) x0 = x;
        if (y < y0) y0 = y;
        if (x > x1) x1 = x;
        if (y > y1) y1 = y;
      }
    }
  }

  return { x0, y0, width: x1 - x0 + 1, height: y1 - y0 + 1 };
}

function crop(img, box) {
  const pixels = Buffer.alloc(box.width * box.height * 4);
  for (let y = 0; y < box.height; y += 1) {
    const from = ((box.y0 + y) * img.width + box.x0) * 4;
    img.pixels.copy(pixels, y * box.width * 4, from, from + box.width * 4);
  }
  return { width: box.width, height: box.height, pixels };
}

/** Box-filter downscale, alpha-weighted so edges don't darken. */
function resize(img, targetWidth, targetHeight) {
  const pixels = Buffer.alloc(targetWidth * targetHeight * 4);
  const scaleX = img.width / targetWidth;
  const scaleY = img.height / targetHeight;

  for (let y = 0; y < targetHeight; y += 1) {
    const sy0 = Math.floor(y * scaleY);
    const sy1 = Math.max(sy0 + 1, Math.floor((y + 1) * scaleY));

    for (let x = 0; x < targetWidth; x += 1) {
      const sx0 = Math.floor(x * scaleX);
      const sx1 = Math.max(sx0 + 1, Math.floor((x + 1) * scaleX));

      let r = 0, g = 0, b = 0, a = 0, count = 0;
      for (let sy = sy0; sy < sy1; sy += 1) {
        for (let sx = sx0; sx < sx1; sx += 1) {
          const i = (sy * img.width + sx) * 4;
          const alpha = img.pixels[i + 3];
          r += img.pixels[i] * alpha;
          g += img.pixels[i + 1] * alpha;
          b += img.pixels[i + 2] * alpha;
          a += alpha;
          count += 1;
        }
      }

      const o = (y * targetWidth + x) * 4;
      if (a > 0) {
        pixels[o] = Math.round(r / a);
        pixels[o + 1] = Math.round(g / a);
        pixels[o + 2] = Math.round(b / a);
        pixels[o + 3] = Math.round(a / count);
      }
    }
  }

  return { width: targetWidth, height: targetHeight, pixels };
}

/** Centres art on an opaque square canvas — iOS ignores icon transparency. */
function onSquare(img, size, margin, [br, bg, bb]) {
  const pixels = Buffer.alloc(size * size * 4);
  for (let i = 0; i < size * size; i += 1) {
    pixels[i * 4] = br;
    pixels[i * 4 + 1] = bg;
    pixels[i * 4 + 2] = bb;
    pixels[i * 4 + 3] = 255;
  }

  const inner = size - margin * 2;
  const scale = Math.min(inner / img.width, inner / img.height);
  const art = resize(img, Math.round(img.width * scale), Math.round(img.height * scale));
  const offsetX = Math.round((size - art.width) / 2);
  const offsetY = Math.round((size - art.height) / 2);

  for (let y = 0; y < art.height; y += 1) {
    for (let x = 0; x < art.width; x += 1) {
      const s = (y * art.width + x) * 4;
      const alpha = art.pixels[s + 3] / 255;
      if (alpha === 0) continue;
      const d = ((offsetY + y) * size + offsetX + x) * 4;
      for (let c = 0; c < 3; c += 1) {
        pixels[d + c] = Math.round(art.pixels[s + c] * alpha + pixels[d + c] * (1 - alpha));
      }
    }
  }

  return { width: size, height: size, pixels };
}

const PAPER = [0xf6, 0xf7, 0xf5];

const lockup = decode("assets/logos/text_with_logo.png");
const mark = decode("assets/logos/icon_logo.png");

const lockupTrimmed = crop(lockup, alphaBounds(lockup));
const markTrimmed = crop(mark, alphaBounds(mark));

const outputs = [
  ["public/logo-lockup.png", lockupTrimmed],
  ["public/logo-mark.png", markTrimmed],
  ["app/apple-icon.png", onSquare(markTrimmed, 180, 24, PAPER)],
];

for (const [path, img] of outputs) {
  writeFileSync(path, encode(img));
  console.log(`${path}  ${img.width}x${img.height}`);
}
