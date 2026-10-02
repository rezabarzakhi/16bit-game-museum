# موزه بازی خانگی

آرشیو خاموش بازی‌های خانگی رایگان با مقاله فارسی.

## راه‌اندازی محلی

```text
python -m http.server 8090
```

سپس مرورگر را باز کنید:

```text
http://localhost:8090/site/index.html
```

## اضافه کردن فایل بازی

```text
.\download-roms.ps1
```

فایل‌های بازی در پوشه `roms/` ذخیره می‌شوند.

## ساختار پروژه

```text
design/          سامانه طراحی
site/            صفحات تارنما
content/         محتوای بازی‌ها و مقالات
roms/            فایل‌های بازی (در git نیست)
```

## بازی‌های موجود

```text
Tobu Tobu Girl (Game Boy) - MIT + CC BY 4.0
Tobu Tobu Girl Deluxe (Game Boy Color) - MIT + CC BY 4.0
```

## شبیه‌ساز

از EmulatorJS استفاده می‌شود که رایگان و متن‌باز است.

```text
https://cdn.emulatorjs.org/
```

## قوانین انتشار

فقط بازی‌های خانگی و آزاد با مدرک مجوز منتشر می‌شود.
در صورت اعتراض سازنده، بازی در همان روز حذف می‌شود.
