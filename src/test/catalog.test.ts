import { describe, expect, it } from "vitest";
import { getShop, listPublicShops, searchProducts } from "@/lib/catalog";

describe("catalog rules", () => {
  it("hides shops that are not approved", () => {
    expect(listPublicShops().every((s) => s.status === "approved")).toBe(true);
    expect(getShop("demo-shop-3")).toBeNull();
  });
  it("sorts price low to high", () => {
    const prices = searchProducts({ sort: "price_asc" }).map((p) => p.price);
    expect(prices).toEqual([...prices].sort((a, b) => a - b));
  });
  it("filters to in-stock only", () => {
    expect(searchProducts({ filters: { availability: "in_stock" } }).some((p) => p.availability === "out_of_stock")).toBe(false);
  });
});
