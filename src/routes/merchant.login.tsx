import { createFileRoute } from "@tanstack/react-router";
import { AuthCard } from "@/components/zinzo/dashboard-shell";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/merchant/login")({
  head: () => pageMeta("Merchant sign in", "Sign in to manage your shop on ZINZO."),
  component: () => <AuthCard role="merchant" mode="login" />,
});
