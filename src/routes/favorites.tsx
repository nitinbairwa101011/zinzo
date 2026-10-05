import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader, SiteLayout } from "@/components/zinzo/site-layout";
import { EmptyState, PageContainer } from "@/components/zinzo/primitives";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/favorites")({
  head: () => pageMeta("Saved shops & products", "Your saved shops and products on ZINZO."),
  component: FavoritesPage,
});

function FavoritesPage() {
  const cta = <Link to="/shops" className="font-semibold text-brand">Explore shops</Link>;
  return (
    <SiteLayout>
      <PageHeader title="Saved" subtitle="Sign in to save shops and products — coming soon." />
      <PageContainer className="py-6">
        <Tabs defaultValue="shops">
          <TabsList>
            <TabsTrigger value="shops">Shops</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
          </TabsList>
          <TabsContent value="shops" className="mt-4">
            <EmptyState title="No saved shops" description="Tap the heart on a shop to keep it here." action={cta} />
          </TabsContent>
          <TabsContent value="products" className="mt-4">
            <EmptyState title="No saved products" description="Tap the heart on a product to keep it here." action={cta} />
          </TabsContent>
        </Tabs>
      </PageContainer>
    </SiteLayout>
  );
}
