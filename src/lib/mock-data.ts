// Minimal demo content for layout only. Replace with backend reads in src/lib/catalog.ts.
import type { Category, Merchant, Product, Shop, ShopApproval } from "@/types/models";

export const categories: Category[] = [
  { id: "men", slug: "men", name: "Men" },
  { id: "women", slug: "women", name: "Women" },
  { id: "ethnic", slug: "ethnic", name: "Ethnic wear" },
  { id: "kids", slug: "kids", name: "Kids" },
  { id: "footwear", slug: "footwear", name: "Footwear" },
  { id: "accessories", slug: "accessories", name: "Accessories" },
];

export const shops: Shop[] = [
  {
    id: "demo-shop-1",
    merchantId: "m1",
    name: "Sample Menswear",
    categoryIds: ["men"],
    description: "Demo listing to preview the shop layout.",
    address: "Shop address line",
    area: "Talwandi",
    city: "Kota",
    phone: "+910000000000",
    whatsapp: "+910000000000",
    location: { lat: 25.1435, lng: 75.8467 },
    hours: { open: "10:30", close: "21:00", weeklyClosedDay: "Tuesday" },
    status: "approved",
  },
  {
    id: "demo-shop-2",
    merchantId: "m1",
    name: "Sample Ethnic House",
    categoryIds: ["ethnic", "women"],
    description: "Demo listing to preview the shop layout.",
    address: "Shop address line",
    area: "Gumanpura",
    city: "Kota",
    phone: "+910000000000",
    location: { lat: 25.1806, lng: 75.8414 },
    hours: { open: "11:00", close: "20:30" },
    status: "approved",
  },
  {
    id: "demo-shop-3",
    merchantId: "m2",
    name: "Sample Kids Store",
    categoryIds: ["kids"],
    address: "Shop address line",
    area: "Vigyan Nagar",
    city: "Kota",
    location: { lat: 25.1366, lng: 75.8343 },
    status: "pending",
  },
];

export const products: Product[] = [
  { id: "demo-p1", shopId: "demo-shop-1", name: "Black cotton shirt", price: 899, images: [], categoryId: "men", availability: "in_stock", variants: [{ id: "v1", size: "M", colour: "Black" }, { id: "v2", size: "L", colour: "Black" }] },
  { id: "demo-p2", shopId: "demo-shop-1", name: "Slim fit jeans", price: 1299, images: [], categoryId: "men", availability: "in_stock", variants: [{ id: "v3", size: "32" }] },
  { id: "demo-p3", shopId: "demo-shop-2", name: "Printed kurti", price: 749, images: [], categoryId: "ethnic", availability: "out_of_stock", variants: [{ id: "v4", size: "S", colour: "Indigo" }] },
  { id: "demo-p4", shopId: "demo-shop-2", name: "Festive lehenga", price: 4999, images: [], categoryId: "ethnic", availability: "in_stock" },
];

export const merchants: Merchant[] = [
  { id: "m1", name: "Demo merchant A", phone: "+910000000000", shopIds: ["demo-shop-1", "demo-shop-2"] },
  { id: "m2", name: "Demo merchant B", phone: "+910000000000", shopIds: ["demo-shop-3"] },
];

export const approvals: ShopApproval[] = [
  { id: "a1", shopId: "demo-shop-3", status: "pending", submittedAt: "2026-10-01" },
];
