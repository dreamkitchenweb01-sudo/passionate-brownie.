/* ==========================================================================
   MENU DATA
   - Brownies (per piece) and the 4 / 6 assorted boxes use the REAL menu prices.
   - Everything marked samplePrice: true has a SAMPLE price — confirm with the client.
   - Descriptions are draft copy — confirm with the client.
   - Images are illustrated SVG placeholders in /public/products.
   Phase 2 moves this into Supabase.
   ========================================================================== */

export const categories = [
  { id: 'indulgent', name: { en: 'Classic & Indulgent', ta: 'கிளாசிக் & இன்பச் சுவைகள்' }, blurb: { en: 'Fudgy, gooey, chocolate-loaded.', ta: 'மென்மையான, சாக்லேட் நிறைந்த சுவைகள்.' }, image: '/products/triple.svg' },
  { id: 'healthy', name: { en: 'Healthy Brownies', ta: 'ஆரோக்கிய பிரவுனிகள்' }, blurb: { en: 'Wheat, kambu, ragi and health mix.', ta: 'கோதுமை, கம்பு, கேழ்வரகு, சத்து மாவு.' }, image: '/products/kambu.svg' },
  { id: 'boxes', name: { en: 'Assorted Boxes', ta: 'அசார்ட்டட் பாக்ஸ்கள்' }, blurb: { en: 'Pick 4 or 6 of your favourites.', ta: 'உங்களுக்குப் பிடித்த 4 அல்லது 6 பிரவுனிகள்.' }, image: '/products/box-6.svg' },
  { id: 'slabs', name: { en: 'Slabs & Bites', ta: 'ஸ்லாப் & பைட்ஸ்' }, blurb: { en: 'Big slabs to share, tiny bites to pop.', ta: 'பகிர பெரிய ஸ்லாப், சுவைக்க சின்ன பைட்ஸ்.' }, image: '/products/slab.svg' },
  { id: 'jars', name: { en: 'Jars & Tubs', ta: 'ஜார் & டப்' }, blurb: { en: 'Layered brownie happiness.', ta: 'அடுக்கடுக்கான பிரவுனி மகிழ்ச்சி.' }, image: '/products/jar.svg' },
  { id: 'lava', name: { en: 'Lava Brownies', ta: 'லாவா பிரவுனிகள்' }, blurb: { en: 'Warm, molten chocolate centres.', ta: 'உருகும் சாக்லேட் நடுப்பகுதி.' }, image: '/products/lava-cups.svg' },
  { id: 'cakes', name: { en: 'Cakes & Cupcakes', ta: 'கேக் & கப்கேக்' }, blurb: { en: 'For birthdays and little celebrations.', ta: 'பிறந்தநாள் மற்றும் சின்னச் சின்ன கொண்டாட்டங்களுக்கு.' }, image: '/products/cake.svg' },
  { id: 'cookies', name: { en: 'Cookie Tins', ta: 'குக்கீ டின்கள்' }, blurb: { en: 'Crunchy cookies in a gift tin.', ta: 'பரிசு டின்னில் மொறுமொறு குக்கீஸ்.' }, image: '/products/cookie-tin.svg' },
]

// unit: what the price is for ("per piece", "per box" …) — labels live in the i18n files.
// pieces: how many pieces one unit counts as for the "more than 6 pieces" rule.
// boxFlavour: true → can be picked in Build Your Box.
export const products = [
  /* ---------- Classic & Indulgent (real prices) ---------- */
  { id: 'classic', slug: 'classic-brownie', category: 'indulgent', price: 55, unit: 'piece', pieces: 1, tags: ['bestseller'], boxFlavour: true, image: '/products/classic.svg',
    name: { en: 'Classic Brownie', ta: 'கிளாசிக் பிரவுனி' },
    description: { en: 'The one that started it all: crackly top, fudgy middle, pure chocolate joy.', ta: 'இங்கிருந்துதான் எல்லாம் தொடங்கியது: மேலே மொறுமொறு, உள்ளே மென்மை, முழுக்க சாக்லேட் சந்தோஷம்.' } },
  { id: 'nuts', slug: 'nuts-brownie', category: 'indulgent', price: 75, unit: 'piece', pieces: 1, tags: [], boxFlavour: true, image: '/products/nuts.svg',
    name: { en: 'Nuts Brownie', ta: 'நட்ஸ் பிரவுனி' },
    description: { en: 'Loaded with crunchy roasted nuts in every bite.', ta: 'ஒவ்வொரு கடியிலும் வறுத்த நட்ஸின் மொறுமொறுப்பு.' } },
  { id: 'oreo', slug: 'oreo-brownie', category: 'indulgent', price: 70, unit: 'piece', pieces: 1, tags: [], boxFlavour: true, image: '/products/oreo.svg',
    name: { en: 'Oreo Brownie', ta: 'ஓரியோ பிரவுனி' },
    description: { en: 'Cookies-and-cream meets fudge, with Oreo pieces baked right in.', ta: 'உள்ளேயே ஓரியோ துண்டுகள் சேர்த்து சுட்ட குக்கீஸ்-அண்ட்-க்ரீம் பிரவுனி.' } },
  { id: 'nutella', slug: 'nutella-brownie', category: 'indulgent', price: 70, unit: 'piece', pieces: 1, tags: ['bestseller'], boxFlavour: true, image: '/products/nutella.svg',
    name: { en: 'Nutella Brownie', ta: 'நுடெல்லா பிரவுனி' },
    description: { en: 'A gooey brownie with a generous Nutella swirl on top.', ta: 'மேலே தாராளமாக நுடெல்லா சுழல் கொண்ட மென்மையான பிரவுனி.' } },
  { id: 'double', slug: 'double-chocolate-brownie', category: 'indulgent', price: 70, unit: 'piece', pieces: 1, tags: [], boxFlavour: true, image: '/products/double.svg',
    name: { en: 'Double Chocolate Brownie', ta: 'டபுள் சாக்லேட் பிரவுனி' },
    description: { en: 'Extra dark and fudgy, studded with melty chocolate chips.', ta: 'உருகும் சாக்லேட் சிப்ஸ் நிறைந்த, அடர்ந்த சாக்லேட் பிரவுனி.' } },
  { id: 'triple', slug: 'triple-chocolate-brownie', category: 'indulgent', price: 75, unit: 'piece', pieces: 1, tags: ['bestseller'], boxFlavour: true, image: '/products/triple.svg',
    name: { en: 'Triple Chocolate Brownie', ta: 'டிரிபிள் சாக்லேட் பிரவுனி' },
    description: { en: 'Dark, milk and white chocolate in one very happy brownie.', ta: 'டார்க், மில்க், வைட் — மூன்று சாக்லேட்டும் ஒரே பிரவுனியில்.' } },

  /* ---------- Healthy Brownies (real prices) ---------- */
  { id: 'wheat', slug: 'wheat-brownie', category: 'healthy', price: 65, unit: 'piece', pieces: 1, tags: ['healthy'], boxFlavour: true, image: '/products/wheat.svg',
    name: { en: 'Wheat Brownie', ta: 'கோதுமை பிரவுனி' },
    description: { en: 'Made with whole wheat flour instead of maida — just as fudgy.', ta: 'மைதாவுக்குப் பதில் முழு கோதுமை மாவில் செய்தது — அதே மென்மை.' } },
  { id: 'kambu', slug: 'pearl-millet-kambu-brownie', category: 'healthy', price: 70, unit: 'piece', pieces: 1, tags: ['healthy'], boxFlavour: true, image: '/products/kambu.svg',
    name: { en: 'Pearl Millet (Kambu) Brownie', ta: 'கம்பு பிரவுனி' },
    description: { en: 'A wholesome brownie made with kambu, our favourite millet.', ta: 'எங்களுக்குப் பிடித்த சிறுதானியமான கம்பில் செய்த சத்தான பிரவுனி.' } },
  { id: 'healthmix', slug: 'health-mix-brownie', category: 'healthy', price: 70, unit: 'piece', pieces: 1, tags: ['healthy'], boxFlavour: true, image: '/products/healthmix.svg',
    name: { en: 'Health Mix Brownie', ta: 'சத்து மாவு பிரவுனி' },
    description: { en: 'Made with a health mix of grains and seeds for a nutty, wholesome bite.', ta: 'தானியங்களும் விதைகளும் சேர்ந்த சத்து மாவில் செய்த சுவையான பிரவுனி.' } },
  { id: 'ragi', slug: 'ragi-brownie', category: 'healthy', price: 70, unit: 'piece', pieces: 1, tags: ['healthy'], boxFlavour: true, image: '/products/ragi.svg',
    name: { en: 'Ragi Brownie', ta: 'கேழ்வரகு (ராகி) பிரவுனி' },
    description: { en: 'Finger millet and rich cocoa — a guilt-free chocolate fix.', ta: 'கேழ்வரகும் கோகோவும் — கவலையில்லாத சாக்லேட் சுவை.' } },

  /* ---------- Assorted Boxes (real prices) — filled on the Build Your Box page ---------- */
  { id: 'box-4', slug: 'assorted-box-of-4', category: 'boxes', price: 260, unit: 'box', pieces: 4, boxSize: 4, tags: [], image: '/products/box-4.svg',
    name: { en: 'Assorted Box of 4', ta: 'அசார்ட்டட் பாக்ஸ் – 4 பீஸ்' },
    description: { en: 'Pick any 4 brownies. Mix classics and healthy ones as you like.', ta: 'எந்த 4 பிரவுனிகளையும் தேர்வு செய்யுங்கள். கிளாசிக், ஆரோக்கிய சுவைகளை விருப்பம் போல கலக்கலாம்.' } },
  { id: 'box-6', slug: 'assorted-box-of-6', category: 'boxes', price: 390, unit: 'box', pieces: 6, boxSize: 6, tags: [], image: '/products/box-6.svg',
    name: { en: 'Assorted Box of 6', ta: 'அசார்ட்டட் பாக்ஸ் – 6 பீஸ்' },
    description: { en: 'Pick any 6 brownies — the perfect gift box.', ta: 'எந்த 6 பிரவுனிகளையும் தேர்வு செய்யுங்கள் — சிறந்த பரிசுப் பெட்டி.' } },

  /* ---------- SAMPLE prices below — confirm with the client ---------- */
  { id: 'slab', slug: 'brownie-slab', category: 'slabs', mrp: 480, discountPct: 5, price: 456, unit: 'slab', pieces: 1, samplePrice: true, tags: [], image: '/products/slab.svg',
    name: { en: 'Brownie Slab (500 g)', ta: 'பிரவுனி ஸ்லாப் (500 கி)' },
    description: { en: 'A whole uncut slab to share at parties. Choose your flavour in the order note.', ta: 'பார்ட்டியில் பகிர முழு ஸ்லாப். சுவையை ஆர்டர் குறிப்பில் எழுதுங்கள்.' } },
  { id: 'bites', slug: 'brownie-bites', category: 'slabs', price: 240, unit: 'pack', pieces: 1, samplePrice: true, tags: [], image: '/products/bites.svg',
    name: { en: 'Brownie Bites (12)', ta: 'பிரவுனி பைட்ஸ் (12)' },
    description: { en: 'Twelve bite-sized brownie cubes. Perfect for return gifts.', ta: 'பன்னிரண்டு சின்ன பிரவுனி துண்டுகள். ரிட்டர்ன் கிஃப்ட்டுக்கு ஏற்றது.' } },
  { id: 'jar', slug: 'brownie-jar', category: 'jars', price: 299, unit: 'jar', pieces: 1, samplePrice: true, tags: [], image: '/products/jar.svg',
    name: { en: 'Brownie Jar', ta: 'பிரவுனி ஜார்' },
    description: { en: 'Layers of brownie, ganache and cream in a cute jar.', ta: 'அழகான ஜாரில் பிரவுனி, கனாஷ், க்ரீம் அடுக்குகள்.' } },
  { id: 'tub', slug: 'brownie-tub', category: 'jars', price: 349, unit: 'tub', pieces: 1, samplePrice: true, tags: [], image: '/products/tub.svg',
    name: { en: 'Brownie Tub', ta: 'பிரவுனி டப்' },
    description: { en: 'A tub of brownie chunks with chocolate sauce. Grab a spoon!', ta: 'சாக்லேட் சாஸுடன் பிரவுனி துண்டுகள் நிறைந்த டப். ஒரு ஸ்பூன் எடுங்கள்!' } },
  { id: 'lava-box', slug: 'lava-brownie-box', category: 'lava', price: 320, unit: 'box', pieces: 1, samplePrice: true, tags: [], image: '/products/lava-box.svg',
    name: { en: 'Lava Brownie Box (4)', ta: 'லாவா பிரவுனி பாக்ஸ் (4)' },
    description: { en: 'Four lava brownies. Warm for 15 seconds and watch the centre flow.', ta: 'நான்கு லாவா பிரவுனிகள். 15 விநாடி சூடாக்கினால் நடுவில் சாக்லேட் உருகி ஓடும்.' } },
  { id: 'lava-cups', slug: 'lava-brownie-cups', category: 'lava', price: 180, unit: 'pack', pieces: 1, samplePrice: true, tags: [], image: '/products/lava-cups.svg',
    name: { en: 'Lava Brownie Cups (2)', ta: 'லாவா பிரவுனி கப்ஸ் (2)' },
    description: { en: 'Two molten brownie cups, made to be eaten warm.', ta: 'சூடாகச் சாப்பிட இரண்டு உருகும் பிரவுனி கப்ஸ்.' } },
  { id: 'cake', slug: 'chocolate-brownie-cake', category: 'cakes', price: 650, unit: 'cake', pieces: 1, samplePrice: true, tags: [], image: '/products/cake.svg',
    name: { en: 'Chocolate Brownie Cake (500 g)', ta: 'சாக்லேட் பிரவுனி கேக் (500 கி)' },
    description: { en: 'A fudgy brownie cake with a pink drip. Add the name in the order note.', ta: 'பிங்க் ட்ரிப் கொண்ட பிரவுனி கேக். பெயரை ஆர்டர் குறிப்பில் எழுதுங்கள்.' } },
  { id: 'cupcakes', slug: 'cupcakes-box-of-6', category: 'cakes', price: 360, unit: 'box', pieces: 1, samplePrice: true, tags: [], image: '/products/cupcakes.svg',
    name: { en: 'Cupcakes (Box of 6)', ta: 'கப்கேக்ஸ் (6 பாக்ஸ்)' },
    description: { en: 'Six soft chocolate cupcakes with swirly frosting.', ta: 'சுழல் க்ரீம் கொண்ட ஆறு மென்மையான சாக்லேட் கப்கேக்ஸ்.' } },
  { id: 'cookie-tin', slug: 'cookie-tin', category: 'cookies', price: 299, unit: 'tin', pieces: 1, samplePrice: true, tags: [], image: '/products/cookie-tin.svg',
    name: { en: 'Choco Chip Cookie Tin', ta: 'சாக்கோ சிப் குக்கீ டின்' },
    description: { en: 'Crunchy choco chip cookies packed in a reusable gift tin.', ta: 'மீண்டும் பயன்படுத்தக்கூடிய பரிசு டின்னில் மொறுமொறு சாக்கோ சிப் குக்கீஸ்.' } },
]
