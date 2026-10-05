import { createFileRoute } from "@tanstack/react-router";
import { DataTable, DashboardShell } from "@/components/zinzo/dashboard-shell";
import { StatusBadge } from "@/components/zinzo/primitives";
import { listProducts, shopName } from "@/lib/catalog";
import { formatPrice } from "@/lib/geo";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/admin/products")({
  head: () => pageMeta("Product moderation", "Moderate products listed on ZINZO."),
  component: () => (
    <DashboardShell role="admin" title="Products">
      <DataTable
        head={["Product", "Shop", "Price", "Stock"]}
        rows={listProducts().map((p) => [
          <span className="font-semibold">{p.name}</span>,
          shopName(p.shopId),
          formatPrice(p.price),
          <StatusBadge tone={p.availability === "in_stock" ? "success" : "neutral"}>{p.availability === "in_stock" ? "In stock" : "Out of stock"}</StatusBadge>,
        ])}
      />
    </DashboardShell>
  ),
});
