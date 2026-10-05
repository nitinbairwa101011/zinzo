import { Link } from "@tanstack/react-router";
import { Heart, MapPin } from "lucide-react";
import type { Category, Product, Shop } from "@/types/models";
import { formatDistance, formatPrice } from "@/lib/geo";
import { ImagePlaceholder, StatusBadge, initials } from "./primitives";

export function ShopCard({ shop, distanceKm, categoryLabel }: { shop: Shop; distanceKm?: number | undefined; categoryLabel?: string | undefined }) {
  const distance = formatDistance(distanceKm);
  return (
    <Link
      to="/shop/$shopId"
      params={{ shopId: shop.id }}
      className="group block overflow-hidden rounded-md border bg-card transition-colors hover:border-foreground"
    >
      {shop.coverUrl ? (
        <img src={shop.coverUrl} alt="" className="aspect-[16/9] w-full object-cover" />
      ) : (
        <ImagePlaceholder label={initials(shop.name)} className="aspect-[16/9] w-full" />
      )}
      <div className="space-y-1.5 p-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-base font-bold leading-tight">{shop.name}</h3>
          {/* Open/closed is a placeholder until real hours logic lands. */}
          {shop.hours && <StatusBadge tone="success">Open</StatusBadge>}
        </div>
        {categoryLabel && <p className="text-xs font-medium text-muted-foreground">{categoryLabel}</p>}
        <p className="flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin className="size-3" /> {shop.area}
          {distance && <span className="text-foreground"> · {distance}</span>}
        </p>
        {shop.description && <p className="line-clamp-2 text-xs text-muted-foreground">{shop.description}</p>}
      </div>
    </Link>
  );
}

export function ProductCard({ product, shopName }: { product: Product; shopName?: string }) {
  const v = product.variants?.[0];
  return (
    <div className="group relative">
      <Link to="/product/$productId" params={{ productId: product.id }} className="block">
        {product.images[0] ? (
          <img src={product.images[0]} alt={product.name} className="aspect-[4/5] w-full rounded-md object-cover" />
        ) : (
          <ImagePlaceholder className="aspect-[4/5] w-full rounded-md" />
        )}
        <div className="mt-2 space-y-0.5">
          <p className="line-clamp-1 text-sm font-semibold">{product.name}</p>
          <p className="font-display text-base font-bold">{formatPrice(product.price)}</p>
          {shopName && <p className="line-clamp-1 text-xs text-muted-foreground">{shopName}</p>}
          <div className="flex flex-wrap items-center gap-1 pt-1">
            <StatusBadge tone={product.availability === "in_stock" ? "success" : "neutral"}>
              {product.availability === "in_stock" ? "In stock" : "Out of stock"}
            </StatusBadge>
            {v?.size && <StatusBadge>{v.size}</StatusBadge>}
            {v?.colour && <StatusBadge>{v.colour}</StatusBadge>}
          </div>
        </div>
      </Link>
      <FavoriteButton className="absolute right-2 top-2" />
    </div>
  );
}

export function FavoriteButton({ className }: { className?: string }) {
  // Saving requires login — wired up when customer auth lands.
  return (
    <Link
      to="/favorites"
      aria-label="Save"
      className={`flex size-8 items-center justify-center rounded-full bg-background/90 text-foreground hover:text-brand ${className ?? ""}`}
    >
      <Heart className="size-4" />
    </Link>
  );
}

export function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      to="/search"
      search={{ category: category.id }}
      className="flex h-20 min-w-32 flex-col justify-between rounded-md border p-3 transition-colors hover:border-foreground hover:bg-accent"
    >
      <span className="eyebrow">Shop</span>
      <span className="font-display text-sm font-bold">{category.name}</span>
    </Link>
  );
}
