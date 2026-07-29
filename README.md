# Liam's Beauty — אתר תדמית ולידים

אתר מקצועי ל-Liam's Beauty — עיצוב גבות והחלקות שיער באור עקיבא וקיסריה.

---

## 🚀 התקנה והרצה

```bash
npm install
cp .env.example .env.local
# ערכי את .env.local (ראי למטה)
npm run dev
```

האתר ירוץ על: **http://localhost:3000** (מפנה ל-/he אוטומטית)

```bash
# Build לייצור
npm run build && npm start
```

---

## ⚙️ הגדרות חשובות

### 📱 עדכון טלפון / וואטסאפ

ערכי [`src/lib/config.ts`](src/lib/config.ts):

```ts
phone: "053-334-3135",
phoneRaw: "0533343135",
whatsapp: "972533343135",
```

### 📅 קישור הזמנות

ב-`.env.local`:
```env
NEXT_PUBLIC_BOOKING_URL=https://calendly.com/liams-beauty
```

### 📧 מייל מטופס קשר (Resend)

```env
RESEND_API_KEY=re_xxxxxxxx
EMAIL_FROM=noreply@liamsbeauty.co.il
EMAIL_TO=liams.beauty@gmail.com
```

הרשמי חינם ב-[resend.com](https://resend.com).

### 📊 Google Analytics

```env
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

---

## 🖼️ הוספת מדיה

קבצים: `public/assets/images/` ו-`public/assets/videos/`

להוספה לגלריה — ערכי `GALLERY_ITEMS` ב-`src/lib/config.ts`.

**תמונת פורטרט של ליאם:** הוסיפי קובץ `public/assets/images/liam-portrait.jpg`
ואז עדכני את `About.tsx` (מסומן TODO).

---

## 🌐 שפות

- תרגומים עברית: `src/messages/he.json`
- תרגומים אנגלית: `src/messages/en.json`

---

## 🚀 פריסה — Vercel (מומלץ)

```bash
npx vercel --prod
```

הגדירי את משתני הסביבה ב-Vercel Dashboard → Settings → Environment Variables.

---

## 📌 צעדים הבאים

1. קני דומיין `liamsbeauty.co.il`
2. פרסי ב-Vercel — חינם לפרויקטים Next.js
3. הגדירי Google Business Profile ב-[business.google.com](https://business.google.com)
4. הוסיפי קישור לאתר ב-Instagram @liams.beauty
5. שלחי sitemap ב-Google Search Console
