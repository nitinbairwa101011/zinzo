import { createFileRoute } from "@tanstack/react-router";
import { DashboardShell } from "@/components/zinzo/dashboard-shell";
import { EmptyState } from "@/components/zinzo/primitives";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/merchant/products")({
  head: () => pageMeta("My products", "Manage products across your shops on ZINZO."),
  component: () => (
    <DashboardShell role="merchant" title="Products">
      <EmptyState title="No products yet" description="Every product needs a photo and a price. Product management opens in the next phase." />
    </DashboardShell>
  ),
});
