import { createFileRoute } from "@tanstack/react-router";
import { DataTable, DashboardShell } from "@/components/zinzo/dashboard-shell";
import { StatusBadge } from "@/components/zinzo/primitives";
import { Button } from "@/components/ui/button";
import { listAllShops } from "@/lib/catalog";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/admin/shops")({
  head: () => pageMeta("Shop approvals", "Review and approve shop submissions."),
  component: Page,
});

const tone = { pending: "warning", approved: "success", rejected: "danger" } as const;

function Page() {
  return (
    <DashboardShell role="admin" title="Shop approvals">
      <DataTable
        head={["Shop", "Area", "Status", ""]}
        rows={listAllShops().map((s) => [
          <span className="font-semibold">{s.name}</span>,
          s.area,
          <StatusBadge tone={tone[s.status]}>{s.status}</StatusBadge>,
          s.status === "pending" ? (
            <div className="flex justify-end gap-2">
              <Button size="sm" variant="outline" disabled>Reject</Button>
              <Button size="sm" disabled>Approve</Button>
            </div>
          ) : null,
        ])}
      />
    </DashboardShell>
  );
}
