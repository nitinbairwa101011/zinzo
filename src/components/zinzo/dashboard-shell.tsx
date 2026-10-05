import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Logo } from "./site-layout";
import { FoundationNote, PageContainer } from "./primitives";

type Role = "merchant" | "admin";

const navs: Record<Role, { to: string; label: string }[]> = {
  merchant: [
    { to: "/merchant/dashboard", label: "Dashboard" },
    { to: "/merchant/shop", label: "My shops" },
    { to: "/merchant/products", label: "Products" },
  ],
  admin: [
    { to: "/admin/dashboard", label: "Dashboard" },
    { to: "/admin/shops", label: "Shop approvals" },
    { to: "/admin/merchants", label: "Merchants" },
    { to: "/admin/products", label: "Products" },
    { to: "/admin/categories", label: "Categories" },
  ],
};

export function DashboardShell({ role, title, actions, children }: { role: Role; title: string; actions?: ReactNode; children: ReactNode }) {
  return (
    <div className="min-h-screen bg-muted/40">
      <header className="border-b bg-inverse text-inverse-foreground">
        <PageContainer className="flex h-14 items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo />
            <span className="rounded-sm border border-inverse-foreground/30 px-1.5 text-[10px] font-bold uppercase tracking-widest">
              {role}
            </span>
          </div>
          <Link to="/" className="text-xs opacity-70 hover:opacity-100">View site</Link>
        </PageContainer>
        <PageContainer>
          <nav className="no-scrollbar -mb-px flex gap-5 overflow-x-auto">
            {navs[role].map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="whitespace-nowrap border-b-2 border-transparent py-3 text-sm opacity-70 hover:opacity-100"
                activeProps={{ className: "border-brand opacity-100" }}
              >
                {n.label}
              </Link>
            ))}
          </nav>
        </PageContainer>
      </header>
      <PageContainer className="py-6 md:py-8">
        <div className="mb-6 flex items-center justify-between gap-4">
          <h1 className="text-2xl font-black">{title}</h1>
          {actions}
        </div>
        <div className="space-y-6">{children}</div>
        <div className="mt-8">
          <FoundationNote>Foundation preview — sign-in and data management connect in the next phase.</FoundationNote>
        </div>
      </PageContainer>
    </div>
  );
}

export function StatTile({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-md border bg-card p-4">
      <p className="eyebrow">{label}</p>
      <p className="mt-2 font-display text-3xl font-black">{value}</p>
    </div>
  );
}

export function DataTable({ head, rows }: { head: string[]; rows: ReactNode[][] }) {
  return (
    <div className="overflow-x-auto rounded-md border bg-card">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b text-left">
            {head.map((h) => <th key={h} className="eyebrow px-4 py-3">{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-b last:border-0">
              {r.map((c, j) => <td key={j} className="px-4 py-3">{c}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function AuthCard({ role, mode }: { role: Role; mode: "login" | "signup" }) {
  const title = mode === "login" ? `${role === "admin" ? "Admin" : "Merchant"} sign in` : "List your shop on ZINZO";
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/40 px-4">
      <Logo className="mb-8 text-2xl" />
      <div className="w-full max-w-sm rounded-md border bg-card p-6">
        <h1 className="text-xl font-black">{title}</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {mode === "signup" ? "Sign up, add your shop and products, and go live after approval." : "Use your registered phone number."}
        </p>
        <form className="mt-6 space-y-3" onSubmit={(e) => e.preventDefault()}>
          {mode === "signup" && <Field label="Your name" />}
          <Field label="Phone number" type="tel" />
          <Field label="Password" type="password" />
          <button disabled className="h-11 w-full rounded-md bg-primary text-sm font-semibold text-primary-foreground opacity-60">
            {mode === "login" ? "Sign in" : "Create account"}
          </button>
        </form>
        <p className="mt-4 text-xs text-muted-foreground">Accounts open in the next phase.</p>
        {role === "merchant" && (
          <p className="mt-4 text-sm">
            {mode === "login" ? (
              <Link to="/merchant/signup" className="font-semibold text-brand">New merchant? Sign up</Link>
            ) : (
              <Link to="/merchant/login" className="font-semibold text-brand">Already listed? Sign in</Link>
            )}
          </p>
        )}
      </div>
    </div>
  );
}

function Field({ label, type = "text" }: { label: string; type?: string }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold">{label}</span>
      <input type={type} className="h-10 w-full rounded-md border border-input px-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20" />
    </label>
  );
}
