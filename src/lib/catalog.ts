// Data access layer. Pages call only these functions; swap internals for real backend queries later.
import { approvals, categories, merchants, products, shops } from "@/lib/mock-data";
import { distanceKm } from "@/lib/geo";
import type { GeoPoint, Product, ProductFilters, Shop, SortKey } from "@/types/models";

export const CITY = "Kota";

export function listCategories() {
  return categories;
}
export function listPublicShops() {
  return shops.filter((s) => s.status === "approved");
}
export function listAllShops() {
  return shops;
}
export function getShop(id: string) {
  return shops.find((s) => s.id === id && s.status === "approved") ?? null;
}
export function listProducts() {
  const visible = new Set(listPublicShops().map((s) => s.id));
  return products.filter((p) => visible.has(p.shopId));
}
export function listShopProducts(shopId: string) {
  return listProducts().filter((p) => p.shopId === shopId);
}
export function getProduct(id: string) {
  const product = listProducts().find((p) => p.id === id);
  if (!product) return null;
  return { product, shop: getShop(product.shopId) };
}
export function listMerchants() {
  return merchants;
}
export function listApprovals() {
  return approvals;
}
export function shopName(id: string) {
  return shops.find((s) => s.id === id)?.name ?? "";
}

export interface SearchParams {
  q?: string | undefined;
  sort?: SortKey | undefined;
  filters?: ProductFilters | undefined;
  origin?: GeoPoint | null | undefined;
}

export function searchProducts({ q, sort = "relevance", filters = {}, origin }: SearchParams): Product[] {
  const term = q?.trim().toLowerCase();
  const shopById = new Map(shops.map((s) => [s.id, s]));
  const dist = (p: Product) => {
    const loc = shopById.get(p.shopId)?.location;
    return origin && loc ? distanceKm(origin, loc) : Infinity;
  };
  let result = listProducts().filter((p) => {
    if (term && !p.name.toLowerCase().includes(term)) return false;
    if (filters.categoryId && p.categoryId !== filters.categoryId) return false;
    if (filters.minPrice != null && p.price < filters.minPrice) return false;
    if (filters.maxPrice != null && p.price > filters.maxPrice) return false;
    if (filters.availability && p.availability !== filters.availability) return false;
    if (filters.size && !p.variants?.some((v) => v.size === filters.size)) return false;
    if (filters.colour && !p.variants?.some((v) => v.colour === filters.colour)) return false;
    if (filters.maxDistanceKm != null && origin && dist(p) > filters.maxDistanceKm) return false;
    return true;
  });
  if (sort === "price_asc") result = [...result].sort((a, b) => a.price - b.price);
  if (sort === "price_desc") result = [...result].sort((a, b) => b.price - a.price);
  if (sort === "nearest") result = [...result].sort((a, b) => dist(a) - dist(b));
  return result;
}

export function shopDistance(shop: Shop, origin?: GeoPoint | null) {
  return origin && shop.location ? distanceKm(origin, shop.location) : undefined;
}
