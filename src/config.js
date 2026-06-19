// ─────────────────────────────────────────────────────────────────────────────
// STORE CONFIGURATION — Edit this file to customise your store
// ─────────────────────────────────────────────────────────────────────────────

export const STORE_CONFIG = {
  name: "FindYourDeal",
  tagline: "Curated picks. Real savings. Zero fluff.",
  description: "Hand-picked products from trusted brands. Click any item to buy — we earn a small commission at no extra cost to you.",
  primaryColor: "#0F4C81",
  accentColor: "#F5A623",
  adminPassword: "StrngPassWrd#123#",
};

export const CATEGORIES = [
  "All",
  "Electronics",
  "Kitchen",
  "Toys & Games",
  "Sports & Fitness",
  "Home & Garden",
  "Fashion",
  "Books",
];

// ─────────────────────────────────────────────────────────────────────────────
// STARTER PRODUCTS — Replace or add your own via the Admin panel
// ─────────────────────────────────────────────────────────────────────────────

export const DEFAULT_PRODUCTS = [
  {
    id: 1,
    name: "Sony WH-1000XM5 Headphones",
    category: "Electronics",
    price: 279.99,
    commission: "Up to 4%",
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&q=80",
    description: "Industry-leading noise cancellation with 30-hour battery life. Perfect for work, travel, and music lovers.",
    affiliateUrl: "https://www.amazon.com",
    badge: "Best Seller",
    rating: 4.8,
    reviews: 12400,
    store: "Amazon",
  },
  {
    id: 2,
    name: "Kindle Paperwhite",
    category: "Electronics",
    price: 139.99,
    commission: "Up to 4%",
    image: "https://images.unsplash.com/photo-1592434134753-a70baf7979d5?w=400&q=80",
    description: "Waterproof, glare-free display with weeks of battery. The world's best-selling e-reader.",
    affiliateUrl: "https://www.amazon.com",
    badge: "Top Pick",
    rating: 4.7,
    reviews: 8900,
    store: "Amazon",
  },
  {
    id: 3,
    name: "Instant Pot Duo 7-in-1",
    category: "Kitchen",
    price: 79.99,
    commission: "Up to 4%",
    image: "https://images.unsplash.com/photo-1585515320310-259814833e62?w=400&q=80",
    description: "Pressure cooker, slow cooker, rice cooker, steamer, sauté pan, yogurt maker, and warmer — all in one.",
    affiliateUrl: "https://www.amazon.com",
    badge: "Deal",
    rating: 4.7,
    reviews: 54000,
    store: "Amazon",
  },
  {
    id: 4,
    name: "Yoga Mat Premium",
    category: "Sports & Fitness",
    price: 68.00,
    commission: "Up to 8%",
    image: "https://images.unsplash.com/photo-1601925228074-fb48b8ca18a3?w=400&q=80",
    description: "Non-slip, eco-friendly cork and natural rubber. Extra thick for joint support.",
    affiliateUrl: "https://www.shareasale.com",
    badge: null,
    rating: 4.6,
    reviews: 1850,
    store: "ShareASale",
  },
];
