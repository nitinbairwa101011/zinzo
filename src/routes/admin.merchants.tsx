import { createFileRoute } from "@tanstack/react-router";
import { DataTable, DashboardShell } from "@/components/zinzo/dashboard-shell";
import { StatusBadge } from "@/components/zinzo/primitives";
import { listMerchants } from "@/lib/catalog";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/admin/merchants")({
  head: () => pageMeta("Merchants", "Manage ZINZO merchants."),
  component: () => (
    <DashboardShell role="admin" title="Merchants">
      <DataTable
        head={["Merchant", "Shops", "Status"]}
        rows={listMerchants().map((m) => [
          <span className="font-semibold">{m.name}</span>,
          m.shopIds.length,
          <StatusBadge tone={m.suspended ? "danger" : "success"}>{m.suspended ? "Suspended" : "Active"}</StatusBadge>,
        ])}
      />
    </DashboardShell>
  ),
});
