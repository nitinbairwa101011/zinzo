import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { SiteLayout } from "@/components/zinzo/site-layout";
import { EmptyState, ImagePlaceholder, PageContainer, StatusBadge } from "@/components/zinzo/primitives";
import { FavoriteButton } from "@/components/zinzo/cards";
import { ContactActions } from "@/components/zinzo/contact-actions";
import { getProduct } from "@/lib/catalog";
import { formatPrice } from "@/lib/geo";

export const Route = createFileRoute("/product/$productId")({
  loader: ({ params }) => {
    const data = getProduct(params.productId);
    if (!data || !data.shop) throw notFound();
    return { product: data.product, shop: data.shop };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Product not found — ZINZO" }, { name: "robots", content: "noindex" }] };
    const t = `${loaderData.product.name} at ${loaderData.shop.name} — ZINZO`;
    const d = `${formatPrice(loaderData.product.price)} · available at ${loaderData.shop.name}, ${loaderData.shop.area}, Kota.`;
    return { meta: [{ title: t }, { name: "description", content: d }, { property: "og:title", content: t }, { property: "og:description", content: d }] };
  },
  notFoundComponent: ProductNotFound,
  component: ProductPage,
});

function ProductNotFound() {
  return (
    <SiteLayout>
      <PageContainer className="py-16">
        <EmptyState title="Product not found" action={<Link to="/search" className="font-semibold text-brand">Search products</Link>} />
      </PageContainer>
    </SiteLayout>
  );
}

function ProductPage() {
  const { product, shop } = Route.useLoaderData();
  const sizes = [...new Set(product.variants?.map((v) => v.size).filter(Boolean))];
  const colours = [...new Set(product.variants?.map((v) => v.colour).filter(Boolean))];
  return (
    <SiteLayout>
      <PageContainer className="grid gap-6 py-4 md:grid-cols-2 md:gap-12 md:py-10">
        <div className="relative">
          {product.images[0] ? (
            <img src={product.images[0]} alt={product.name} className="aspect-[4/5] w-full rounded-md object-cover" />
          ) : (
            <ImagePlaceholder className="aspect-[4/5] w-full rounded-md" />
          )}
          <FavoriteButton className="absolute right-3 top-3" />
        </div>
        <div>
          <StatusBadge tone={product.availability === "in_stock" ? "success" : "neutral"}>
            {product.availability === "in_stock" ? "In stock" : "Out of stock"}
          </StatusBadge>
          <h1 className="mt-2 text-3xl font-black md:text-4xl">{product.name}</h1>
          <p className="mt-2 font-display text-2xl font-bold">{formatPrice(product.price)}</p>
          {sizes.length > 0 && <Options label="Size" values={sizes as string[]} />}
          {colours.length > 0 && <Options label="Colour" values={colours as string[]} />}
          <p className="mt-6 text-xs text-muted-foreground">Contact the shop to confirm size and availability.</p>
          <div className="mt-3"><ContactActions shop={shop} message={`Hi, is "${product.name}" available? (via ZINZO)`} /></div>
          <Link to="/shop/$shopId" params={{ shopId: shop.id }} className="mt-6 flex items-center justify-between rounded-md border p-4 hover:border-foreground">
            <div>
              <p className="eyebrow">Sold by</p>
              <p className="font-display font-bold">{shop.name}</p>
              <p className="text-xs text-muted-foreground">{shop.area}, {shop.city}</p>
            </div>
            <span className="flex items-center text-sm font-semibold text-brand">View shop <ChevronRight className="size-4" /></span>
          </Link>
        </div>
      </PageContainer>
    </SiteLayout>
  );
}

function Options({ label, values }: { label: string; values: string[] }) {
  return (
    <div className="mt-5">
      <p className="eyebrow mb-2">{label}</p>
      <div className="flex flex-wrap gap-2">
        {values.map((v) => <span key={v} className="flex h-9 min-w-9 items-center justify-center rounded-md border px-3 text-sm font-semibold">{v}</span>)}
      </div>
    </div>
  );
}
