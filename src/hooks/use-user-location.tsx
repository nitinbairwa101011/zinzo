import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import type { GeoPoint } from "@/types/models";

type Status = "idle" | "requesting" | "granted" | "denied" | "unsupported";

interface LocationState {
  city: string;
  coords: GeoPoint | null;
  status: Status;
  /** Only call from an explicit user action — never on page load. */
  requestLocation: () => void;
}

const LocationContext = createContext<LocationState | null>(null);

export function LocationProvider({ children }: { children: ReactNode }) {
  const [coords, setCoords] = useState<GeoPoint | null>(null);
  const [status, setStatus] = useState<Status>("idle");

  const requestLocation = useCallback(() => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      setStatus("unsupported");
      return;
    }
    setStatus("requesting");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setStatus("granted");
      },
      () => setStatus("denied"),
      { timeout: 10000 },
    );
  }, []);

  return (
    <LocationContext.Provider value={{ city: "Kota", coords, status, requestLocation }}>
      {children}
    </LocationContext.Provider>
  );
}

export function useUserLocation() {
  const ctx = useContext(LocationContext);
  if (!ctx) throw new Error("useUserLocation must be used inside LocationProvider");
  return ctx;
}
