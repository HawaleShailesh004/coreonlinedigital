"""
Builds a numbered contact sheet from Unsplash photo IDs so a batch of
candidates can be reviewed at a glance instead of one request per image.

Dev tooling for picking sample-site photography - not part of the build.

Usage:
    python scripts/unsplash-sheet.py <name> <id> [<id> ...]
    python scripts/unsplash-sheet.py <name> --file ids.txt

Writes .tmp-img/sheet-<name>.jpg
"""

import io
import os
import sys
import urllib.request
from concurrent.futures import ThreadPoolExecutor

from PIL import Image, ImageDraw

THUMB = (300, 200)
COLS = 4
PAD = 6
LABEL_H = 18
OUT_DIR = ".tmp-img"

UA = "Mozilla/5.0 (contact-sheet script)"


def fetch(index_id):
    index, photo_id = index_id
    url = (
        f"https://images.unsplash.com/{photo_id}"
        f"?auto=format&fit=crop&w={THUMB[0]}&h={THUMB[1]}&q=60"
    )
    try:
        req = urllib.request.Request(url, headers={"User-Agent": UA})
        with urllib.request.urlopen(req, timeout=30) as res:
            img = Image.open(io.BytesIO(res.read())).convert("RGB")
        return index, photo_id, img.resize(THUMB)
    except Exception as exc:  # noqa: BLE001 - report and keep going
        print(f"  fail {photo_id}: {exc}", file=sys.stderr)
        return index, photo_id, None


def main():
    if len(sys.argv) < 3:
        print(__doc__)
        sys.exit(1)

    name = sys.argv[1]
    rest = sys.argv[2:]

    if rest[0] == "--file":
        with open(rest[1], encoding="utf-8") as handle:
            ids = [
                line.strip()
                for line in handle
                if line.strip() and not line.startswith("#")
            ]
    else:
        ids = rest

    with ThreadPoolExecutor(max_workers=8) as pool:
        results = list(pool.map(fetch, enumerate(ids)))

    results.sort(key=lambda item: item[0])
    tiles = [(i, pid, im) for i, pid, im in results if im is not None]

    rows = (len(tiles) + COLS - 1) // COLS
    cell_w = THUMB[0] + PAD
    cell_h = THUMB[1] + LABEL_H + PAD
    sheet = Image.new("RGB", (COLS * cell_w + PAD, rows * cell_h + PAD), "white")
    draw = ImageDraw.Draw(sheet)

    for slot, (index, photo_id, img) in enumerate(tiles):
        col, row = slot % COLS, slot // COLS
        x = PAD + col * cell_w
        y = PAD + row * cell_h
        sheet.paste(img, (x, y + LABEL_H))
        draw.text((x + 2, y + 3), f"[{index}] {photo_id[6:20]}", fill="black")

    os.makedirs(OUT_DIR, exist_ok=True)
    out = os.path.join(OUT_DIR, f"sheet-{name}.jpg")
    sheet.save(out, quality=78)
    print(f"{out}  ({len(tiles)}/{len(ids)} tiles)")


if __name__ == "__main__":
    main()
