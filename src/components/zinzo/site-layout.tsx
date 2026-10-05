import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Compass, Heart, Home, LayoutGrid, Map } from "lucide-react";
import { PageContainer } from "./primitives";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={`font-display text-xl font-black tracking-tight ${className}`}>
      ZINZO<span className="text-brand">.</span>
    </Link>
  );
}

const nav = [
  { to: "/", label: "Home", icon: Home },
  { to: "/shops", label: "Shops", icon: Compass },
  { to: "/categories", label: "Categories", icon: LayoutGrid },
  { to: "/map", label: "Nearby", icon: Map },
  { to: "/favorites", label: "Saved", icon: Heart },
] as const;

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col pb-16 md:pb-0">
      <header className="sticky top-0 z-30 border-b bg-background/95 backdrop-blur">
        <PageContainer className="flex h-14 items-center justify-between gap-6">
          <Logo />
          <nav className="hidden items-center gap-6 md:flex" aria-label="Main">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                activeOptions={{ exact: n.to === "/" }}
                className="text-sm font-medium text-muted-foreground hover:text-foreground"
                activeProps={{ className: "text-foreground" }}
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <Link to="/merchant/signup" className="text-xs font-semibold underline-offset-4 hover:underline md:text-sm">
            List your shop
          </Link>
        </PageContainer>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="hidden border-t py-8 md:block">
        <PageContainer className="flex items-center justify-between text-xs text-muted-foreground">
          <span>ZINZO · Local fashion, Kota</span>
          <div className="flex gap-4">
            <Link to="/merchant/login" className="hover:text-foreground">Merchant login</Link>
            <Link to="/admin/login" className="hover:text-foreground">Admin</Link>
          </div>
        </PageContainer>
      </footer>
      <MobileNav />
    </div>
  );
}

function MobileNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 border-t bg-background md:hidden" aria-label="Mobile">
      <ul className="grid grid-cols-5">
        {nav.map((n) => (
          <li key={n.to}>
            <Link
              to={n.to}
              activeOptions={{ exact: n.to === "/" }}
              className="flex h-16 flex-col items-center justify-center gap-1 text-[11px] font-medium text-muted-foreground"
              activeProps={{ className: "text-foreground [&_svg]:text-brand" }}
            >
              <n.icon className="size-5" />
              {n.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function PageHeader({ title, subtitle, children }: { title: string; subtitle?: string; children?: ReactNode }) {
  return (
    <div className="border-b">
      <PageContainer className="py-6 md:py-10">
        <h1 className="text-2xl font-black md:text-4xl">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
        {children && <div className="mt-4">{children}</div>}
      </PageContainer>
    </div>
  );
}
