import { MessageCircle, Navigation, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { directionsUrl } from "@/lib/geo";
import type { Shop } from "@/types/models";

/** Call / WhatsApp / Directions — the core ZINZO conversion actions. */
export function ContactActions({ shop, message }: { shop: Shop; message?: string }) {
  const wa = shop.whatsapp?.replace(/\D/g, "");
  return (
    <div className="grid grid-cols-3 gap-2">
      <Button asChild variant="default" size="lg" disabled={!shop.phone}>
        <a href={shop.phone ? `tel:${shop.phone}` : undefined} aria-disabled={!shop.phone}>
          <Phone /> Call
        </a>
      </Button>
      <Button asChild variant="outline" size="lg">
        <a
          href={wa ? `https://wa.me/${wa}${message ? `?text=${encodeURIComponent(message)}` : ""}` : undefined}
          aria-disabled={!wa}
          target="_blank"
          rel="noreferrer"
        >
          <MessageCircle /> WhatsApp
        </a>
      </Button>
      <Button asChild variant="brand" size="lg">
        <a href={directionsUrl(shop.location, `${shop.name} ${shop.area} Kota`)} target="_blank" rel="noreferrer">
          <Navigation /> Directions
        </a>
      </Button>
    </div>
  );
}
