# The Passionate Brownie website

Website for The Passionate Brownie (Instagram [@passionate_brownies](https://www.instagram.com/passionate_brownies/)), a home bakery in Chennai.
Built with Vite + React + react-router + Tailwind CSS. The project brief is in `CLAUDE.md`.

**Status: Phase 1 (front-end).** Customers order through WhatsApp. Orders and tracking use the browser and demo data for now.

## Run it on your computer

```bash
npm install      # first time only
npm run dev      # then open http://localhost:5173
npm run build    # production build, saved to /dist
```

## Where things live

| What | File |
|---|---|
| WhatsApp number, email, FSSAI, shelf life, hours, offer banner, delivery charge, Chennai pincodes, order rules | `src/config/site.js` |
| Menu: products, prices, categories, badges | `src/data/products.js` |
| Demo orders for Track Order | `src/data/mockOrders.js` |
| All English text | `src/i18n/en.json` |
| All Tamil text | `src/i18n/ta.json` |
| Data functions (getProducts, getProduct, getBoxes, createOrder, getOrderStatus, createEnquiry) | `src/services/index.js` |
| Logo icon, favicon, product drawings, doodle background | `public/` |
| Script that redraws all the drawings | `scripts/make-art.mjs` (`node scripts/make-art.mjs`) |

## Things to replace before going live

1. **Logo:** the heart-and-brownie icon and the text wordmark are **temporary**. Replace them with the client's original logo (`public/logo-icon.svg`, `public/favicon.*`, `public/apple-touch-icon.png`, `src/components/Wordmark.jsx`).
2. **`src/config/site.js`:** WhatsApp number (`9XXXXXXXXX`), email, FSSAI number, shelf life (`XX days`) and hours. Also check the delivery charge (Rs 50 is a sample value) and the offer banner text.
3. **Prices:** the 10 brownies and the 4 / 6 assorted boxes use the real menu. Slabs, bites, jar, tub, lava brownies, cake, cupcakes and cookie tin have **SAMPLE prices** (`samplePrice: true`). The site labels them "Sample price".
4. **Copy:** product descriptions, the Our Story page (marked as a placeholder) and FAQ answers are drafts. The client should confirm them.
5. **Photos:** all product images are illustrations. Swap in real photos when ready.
6. **Domain:** `passionatebrownie.netlify.app` is a placeholder in `site.js`, `public/robots.txt` and `public/sitemap.xml`.

## Tamil text: needs proofreading

All Tamil (`src/i18n/ta.json`, the `ta` fields in `src/data/products.js` and `site.js`) was written for this sample.
**The client or another native speaker must proofread it before launch.**

## Ordering rules (from `site.js`)

- Minimum order: 1 piece. The cart is saved in the browser.
- A 4-piece box counts as 4 pieces and a 6-piece box as 6.
- More than 6 pieces in total: the delivery date must be at least 2 days ahead. A friendly notice appears in the cart and at checkout.
- Normal orders: the earliest delivery date is tomorrow (`standardMinDaysAhead`, a sample value).
- Chennai pincodes only. `delivery.pincodePrefixes` is `['600']`. Add more starts (for example `'601'`, `'603'`) to widen the area.
- The slab shows 5% off. The offer banner only displays text; it doesn't change prices.
- On checkout the site creates an order ID (PB-0001, PB-0002 …) and opens WhatsApp with the full order, including box flavours. Payment is by UPI, shared on WhatsApp.
- Phase 1 numbers orders separately in each browser. Phase 2 (Supabase) gives every order a shared, unique number.

## Track Order demo

Orders placed from this browser can be tracked straight away (status "Received").
Demo IDs: `PB-0101` and `PB-0102`, both with phone `9876543210`.

## Phases

1. ✅ Front-end, theme, Tamil, Build Your Box, cart, WhatsApp checkout, mock tracking
2. Supabase: database, admin login, real orders and tracking
3. Netlify deploy from GitHub (`public/_redirects` already handles page refreshes)
