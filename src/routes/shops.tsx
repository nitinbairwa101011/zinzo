import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, SiteLayout } from "@/components/zinzo/site-layout";
import { EmptyState, PageContainer } from "@/components/zinzo/primitives";
import { ShopCard } from "@/components/zinzo/cards";
import { LocationSelector } from "@/components/zinzo/search";
import { listCategories, listPublicShops, shopDistance } from "@/lib/catalog";
import { useUserLocation } from "@/hooks/use-user-location";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/shops")({
  head: () => pageMeta("Browse shops in Kota", "Every approved local fashion and clothing shop in Kota, in one place."),
  component: ShopsPage,
});

function ShopsPage() {
  const { coords } = useUserLocation();
  const cats = listCategories();
  const shops = [...listPublicShops()].sort(
    (a, b) => (shopDistance(a, coords) ?? Infinity) - (shopDistance(b, coords) ?? Infinity),
  );
  return (
    <SiteLayout>
      <PageHeader title="Shops" subtitle="Local fashion stores across Kota">
        <LocationSelector />
      </PageHeader>
      <PageContainer className="py-8">
        {shops.length === 0 ? (
          <EmptyState title="No shops yet" description="Shops appear here once they're approved." />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {shops.map((s) => (
              <ShopCard key={s.id} shop={s} distanceKm={shopDistance(s, coords)} categoryLabel={s.categoryIds.map((id) => cats.find((c) => c.id === id)?.name).join(" · ")} />
            ))}
          </div>
        )}
      </PageContainer>
    </SiteLayout>
  );
}
