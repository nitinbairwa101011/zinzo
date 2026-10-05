import { useState, type FormEvent } from "react";
import { useNavigate } from "@tanstack/react-router";
import { MapPin, Navigation, Search, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useUserLocation } from "@/hooks/use-user-location";
import { listCategories } from "@/lib/catalog";
import type { ProductFilters, SortKey } from "@/types/models";
import { cn } from "@/lib/utils";

export function SearchBar({ defaultValue = "", size = "md" }: { defaultValue?: string | undefined; size?: "md" | "lg" }) {
  const [q, setQ] = useState(defaultValue);
  const navigate = useNavigate();
  const submit = (e: FormEvent) => {
    e.preventDefault();
    navigate({ to: "/search", search: (prev) => ({ ...prev, q: q.trim() || undefined }) });
  };
  return (
    <form onSubmit={submit} role="search" className="relative w-full">
      <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder='Try "black shirt", "kurti", "lehenga"'
        aria-label="Search products in Kota"
        className={cn(
          "w-full rounded-md border border-input bg-background pl-9 pr-3 text-sm outline-none placeholder:text-muted-foreground focus:border-brand focus:ring-2 focus:ring-brand/20",
          size === "lg" ? "h-12" : "h-10",
        )}
      />
    </form>
  );
}

export function LocationSelector() {
  const { city, status, requestLocation } = useUserLocation();
  return (
    <div className="flex items-center gap-2 text-sm">
      <MapPin className="size-4 text-brand" />
      <span className="font-semibold">{city}</span>
      <span className="text-muted-foreground">·</span>
      {status === "granted" ? (
        <span className="text-muted-foreground">Using your location</span>
      ) : (
        <button
          onClick={requestLocation}
          className="inline-flex items-center gap-1 text-muted-foreground underline-offset-2 hover:text-foreground hover:underline"
        >
          <Navigation className="size-3" />
          {status === "requesting" ? "Locating…" : status === "denied" ? "Location off — showing all Kota" : "Use my location"}
        </button>
      )}
    </div>
  );
}

const sortLabels: Record<SortKey, string> = {
  relevance: "Relevance",
  price_asc: "Price: Low → High",
  price_desc: "Price: High → Low",
  nearest: "Nearest",
};

export function SortControl({ value, onChange }: { value: SortKey; onChange: (v: SortKey) => void }) {
  return (
    <label className="flex items-center gap-2 text-sm">
      <span className="text-muted-foreground">Sort</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as SortKey)}
        className="h-9 rounded-md border border-input bg-background px-2 text-sm font-medium"
      >
        {(Object.keys(sortLabels) as SortKey[]).map((k) => (
          <option key={k} value={k}>{sortLabels[k]}</option>
        ))}
      </select>
    </label>
  );
}

function Chip({ active, children, onClick }: { active?: boolean; children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "h-8 rounded-full border px-3 text-xs font-semibold transition-colors",
        active ? "border-foreground bg-foreground text-background" : "hover:border-foreground",
      )}
    >
      {children}
    </button>
  );
}

export function FilterPanel({ value, onChange }: { value: ProductFilters; onChange: (f: ProductFilters) => void }) {
  const set = (patch: Partial<ProductFilters>) => onChange({ ...value, ...patch });
  const body = (
    <div className="space-y-6">
      <fieldset>
        <legend className="eyebrow mb-2">Category</legend>
        <div className="flex flex-wrap gap-2">
          <Chip active={!value.categoryId} onClick={() => set({ categoryId: undefined })}>All</Chip>
          {listCategories().map((c) => (
            <Chip key={c.id} active={value.categoryId === c.id} onClick={() => set({ categoryId: c.id })}>{c.name}</Chip>
          ))}
        </div>
      </fieldset>
      <fieldset>
        <legend className="eyebrow mb-2">Distance</legend>
        <div className="flex flex-wrap gap-2">
          {[undefined, 2, 5, 10].map((d) => (
            <Chip key={String(d)} active={value.maxDistanceKm === d} onClick={() => set({ maxDistanceKm: d })}>
              {d ? `Within ${d} km` : "Anywhere in Kota"}
            </Chip>
          ))}
        </div>
      </fieldset>
      <fieldset>
        <legend className="eyebrow mb-2">Price</legend>
        <div className="flex flex-wrap gap-2">
          {[[undefined, undefined, "Any"], [0, 999, "Under ₹1,000"], [1000, 2999, "₹1,000–3,000"], [3000, undefined, "₹3,000+"]].map(([min, max, label]) => (
            <Chip
              key={String(label)}
              active={value.minPrice === min && value.maxPrice === max}
              onClick={() => set({ minPrice: min as number | undefined, maxPrice: max as number | undefined })}
            >
              {label}
            </Chip>
          ))}
        </div>
      </fieldset>
      <fieldset>
        <legend className="eyebrow mb-2">Availability</legend>
        <div className="flex gap-2">
          <Chip active={!value.availability} onClick={() => set({ availability: undefined })}>All</Chip>
          <Chip active={value.availability === "in_stock"} onClick={() => set({ availability: "in_stock" })}>In stock</Chip>
        </div>
      </fieldset>
      <p className="text-xs text-muted-foreground">Size, colour and subcategory filters arrive with real catalogue data.</p>
    </div>
  );
  return (
    <>
      <aside className="hidden w-64 shrink-0 md:block">{body}</aside>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="sm" className="md:hidden">
            <SlidersHorizontal /> Filters
          </Button>
        </SheetTrigger>
        <SheetContent side="bottom" className="max-h-[85vh] overflow-y-auto">
          <SheetHeader><SheetTitle>Filters</SheetTitle></SheetHeader>
          <div className="px-4 pb-6">{body}</div>
        </SheetContent>
      </Sheet>
    </>
  );
}
