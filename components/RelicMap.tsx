"use client";

import { useEffect, useRef } from "react";
import type { GeoSite } from "@/lib/types";
import "leaflet/dist/leaflet.css";

export function RelicMap({ sites, selected }: { sites: GeoSite[]; selected?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let map: import("leaflet").Map | undefined;
    let cancelled = false;

    (async () => {
      const leaflet = await import("leaflet");
      const L = leaflet.default;
      if (cancelled || !ref.current) return;
      const focus = sites.find((s) => s.id === selected) ?? sites[0];
      map = L.map(ref.current, { scrollWheelZoom: false }).setView(
        [focus?.lat ?? 36.5, focus?.lng ?? 28],
        selected ? 7 : 5,
      );
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
        maxZoom: 18,
      }).addTo(map);
      sites.forEach((site) => {
        L.circleMarker([site.lat, site.lng], {
          radius: site.id === selected ? 11 : 7,
          color: site.id === selected ? "#f4c84a" : "#20f6ff",
          weight: 2,
          fillColor: "#ff3ad7",
          fillOpacity: 0.55,
        })
          .addTo(map!)
          .bindPopup(
            `<div style="font-family:serif;min-width:160px"><strong>${site.name}</strong><p>${site.summary}</p></div>`,
          );
      });
    })();

    return () => {
      cancelled = true;
      map?.remove();
    };
  }, [sites, selected]);

  return <div ref={ref} className="h-[420px] w-full overflow-hidden rounded-2xl border border-signal/20" />;
}
