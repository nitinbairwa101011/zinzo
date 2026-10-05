import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, SiteLayout } from "@/components/zinzo/site-layout";
import { PageContainer } from "@/components/zinzo/primitives";
import { ShopCard } from "@/components/zinzo/cards";
import { LocationSelector } from "@/components/zinzo/search";
import { listPublicShops, shopDistance } from "@/lib/catalog";
import { useUserLocation } from "@/hooks/use-user-location";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/map")({
  head: () => pageMeta("Nearby shops map", "See fashion shops near you in Kota and get directions."),
  component: MapPage,
});

function MapPage() {
  const { coords } = useUserLocation();
  const shops = listPublicShops();
  return (
    <SiteLayout>
      <PageHeader title="Nearby" subtitle="Shops around you in Kota"><LocationSelector /></PageHeader>
      <PageContainer className="grid gap-6 py-6 md:grid-cols-[1fr_360px]">
        <div className="placeholder-pattern flex aspect-square items-center justify-center rounded-md border text-sm text-muted-foreground md:aspect-auto md:min-h-[520px]">
          Map view — coming soon
        </div>
        <div className="space-y-3">
          {shops.map((s) => <ShopCard key={s.id} shop={s} distanceKm={shopDistance(s, coords)} />)}
        </div>
      </PageContainer>
    </SiteLayout>
  );
}
