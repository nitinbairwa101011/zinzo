import { createFileRoute } from "@tanstack/react-router";
import { AuthCard } from "@/components/zinzo/dashboard-shell";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/merchant/signup")({
  head: () => pageMeta("List your shop", "List your Kota fashion shop on ZINZO for free."),
  component: () => <AuthCard role="merchant" mode="signup" />,
});
