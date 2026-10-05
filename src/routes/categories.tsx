import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageHeader, SiteLayout } from "@/components/zinzo/site-layout";
import { PageContainer } from "@/components/zinzo/primitives";
import { listCategories } from "@/lib/catalog";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/categories")({
  head: () => pageMeta("Fashion categories", "Browse men's, women's, ethnic, kids' wear and more from shops in Kota."),
  component: CategoriesPage,
});

function CategoriesPage() {
  return (
    <SiteLayout>
      <PageHeader title="Categories" subtitle="Fashion & clothing" />
      <PageContainer className="py-6">
        <ul className="divide-y border-y">
          {listCategories().map((c) => (
            <li key={c.id}>
              <Link to="/search" search={{ category: c.id }} className="flex items-center justify-between py-5 hover:text-brand">
                <span className="font-display text-xl font-bold md:text-2xl">{c.name}</span>
                <ArrowRight className="size-5" />
              </Link>
            </li>
          ))}
        </ul>
      </PageContainer>
    </SiteLayout>
  );
}
