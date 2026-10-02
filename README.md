# موزه بازی ۱۶ بیتی

موزه‌ای از بازی‌های خانگی رایگان با رابط فارسی و شبیه‌ساز مرورگر.

## اجرای محلی

```text
python -m http.server 8090
```

سپس در مرورگر باز کنید:

```text
http://localhost:8090/site/index.html
```

## دانلود بازی‌ها

```text
.\download-roms.ps1
```

فایل‌های بازی در پوشه `roms/` ذخیره می‌شوند.

## ساختار پروژه

```text
design/          سامانه طراحی
site/            صفحات وب
content/         مقالات و داده‌ها
roms/            فایل‌های بازی (در git نیست)
```

## بازی‌های موجود

```text
Tobu Tobu Girl Deluxe (Game Boy Color) - MIT + CC BY 4.0
Geometrix (Game Boy Color) - GPL v3
```

## شبیه‌ساز

از EmulatorJS استفاده می‌شود که متن‌باز و رایگان است.

```text
https://cdn.emulatorjs.org/
```

## قوانین

- فقط بازی‌های رایگان و مجاز اضافه می‌شوند
- مجوز هر بازی باید مستند شده باشد
- در صورت درخواست سازنده، بازی فوراً حذف می‌شود
