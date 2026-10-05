// Conceptual entities for ZINZO. Shapes mirror the future backend so mock data can be swapped out.

export type UserRole = "customer" | "merchant" | "admin";

export interface GeoPoint {
  lat: number;
  lng: number;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  subcategories?: Subcategory[] | undefined;
}

export interface Subcategory {
  id: string;
  categoryId: string;
  name: string;
}

export type ApprovalStatus = "pending" | "approved" | "rejected";

export interface OpeningHours {
  open: string; // "10:00"
  close: string; // "21:00"
  weeklyClosedDay?: string | undefined; // "Tuesday"
}

export interface Shop {
  id: string;
  merchantId: string;
  name: string;
  categoryIds: string[];
  description?: string | undefined;
  address: string;
  area: string;
  city: string;
  phone?: string | undefined;
  whatsapp?: string | undefined;
  location?: GeoPoint | undefined;
  hours?: OpeningHours | undefined;
  socials?: { instagram?: string | undefined; facebook?: string };
  logoUrl?: string | undefined;
  coverUrl?: string | undefined;
  status: ApprovalStatus;
  // Reserved for the future ratings feature.
  rating?: number | undefined;
}

export type Availability = "in_stock" | "out_of_stock";

export interface ProductVariant {
  id: string;
  size?: string | undefined;
  colour?: string | undefined;
}

export interface Product {
  id: string;
  shopId: string;
  name: string;
  price: number; // INR, mandatory
  images: string[]; // mandatory (at least one) once backend exists
  categoryId: string;
  availability: Availability;
  variants?: ProductVariant[] | undefined;
}

export interface Merchant {
  id: string;
  name: string;
  phone: string;
  shopIds: string[];
  suspended?: boolean | undefined;
}

export interface ShopApproval {
  id: string;
  shopId: string;
  status: ApprovalStatus;
  reviewedBy?: string | undefined;
  comment?: string | undefined;
  submittedAt: string;
}

export interface FavoriteShop {
  userId: string;
  shopId: string;
}

export interface FavoriteProduct {
  userId: string;
  productId: string;
}

export type SortKey = "relevance" | "price_asc" | "price_desc" | "nearest";

export interface ProductFilters {
  categoryId?: string | undefined;
  minPrice?: number | undefined;
  maxPrice?: number | undefined;
  size?: string | undefined;
  colour?: string | undefined;
  availability?: Availability | undefined;
  maxDistanceKm?: number | undefined;
}
