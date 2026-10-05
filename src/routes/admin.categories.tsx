import { createFileRoute } from "@tanstack/react-router";
import { DataTable, DashboardShell } from "@/components/zinzo/dashboard-shell";
import { listCategories } from "@/lib/catalog";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/admin/categories")({
  head: () => pageMeta("Categories", "Manage ZINZO product categories."),
  component: () => (
    <DashboardShell role="admin" title="Categories">
      <DataTable head={["Category", "Slug"]} rows={listCategories().map((c) => [<span className="font-semibold">{c.name}</span>, c.slug])} />
    </DashboardShell>
  ),
});
