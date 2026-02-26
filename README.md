# Headless Blog – وردپرس + Next.js

وبلاگ headless با **وردپرس** به عنوان CMS (بک‌اند) و **Next.js** به عنوان فرانت‌اند.  
وردپرس فقط محتوا مدیریت می‌کنه (پست، عکس، دسته‌بندی، سئو) و فرانت کاملاً جداگانه با React/Next.js ساخته شده.

## ویژگی‌ها
- Headless WordPress با WPGraphQL
- Docker برای راه‌اندازی سریع وردپرس (وردپرس + MySQL)
- Next.js 16+ با App Router, TypeScript, Tailwind CSS, React Compiler
- ISR (Incremental Static Regeneration) برای عملکرد بالا
- فرانت وردپرس کاملاً غیرفعال شده (فقط wp-admin و graphql در دسترس)


## پیش‌نیازها
- Docker Desktop (یا Docker + Compose)
- Node.js 18+ و npm (یا pnpm/yarn)
- Git

## راه‌اندازی لوکال (Step-by-Step)

### ۱. پروژه رو کلون کن
```bash
git clone https://github.com/DanialKK/headless-blog.git
cd headless-blog
```

### ۲. Backend: وردپرس رو با Docker راه‌اندازی کن
```bash
cd backend
# اگر .env وجود نداره، کپی کن
cp .env.example .env

# ران کن
docker compose up -d
```
## برو به http://localhost:8080/
###  نصب و فعال کردن WPGraphQL افزونه 
### Permalinks → Post name → Save
### Appearance → Themes → Headless Blank → Activate
### از این پس با آدرس wp-admin وارد میشوید و آدرس وردپرس غیرفعال میشود

### ۳. Frontend: Next.js رو راه‌اندازی کن
```bash
cd ../frontend
# اگر .env.local وجود نداره، بساز و این رو بگذار:
NEXT_PUBLIC_WORDPRESS_API_URL=http://localhost:8080/graphql

npm install
npm run dev
```
## سایت روی http://localhost:3000 باز می‌شه

