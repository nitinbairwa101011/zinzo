import { createFileRoute, Link } from "@tanstack/react-router";
import { DashboardShell, StatTile } from "@/components/zinzo/dashboard-shell";
import { Button } from "@/components/ui/button";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/merchant/dashboard")({
  head: () => pageMeta("Merchant dashboard", "Overview of your shops and products on ZINZO."),
  component: Page,
});

const steps = ["Create your account", "Add your shop details", "Add products with price and photo", "Submit for review", "Go live on ZINZO"];

function Page() {
  return (
    <DashboardShell role="merchant" title="Dashboard" actions={<Button asChild variant="brand" size="sm"><Link to="/merchant/shop">Add shop</Link></Button>}>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatTile label="Shops" value={0} />
        <StatTile label="Products" value={0} />
        <StatTile label="Pending review" value={0} />
        <StatTile label="Live" value={0} />
      </div>
      <div className="rounded-md border bg-card p-5">
        <p className="eyebrow mb-3">Getting listed</p>
        <ol className="space-y-2 text-sm">
          {steps.map((s, i) => (
            <li key={s} className="flex items-center gap-3">
              <span className="flex size-6 items-center justify-center rounded-full border text-xs font-bold">{i + 1}</span>{s}
            </li>
          ))}
        </ol>
      </div>
    </DashboardShell>
  );
}
