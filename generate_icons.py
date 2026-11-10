# Generate simple valid PNG icons using PIL if available, or generate SVG and canvas fallback
try:
    from PIL import Image, ImageDraw, ImageFont
    for size in [192, 512]:
        img = Image.new('RGBA', (size, size), color=(27, 77, 58, 255)) # Islamic emerald green
        draw = ImageDraw.Draw(img)
        # Gold border circle
        draw.ellipse([size*0.05, size*0.05, size*0.95, size*0.95], outline=(223, 183, 56, 255), width=max(4, int(size*0.03)))
        # Gold inner decoration
        draw.ellipse([size*0.12, size*0.12, size*0.88, size*0.88], outline=(223, 183, 56, 120), width=max(2, int(size*0.015)))
        img.save(f"public/icon-{size}.png")
    print("Generated PNG icons via PIL.")
except ImportError:
    # If PIL not installed, create 1x1 or minimal PNG
    import struct, zlib
    def create_png(width, height, r, g, b):
        def chunk(type, data):
            return struct.pack('>I', len(data)) + type + data + struct.pack('>I', zlib.crc32(type + data) & 0xffffffff)
        png = b'\x89PNG\r\n\x1a\n'
        png += chunk(b'IHDR', struct.pack('>IIBBBBB', width, height, 8, 2, 0, 0, 0))
        raw_data = b''.join([b'\x00' + bytes([r, g, b]) * width for _ in range(height)])
        png += chunk(b'IDAT', zlib.compress(raw_data))
        png += chunk(b'IEND', b'')
        return png
    for s in [192, 512]:
        with open(f"public/icon-{s}.png", "wb") as f:
            f.write(create_png(s, s, 27, 77, 58))
    print("Generated fallback PNG icons.")
