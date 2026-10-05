import { createFileRoute } from "@tanstack/react-router";
import { DashboardShell, StatTile } from "@/components/zinzo/dashboard-shell";
import { listAllShops, listApprovals, listMerchants, listProducts } from "@/lib/catalog";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/admin/dashboard")({
  head: () => pageMeta("Admin dashboard", "ZINZO platform overview."),
  component: () => (
    <DashboardShell role="admin" title="Overview">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatTile label="Pending approvals" value={listApprovals().filter((a) => a.status === "pending").length} />
        <StatTile label="Shops" value={listAllShops().length} />
        <StatTile label="Merchants" value={listMerchants().length} />
        <StatTile label="Products" value={listProducts().length} />
      </div>
    </DashboardShell>
  ),
});
