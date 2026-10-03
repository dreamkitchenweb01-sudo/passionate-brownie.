# The Passionate Brownie — website (sample that becomes the permanent site)

## Client
The Passionate Brownie (Instagram @passionate_brownies), Chennai. Homemade healthy brownies, no preservatives, FSSAI certified, certified baker. Also cakes, cupcakes, cookies, cookie tins. Customers come from Instagram, mostly on phones.

## Codebase
Built from the Dream Kitchen project. Remove EVERY Dream Kitchen trace: name, logo, text, colours, products, config, SEO tags, README, favicon. Same architecture: Vite + React + react-router + Tailwind, src/services data layer, i18n files, src/config/site.js. Supabase admin and orders come in Phase 2, same as Dream Kitchen.
GitHub remote: https://github.com/dreamkitchenweb01-sudo/passionate-brownie.git (branch main)

## Theme: "Chocolate & Blush" (must look clearly different from Dream Kitchen)
- Playful, fudgy, happy bakery feel, not elegant cream-and-gold.
- Palette: cream #FFF8F1, blush #F8DDE2, rose #E58FA0, caramel #C88A4E, fudge #5C3A2A, deep chocolate #3B2218. Rose and caramel are the accents.
- Fonts (Google Fonts, with fallbacks): DM Serif Display for headings, Poppins for body, Noto Sans Tamil for Tamil.
- Background: ORIGINAL sticker-style SVG doodles (brownie squares, brownie slabs, cookies, cupcakes, sprinkles, hearts, cocoa) scattered softly on cream and blush. Text always sits on solid cards.
- Different layout from Dream Kitchen: a split hero with a big illustrated brownie stack, rounded sticker-style product cards with a "per piece" price tag, a wavy section divider, a chunky rounded rose CTA button.
- Mobile-first, 44px+ tap targets, sticky mobile bar with Cart and WhatsApp, subtle animations that respect reduced motion.

## Logo
No logo file yet. Make a clean text wordmark "The Passionate Brownie" with a small heart-and-brownie icon as a temporary logo. Note in README: replace with the client's original logo.

## Languages
English + Tamil toggle (EN / தமிழ்) in the header corner, remembered. All text in i18n files. Write natural Tamil and note in README that it needs the client's proofreading. Remove Kannada.

## Products (real menu, prices per piece)
Classic 55, Wheat 65, Pearl Millet (Kambu) 70, Health Mix 70, Ragi 70, Nuts 75, Oreo 70, Nutella 70, Double Chocolate 70, Triple Chocolate 75.
Assorted boxes: 4-piece 260, 6-piece 390.
Also offered (SAMPLE prices, mark them clearly): Brownie Slabs, Brownie Bites, Brownie Jar, Brownie Tub, Lava Brownies (box/cups), Cakes, Cupcakes, Cookie Tins.
Categories: Classic & Indulgent, Healthy Brownies (Wheat, Kambu, Ragi, Health Mix), Assorted Boxes, Slabs & Bites, Jars & Tubs, Lava Brownies, Cakes & Cupcakes, Cookie Tins.
Badges: "Healthy" on millet/ragi/wheat/health mix, "Bestseller" on 3 items. Illustrated SVG placeholders, no stock photos. All in src/data/products.js.

## Signature features
- BUILD YOUR BOX: customer picks flavours to fill a 4-piece (Rs 260) or 6-piece (Rs 390) assorted box, sees the box fill up visually, then adds it to the cart.
- Offer banner, editable in config (sample: "10% off on brownies & slabs").
- Slabs show "5% off" (from their menu).
- Trust badges: No Preservatives, FSSAI Certified, Certified Baker, Homemade Healthy.

## Ordering rules (sample values, all in src/config/site.js)
- Cart in browser, minimum 1 piece. More than 6 pieces: delivery date at least 2 days ahead, with a friendly notice.
- Delivery: Chennai, flat Rs 50. Validate Chennai pincodes (600xxx), using a list in config so it's easy to widen.
- Checkout: name, 10-digit phone, address, pincode, delivery date, optional note. On submit, create an order ID like PB-0001 and open wa.me with the full order pre-filled. Success page with ID and Track button. No online payment and no WhatsApp bot.
- Placeholders: WhatsApp 9XXXXXXXXX, email, FSSAI XXXXXXXXXXXXXX, shelf life "XX days", hours.

## Pages
Home, Shop (filter, search, sort), Product, Build Your Box, Cart/Checkout, Order success, Track Order (mock in Phase 1), Our Story (placeholder story, marked for the client), Gallery, Contact, FAQ, 404. Admin in Phase 2.

## Extras
SEO for Chennai (titles, meta, Open Graph, sitemap, robots, LocalBusiness JSON-LD), accessibility, an Instagram section linking to @passionate_brownies.

## Working rules
Ask only if truly blocked. Keep replies short. Explain manual steps simply. Never put keys in code or chat.
