import type { ReactNode } from "react";
import { AlertTriangle, Loader2, PackageOpen } from "lucide-react";
import { cn } from "@/lib/utils";

export function PageContainer({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mx-auto w-full max-w-6xl px-4 md:px-8", className)}>{children}</div>;
}

export function SectionHeader({ eyebrow, title, action }: { eyebrow?: string; title: string; action?: ReactNode }) {
  return (
    <div className="mb-4 flex items-end justify-between gap-4">
      <div>
        {eyebrow && <p className="eyebrow mb-1">{eyebrow}</p>}
        <h2 className="text-xl font-bold md:text-2xl">{title}</h2>
      </div>
      {action}
    </div>
  );
}

type Tone = "neutral" | "brand" | "success" | "warning" | "danger" | "inverse";
const tones: Record<Tone, string> = {
  neutral: "bg-muted text-muted-foreground",
  brand: "bg-brand-soft text-brand",
  success: "bg-success-soft text-success",
  warning: "bg-warning-soft text-warning",
  danger: "bg-destructive/10 text-destructive",
  inverse: "bg-inverse text-inverse-foreground",
};
export function StatusBadge({ tone = "neutral", children }: { tone?: Tone; children: ReactNode }) {
  return (
    <span className={cn("inline-flex h-5 items-center rounded-sm px-1.5 text-[11px] font-semibold", tones[tone])}>
      {children}
    </span>
  );
}

export function ImagePlaceholder({ label, className }: { label?: string; className?: string }) {
  return (
    <div className={cn("placeholder-pattern flex items-center justify-center", className)} aria-hidden>
      {label && <span className="font-display text-2xl font-black text-muted-foreground/60">{label}</span>}
    </div>
  );
}

export function initials(name: string) {
  return name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();
}

export function EmptyState({ title, description, action }: { title: string; description?: string; action?: ReactNode }) {
  return (
    <div className="flex flex-col items-center rounded-md border border-dashed px-6 py-12 text-center">
      <PackageOpen className="mb-3 size-6 text-muted-foreground" />
      <p className="font-display font-bold">{title}</p>
      {description && <p className="mt-1 max-w-sm text-sm text-muted-foreground">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

export function LoadingState({ label = "Loading" }: { label?: string }) {
  return (
    <div className="flex items-center justify-center gap-2 py-12 text-sm text-muted-foreground" role="status">
      <Loader2 className="size-4 animate-spin" /> {label}
    </div>
  );
}

export function ErrorState({ title = "Something went wrong", description }: { title?: string; description?: string }) {
  return (
    <div className="flex flex-col items-center rounded-md border border-destructive/30 px-6 py-12 text-center">
      <AlertTriangle className="mb-3 size-6 text-destructive" />
      <p className="font-display font-bold">{title}</p>
      {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
    </div>
  );
}

export function FoundationNote({ children }: { children: ReactNode }) {
  return (
    <p className="rounded-md border border-dashed bg-muted/50 px-3 py-2 text-xs text-muted-foreground">{children}</p>
  );
}
