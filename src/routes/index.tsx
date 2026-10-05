import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Store } from "lucide-react";
import { SiteLayout } from "@/components/zinzo/site-layout";
import { PageContainer, SectionHeader } from "@/components/zinzo/primitives";
import { CategoryCard, ProductCard, ShopCard } from "@/components/zinzo/cards";
import { LocationSelector, SearchBar } from "@/components/zinzo/search";
import { listCategories, listProducts, listPublicShops, shopDistance, shopName } from "@/lib/catalog";
import { useUserLocation } from "@/hooks/use-user-location";
import { Button } from "@/components/ui/button";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () => pageMeta("Local fashion shops in Kota", "Discover clothing and fashion shops near you in Kota. Browse products, then call, WhatsApp or get directions."),
  component: Home,
});

const quick = ["Black shirt", "Men's jeans", "Kurti", "Lehenga"];

function Home() {
  const { coords } = useUserLocation();
  const shops = listPublicShops();
  const categories = listCategories();
  const products = listProducts();
  const catName = (id: string) => categories.find((c) => c.id === id)?.name;

  return (
    <SiteLayout>
      <section className="border-b">
        <PageContainer className="py-8 md:py-16">
          <LocationSelector />
          <h1 className="mt-5 max-w-3xl text-4xl font-black leading-[0.95] md:text-6xl">
            What can you find <span className="text-brand">near you</span> in Kota?
          </h1>
          <p className="mt-3 max-w-lg text-sm text-muted-foreground md:text-base">
            Local clothing shops, their products, and a direct line to the owner.
          </p>
          <div className="mt-6 max-w-xl">
            <SearchBar size="lg" />
            <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto">
              {quick.map((q) => (
                <Link key={q} to="/search" search={{ q }} className="h-8 whitespace-nowrap rounded-full border px-3 text-xs font-semibold leading-8 hover:border-foreground">
                  {q}
                </Link>
              ))}
            </div>
          </div>
        </PageContainer>
      </section>

      <PageContainer className="space-y-12 py-8 md:py-12">
        <section>
          <SectionHeader eyebrow="Fashion" title="Browse by category" action={<SeeAll to="/categories" />} />
          <div className="no-scrollbar -mx-4 flex gap-3 overflow-x-auto px-4 md:mx-0 md:grid md:grid-cols-6 md:px-0">
            {categories.map((c) => <CategoryCard key={c.id} category={c} />)}
          </div>
        </section>

        <section>
          <SectionHeader eyebrow="Nearby" title="Shops around you" action={<SeeAll to="/shops" />} />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {shops.map((s) => (
              <ShopCard key={s.id} shop={s} distanceKm={shopDistance(s, coords)} categoryLabel={s.categoryIds.map(catName).join(" · ")} />
            ))}
          </div>
        </section>

        <section>
          <SectionHeader eyebrow="In stores now" title="Products from local shops" action={<SeeAll to="/search" />} />
          <div className="grid grid-cols-2 gap-x-3 gap-y-6 md:grid-cols-4">
            {products.map((p) => <ProductCard key={p.id} product={p} shopName={shopName(p.shopId)} />)}
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <Link to="/map" className="group flex flex-col justify-between rounded-md border p-6 hover:border-foreground">
            <p className="eyebrow">Location</p>
            <div className="mt-8">
              <h3 className="text-2xl font-black">See shops on the map</h3>
              <p className="mt-1 text-sm text-muted-foreground">Find what's closest, then get directions.</p>
            </div>
          </Link>
          <div className="flex flex-col justify-between rounded-md bg-inverse p-6 text-inverse-foreground">
            <Store className="size-6 text-brand" />
            <div className="mt-8">
              <h3 className="text-2xl font-black">Own a shop in Kota?</h3>
              <p className="mt-1 text-sm opacity-70">Get listed free. Add products, go live after a quick review.</p>
              <Button asChild variant="brand" className="mt-4">
                <Link to="/merchant/signup">List your shop <ArrowRight /></Link>
              </Button>
            </div>
          </div>
        </section>
      </PageContainer>
    </SiteLayout>
  );
}

function SeeAll({ to }: { to: "/categories" | "/shops" | "/search" }) {
  return (
    <Link to={to} className="text-sm font-semibold text-brand hover:underline">See all</Link>
  );
}
