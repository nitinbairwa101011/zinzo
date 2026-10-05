import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { SiteLayout } from "@/components/zinzo/site-layout";
import { EmptyState, PageContainer } from "@/components/zinzo/primitives";
import { ProductCard } from "@/components/zinzo/cards";
import { FilterPanel, SearchBar, SortControl } from "@/components/zinzo/search";
import { searchProducts, shopName } from "@/lib/catalog";
import { useUserLocation } from "@/hooks/use-user-location";
import { pageMeta } from "@/lib/seo";

const searchSchema = z.object({
  q: z.string().optional(),
  category: z.string().optional(),
  sort: z.enum(["relevance", "price_asc", "price_desc", "nearest"]).optional(),
  minPrice: z.number().optional(),
  maxPrice: z.number().optional(),
  inStock: z.boolean().optional(),
  km: z.number().optional(),
});

export const Route = createFileRoute("/search")({
  validateSearch: (s) => searchSchema.parse(s),
  head: () => pageMeta("Search products", "Search clothing and fashion products available in Kota shops."),
  component: SearchPage,
});

function SearchPage() {
  const s = Route.useSearch();
  const navigate = useNavigate({ from: "/search" });
  const { coords } = useUserLocation();
  const filters = {
    categoryId: s.category,
    minPrice: s.minPrice,
    maxPrice: s.maxPrice,
    availability: s.inStock ? ("in_stock" as const) : undefined,
    maxDistanceKm: s.km,
  };
  const results = searchProducts({ q: s.q, sort: s.sort, filters, origin: coords });

  return (
    <SiteLayout>
      <PageContainer className="py-6 md:py-8">
        <SearchBar key={s.q} defaultValue={s.q} size="lg" />
        <div className="mt-6 flex gap-8">
          <FilterPanel
            value={filters}
            onChange={(f) =>
              navigate({
                search: (prev) => ({
                  ...prev,
                  category: f.categoryId,
                  minPrice: f.minPrice,
                  maxPrice: f.maxPrice,
                  inStock: f.availability === "in_stock" || undefined,
                  km: f.maxDistanceKm,
                }),
              })
            }
          />
          <div className="min-w-0 flex-1">
            <div className="mb-4 flex items-center justify-between gap-3">
              <p className="text-sm text-muted-foreground">
                {results.length} result{results.length === 1 ? "" : "s"}
                {s.q && <> for <span className="font-semibold text-foreground">“{s.q}”</span></>}
              </p>
              <SortControl value={s.sort ?? "relevance"} onChange={(sort) => navigate({ search: (prev) => ({ ...prev, sort }) })} />
            </div>
            {results.length === 0 ? (
              <EmptyState title="Nothing found yet" description="Try a broader search or remove a filter." />
            ) : (
              <div className="grid grid-cols-2 gap-x-3 gap-y-6 lg:grid-cols-3">
                {results.map((p) => <ProductCard key={p.id} product={p} shopName={shopName(p.shopId)} />)}
              </div>
            )}
          </div>
        </div>
      </PageContainer>
    </SiteLayout>
  );
}
