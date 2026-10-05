import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { Clock, Instagram, MapPin } from "lucide-react";
import { SiteLayout } from "@/components/zinzo/site-layout";
import { EmptyState, ImagePlaceholder, PageContainer, SectionHeader, StatusBadge, initials } from "@/components/zinzo/primitives";
import { FavoriteButton, ProductCard } from "@/components/zinzo/cards";
import { ContactActions } from "@/components/zinzo/contact-actions";
import { getShop, listCategories, listShopProducts } from "@/lib/catalog";

export const Route = createFileRoute("/shop/$shopId")({
  loader: ({ params }) => {
    const shop = getShop(params.shopId);
    if (!shop) throw notFound();
    return { shop, products: listShopProducts(shop.id) };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Shop not found — ZINZO" }, { name: "robots", content: "noindex" }] };
    const t = `${loaderData.shop.name}, ${loaderData.shop.area} — ZINZO`;
    const d = loaderData.shop.description ?? `Fashion shop in ${loaderData.shop.area}, Kota.`;
    return { meta: [{ title: t }, { name: "description", content: d }, { property: "og:title", content: t }, { property: "og:description", content: d }] };
  },
  notFoundComponent: ShopNotFound,
  component: ShopPage,
});

function ShopNotFound() {
  return (
    <SiteLayout>
      <PageContainer className="py-16">
        <EmptyState title="Shop not found" description="It may not be approved yet." action={<Link to="/shops" className="font-semibold text-brand">Browse shops</Link>} />
      </PageContainer>
    </SiteLayout>
  );
}

function ShopPage() {
  const { shop, products } = Route.useLoaderData();
  const cats = listCategories().filter((c) => shop.categoryIds.includes(c.id));
  return (
    <SiteLayout>
      <ImagePlaceholder className="h-36 w-full md:h-56" />
      <PageContainer>
        <div className="-mt-10 flex items-end justify-between">
          <div className="flex size-20 items-center justify-center rounded-md border-4 border-background bg-inverse font-display text-2xl font-black text-inverse-foreground">
            {initials(shop.name)}
          </div>
          <FavoriteButton className="border" />
        </div>
        <div className="mt-4 grid gap-8 md:grid-cols-[1fr_320px]">
          <div>
            <div className="flex flex-wrap gap-1">{cats.map((c) => <StatusBadge key={c.id}>{c.name}</StatusBadge>)}</div>
            <h1 className="mt-2 text-3xl font-black md:text-4xl">{shop.name}</h1>
            <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground"><MapPin className="size-4" /> {shop.area}, {shop.city}</p>
            {shop.description && <p className="mt-4 max-w-prose text-sm">{shop.description}</p>}
            <div className="mt-6 md:hidden"><ContactActions shop={shop} /></div>
          </div>
          <aside className="space-y-4 rounded-md border p-4 text-sm md:row-span-2">
            <div className="hidden md:block"><ContactActions shop={shop} /></div>
            <Info label="Address">{shop.address}, {shop.area}, {shop.city}</Info>
            {shop.hours && (
              <Info label="Hours">
                <span className="flex items-center gap-1"><Clock className="size-4" /> {shop.hours.open} – {shop.hours.close}</span>
                {shop.hours.weeklyClosedDay && <span className="text-muted-foreground">Closed on {shop.hours.weeklyClosedDay}</span>}
              </Info>
            )}
            {shop.phone && <Info label="Phone">{shop.phone}</Info>}
            <div className="placeholder-pattern flex h-32 items-center justify-center rounded-md text-xs text-muted-foreground">Map pin — coming soon</div>
            {shop.socials?.instagram && <a href={shop.socials.instagram} className="flex items-center gap-1 text-brand"><Instagram className="size-4" /> Instagram</a>}
          </aside>
          <section>
            <SectionHeader eyebrow="Catalogue" title={`${products.length} products`} />
            {products.length ? (
              <div className="grid grid-cols-2 gap-x-3 gap-y-6 lg:grid-cols-3">
                {products.map((p) => <ProductCard key={p.id} product={p} />)}
              </div>
            ) : (
              <EmptyState title="No products listed yet" />
            )}
          </section>
        </div>
      </PageContainer>
      <div className="h-12" />
    </SiteLayout>
  );
}

function Info({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="eyebrow mb-1">{label}</p>
      <div className="flex flex-col">{children}</div>
    </div>
  );
}
