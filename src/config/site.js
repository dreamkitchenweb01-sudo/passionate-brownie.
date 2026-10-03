// All business details live here. Replace every PLACEHOLDER before going live.
export const site = {
  name: 'The Passionate Brownie',
  url: 'https://passionatebrownie.netlify.app', // PLACEHOLDER: final domain
  city: 'Chennai',

  // WhatsApp number WITHOUT +91 and without spaces, e.g. '9876543210'
  whatsapp: '9XXXXXXXXX', // PLACEHOLDER
  email: 'hello@passionatebrownie.example', // PLACEHOLDER
  fssai: 'XXXXXXXXXXXXXX', // PLACEHOLDER: 14-digit FSSAI licence
  shelfLife: 'XX days', // PLACEHOLDER
  hours: { en: '10 am – 8 pm, every day', ta: 'தினமும் காலை 10 – இரவு 8 மணி' }, // PLACEHOLDER

  social: {
    instagram: 'https://www.instagram.com/passionate_brownies/',
    instagramHandle: '@passionate_brownies',
  },

  // Offer banner at the top of every page. Set enabled: false to hide it.
  offer: {
    enabled: true,
    text: { en: '10% off on brownies & slabs', ta: 'பிரவுனிகள் மற்றும் ஸ்லாப்களுக்கு 10% தள்ளுபடி' }, // SAMPLE offer
    link: '/shop',
  },

  delivery: {
    charge: 50, // SAMPLE flat delivery charge in Rs, all over Chennai
    // Allowed pincode starts. '600' covers Chennai city (600001–600130).
    // To widen the area, add more starts, e.g. '601', '602', '603'.
    pincodePrefixes: ['600'],
  },

  // Advance-notice rule
  order: {
    minPieces: 1,
    bulkThreshold: 6, // more than this many pieces in total...
    bulkMinDaysAhead: 2, // ...needs the delivery date at least this many days ahead
    standardMinDaysAhead: 1, // normal orders: earliest delivery is tomorrow (SAMPLE)
    maxDaysAhead: 60,
    idPrefix: 'PB-',
  },
}

export const waLink = (text) =>
  `https://wa.me/91${site.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ''}`
