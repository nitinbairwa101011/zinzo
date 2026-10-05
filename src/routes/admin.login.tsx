import { createFileRoute } from "@tanstack/react-router";
import { AuthCard } from "@/components/zinzo/dashboard-shell";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/admin/login")({
  head: () => pageMeta("Admin sign in", "ZINZO admin access."),
  component: () => <AuthCard role="admin" mode="login" />,
});
