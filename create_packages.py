import os
import zipfile
import shutil

print("=== Creating Clean Download Packages ===")

# Remove any existing zip files in dist and public before packaging
for folder in ["public", "dist"]:
    if os.path.exists(folder):
        for f in ["Shahih_Bukhari_PC.zip", "netlify_deploy.zip"]:
            p = os.path.join(folder, f)
            if os.path.exists(p):
                os.remove(p)

# 1. Prepare Desktop PC offline runner folder
pc_dir = "Shahih_Bukhari_PC"
os.makedirs(pc_dir, exist_ok=True)

# Copy dist contents to pc_dir (excluding .zip)
for item in os.listdir("dist"):
    if item.endswith(".zip"):
        continue
    src = os.path.join("dist", item)
    dst = os.path.join(pc_dir, item)
    if os.path.isdir(src):
        if os.path.exists(dst):
            shutil.rmtree(dst)
        shutil.copytree(src, dst)
    else:
        shutil.copy2(src, dst)

# Add PC launcher batch and server
launcher_bat = r"""@echo off
setlocal enabledelayedexpansion
title Ensiklopedia Shahih Bukhari Plus 7.563 Hadits (Offline PC)
cd /d "%~dp0"

echo ======================================================================
echo   MEMULAI APLIKASI WEB KITAB SHAHIH BUKHARI PLUS (OFFLINE PC)
echo   7.563 Hadits Lengkap 100%% ^& 36 Jilid Syarah Teks JSON
echo   created by. Digitab Team
echo ======================================================================
echo.

REM 1. Coba jalankan via command python
python --version >nul 2>&1
if not errorlevel 1 (
    echo [OK] Python terdeteksi. Memulai server aplikasi...
    python server.py
    goto end
)

REM 2. Coba jalankan via py launcher
py -3 --version >nul 2>&1
if not errorlevel 1 (
    echo [OK] Python Launcher terdeteksi. Memulai server aplikasi...
    py -3 server.py
    goto end
)

REM 3. Cari Python di folder umum instalasi pengguna Windows
for /d %%D in ("%LOCALAPPDATA%\Programs\Python\Python*") do (
    if exist "%%D\python.exe" (
        echo [OK] Python ditemukan di: %%D\python.exe
        "%%D\python.exe" server.py
        goto end
    )
)

for /d %%D in ("C:\Python*") do (
    if exist "%%D\python.exe" (
        echo [OK] Python ditemukan di: %%D\python.exe
        "%%D\python.exe" server.py
        goto end
    )
)

REM 4. Fallback jika Python tidak terdeteksi: Gunakan PowerShell bawaan Windows
echo.
echo [INFO] Python tidak terdeteksi di PATH sistem.
echo [INFO] Menjalankan server lokal menggunakan PowerShell bawaan Windows...
powershell -NoProfile -ExecutionPolicy Bypass -Command "$port = 8080; while ($true) { try { $listener = New-Object System.Net.HttpListener; $listener.Prefixes.Add('http://localhost:' + $port + '/'); $listener.Start(); break } catch { $port++ } }; Write-Host ('Server berjalan di http://localhost:' + $port); Start-Process ('http://localhost:' + $port); while ($listener.IsListening) { $ctx = $listener.GetContext(); $req = $ctx.Request; $res = $ctx.Response; $urlPath = $req.Url.LocalPath.TrimStart('/'); if ($urlPath -eq '' -or $urlPath -eq '/') { $urlPath = 'index.html' }; $filePath = Join-Path (Get-Location) $urlPath; if (Test-Path $filePath -PathType Leaf) { $bytes = [System.IO.File]::ReadAllBytes($filePath); $res.ContentLength64 = $bytes.Length; if ($filePath.EndsWith('.html')) { $res.ContentType = 'text/html; charset=utf-8' } elseif ($filePath.EndsWith('.js')) { $res.ContentType = 'application/javascript; charset=utf-8' } elseif ($filePath.EndsWith('.css')) { $res.ContentType = 'text/css; charset=utf-8' } elseif ($filePath.EndsWith('.json')) { $res.ContentType = 'application/json; charset=utf-8' } elseif ($filePath.EndsWith('.png')) { $res.ContentType = 'image/png' } elseif ($filePath.EndsWith('.jpg') -or $filePath.EndsWith('.jpeg')) { $res.ContentType = 'image/jpeg' }; $res.OutputStream.Write($bytes, 0, $bytes.Length) } else { $res.StatusCode = 404 }; $res.Close() }"

:end
if errorlevel 1 (
    echo.
    echo ======================================================================
    echo   PERINGATAN:
    echo   Pastikan file .zip sudah Anda "Ekstrak Semua" (Extract All) terlebih
    echo   dahulu ke dalam sebuah folder biasa, BUKAN dijalankan langsung dari
    echo   dalam file zip.
    echo ======================================================================
    echo.
    pause
)
"""
with open(os.path.join(pc_dir, "Jalankan_Shahih_Bukhari.bat"), "w", encoding="utf-8") as f:
    f.write(launcher_bat)

server_script = """import http.server
import socketserver
import webbrowser
import os
import sys
import socket

os.chdir(os.path.dirname(os.path.abspath(__file__)))

def find_free_port(start_port=8080):
    for port in range(start_port, start_port + 30):
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            try:
                s.bind(('127.0.0.1', port))
                return port
            except OSError:
                continue
    return start_port

PORT = find_free_port(8080)

class Handler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        super().end_headers()
        
    def log_message(self, format, *args):
        pass

print("=" * 65)
print("  APLIKASI SHAHIH BUKHARI PLUS (OFFLINE PC)")
print("  created by. Digitab Team")
print("=" * 65)
print(f"  [STATUS] Server lokal aktif di: http://localhost:{PORT}")
print("  [INFO]   Aplikasi akan terbuka otomatis di peramban web Anda.")
print("  [TIPS]   Biarkan jendela ini tetap terbuka selama membaca.")
print("  [TIPS]   Tekan Ctrl + C untuk keluar dan menghentikan server.")
print("=" * 65)
print()

try:
    with socketserver.TCPServer(("127.0.0.1", PORT), Handler) as httpd:
        webbrowser.open(f"http://localhost:{PORT}")
        httpd.serve_forever()
except KeyboardInterrupt:
    print("\\nServer aplikasi telah dihentikan. Terima kasih.")
    sys.exit(0)
except Exception as e:
    print(f"\\nTerjadi kesalahan: {e}")
    input("\\nTekan Enter untuk keluar...")
"""
with open(os.path.join(pc_dir, "server.py"), "w", encoding="utf-8") as f:
    f.write(server_script)

readme_pc = """============================================================
PANDUAN MENJALANKAN SHAHIH BUKHARI PLUS DI PC / LAPTOP (OFFLINE)
created by. Digitab Team
============================================================

1. Ekstrak seluruh isi folder ini di PC / Laptop Anda.
2. Klik ganda (double-click) file:
   Jalankan_Shahih_Bukhari.bat
3. Browser Anda akan terbuka otomatis di http://localhost:8080
   menampilkan seluruh 7.563 hadits lengkap tanpa kuota internet!

Fitur Unggulan:
- Silsilah Rantai Sanad Lengkap: Imam Bukhari hingga Rasulullah SAW.
- Syarah Fathul Baari (36 Jilid Teks JSON): Naskah Arab dari Maktabah Syamilah & Terjemahan Indonesia.
- Di browser (Chrome / Edge), klik tombol "Install / Pasang Aplikasi"
  di ujung kanan bilah alamat agar aplikasi terpasang di Desktop Anda.
"""
with open(os.path.join(pc_dir, "BACA_PANDUAN.txt"), "w", encoding="utf-8") as f:
    f.write(readme_pc)

# Create Shahih_Bukhari_PC.zip
zip_pc_path = "Shahih_Bukhari_PC.zip"
print("Archiving PC Package...")
with zipfile.ZipFile(zip_pc_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
    for root, dirs, files in os.walk(pc_dir):
        for file in files:
            if file.endswith(".zip"):
                continue
            full_path = os.path.join(root, file)
            rel_path = os.path.relpath(full_path, pc_dir)
            zipf.write(full_path, arcname=os.path.join("Shahih_Bukhari_PC", rel_path))
print(f"Created {zip_pc_path} ({os.path.getsize(zip_pc_path)/1024/1024:.2f} MB)")

# 2. Prepare netlify_deploy.zip (contents of dist/ without zips)
shutil.copy2("public/_redirects", "dist/_redirects")

zip_netlify_path = "netlify_deploy.zip"
print("Archiving Netlify Deploy Package...")
with zipfile.ZipFile(zip_netlify_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
    for root, dirs, files in os.walk("dist"):
        for file in files:
            if file.endswith(".zip"):
                continue
            full_path = os.path.join(root, file)
            rel_path = os.path.relpath(full_path, "dist")
            zipf.write(full_path, arcname=rel_path)
print(f"Created {zip_netlify_path} ({os.path.getsize(zip_netlify_path)/1024/1024:.2f} MB)")

# 3. Copy both zips into public/ and dist/
shutil.copy2(zip_pc_path, "public/" + zip_pc_path)
shutil.copy2(zip_pc_path, "dist/" + zip_pc_path)
shutil.copy2(zip_netlify_path, "public/" + zip_netlify_path)
shutil.copy2(zip_netlify_path, "dist/" + zip_netlify_path)

print("=== Clean Packages Generated Successfully! ===")
