"""
Server Mandiri Aplikasi Ensiklopedia Shahih Al-Bukhari
Membuka aplikasi web di http://localhost:8080 secara otomatis
"""
import http.server
import socketserver
import webbrowser
import os
import sys

PORT = 8080

# Serve from 'dist' if built, otherwise serve from current directory
serve_dir = "dist" if os.path.exists("dist/index.html") else "."
os.chdir(serve_dir)

class QuietHTTPHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Enable CORS and caching headers
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Cache-Control', 'no-cache')
        super().end_headers()

    def log_message(self, format, *args):
        # Clean logging
        sys.stderr.write(f"[{self.log_date_time_string()}] {format % args}\n")

print("=" * 70)
print("  APLIKASI WEBSITE KITAB SHAHIH AL-BUKHARI LENGKAP 7.563 HADITS")
print("  Disertai 36 Jilid Syarah Fathul Baari & Koleksi Digital Google Drive")
print("=" * 70)
print(f"  Aplikasi berjalan di: http://localhost:{PORT}")
print(f"  Direktori: {os.path.abspath(serve_dir)}")
print("  Tekan Ctrl+C untuk menghentikan server.")
print("=" * 70)

try:
    with socketserver.TCPServer(("", PORT), QuietHTTPHandler) as httpd:
        webbrowser.open(f"http://localhost:{PORT}")
        httpd.serve_forever()
except KeyboardInterrupt:
    print("\nServer dihentikan.")
