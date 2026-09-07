"""Download documented licensed photos and produce local, responsive WebP/JPEG assets.

No search-result thumbnails or unlicensed business photographs are downloaded.
Run from the repository root: python scripts/media.py
"""
from concurrent.futures import ThreadPoolExecutor
from io import BytesIO
from pathlib import Path
import json
import time
import urllib.request
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'public/assets/images'
OUT.mkdir(parents=True, exist_ok=True)
PHOTOS = json.loads((ROOT / 'assets/photos.json').read_text())

def download(photo):
    req = urllib.request.Request(photo['url'], headers={'User-Agent': 'KensingtonWebsitePreview/1.0 (https://github.com/Prithiraj/kensington-flowers)'})
    for attempt in range(4):
        try:
            with urllib.request.urlopen(req, timeout=60) as response:
                payload = response.read(20_000_000)
            image = ImageOps.exif_transpose(Image.open(BytesIO(payload))).convert('RGB')
            if image.width < 480 or image.height < 480:
                raise ValueError('Photo is smaller than the minimum useful resolution')
            widths = []
            for requested in (480, 960):
                width = min(requested, image.width)
                resized = image.resize((width, round(image.height * width / image.width)), Image.Resampling.LANCZOS)
                resized.save(OUT / f"{photo['id']}-{requested}.webp", 'WEBP', quality=80, method=6)
                widths.append(width)
                if requested == 960:
                    resized.save(OUT / f"{photo['id']}.jpg", 'JPEG', quality=83, optimize=True)
            if photo['id'] == 'bouquet':
                ImageOps.fit(image, (1200, 630), method=Image.Resampling.LANCZOS).save(OUT / 'social.jpg', 'JPEG', quality=85, optimize=True)
            print(f"Prepared {photo['id']}: {image.width} x {image.height}", flush=True)
            return {'id': photo['id'], 'width': widths[-1], 'height': round(image.height * widths[-1] / image.width), 'widths': widths}
        except Exception:
            if attempt == 3:
                raise
            time.sleep(2 ** attempt)

with ThreadPoolExecutor(max_workers=3) as executor:
    metadata = list(executor.map(download, PHOTOS))
(OUT / 'dimensions.json').write_text(json.dumps(metadata, indent=2) + '\n')
