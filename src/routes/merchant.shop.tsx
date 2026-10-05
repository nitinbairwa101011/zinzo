import { createFileRoute } from "@tanstack/react-router";
import { DashboardShell } from "@/components/zinzo/dashboard-shell";
import { EmptyState } from "@/components/zinzo/primitives";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/merchant/shop")({
  head: () => pageMeta("My shops", "Manage your shop profiles on ZINZO."),
  component: () => (
    <DashboardShell role="merchant" title="My shops">
      <EmptyState title="No shops yet" description="You can manage more than one shop from this account. Shop setup opens in the next phase." />
    </DashboardShell>
  ),
});
