"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { SITES } from "@/content/sites";
import type { Relic } from "@/lib/relics";
import { RelicMap } from "./RelicMap";
import { SignalFrame } from "./SignalFrame";

const QUERIES = [
  "cuneiform tablet",
  "assyrian relief",
  "byzantine icon",
  "roman lamp",
  "ancient israel",
  "egyptian stele",
  "early christian",
];

export function RelicGallery() {
  const params = useSearchParams();
  const siteId = params.get("site") ?? undefined;
  const [query, setQuery] = useState(QUERIES[4]);
  const [objects, setObjects] = useState<Relic[]>([]);
  const [sites, setSites] = useState<Relic[]>([]);
  const [status, setStatus] = useState("Listening to museum archives...");

  useEffect(() => {
    let active = true;
    fetch(`/api/relics?q=${encodeURIComponent(query)}${siteId ? `&site=${siteId}` : ""}`)
      .then((res) => res.json())
      .then((data) => {
        if (!active) return;
        setObjects(data.objects ?? []);
        setSites(data.sites ?? []);
        setStatus(
          data.objects?.length
            ? "Open-access objects and site photographs loaded."
            : "Museum channels were quiet. Site dossiers still available.",
        );
      })
      .catch(() => {
        if (active) setStatus("Transmission delayed. Try another search term.");
      });
    return () => {
      active = false;
    };
  }, [query, siteId]);

  return (
    <div className="space-y-5">
      <div>
        <p className="neon-title text-[11px]">Relics and ruins</p>
        <h1 className="mt-2 font-display text-3xl text-white">Earth still keeps the furniture of the story.</h1>
        <p className="mt-2 max-w-2xl text-sm leading-7 text-parchment/75">
          Free APIs: Metropolitan Museum of Art, Cleveland Museum of Art, Wikipedia/Wikimedia site
          images, OpenStreetMap. Objects are historical witnesses, not magic proofs.
        </p>
      </div>
      <RelicMap sites={SITES} selected={siteId} />
      <div className="flex flex-wrap gap-2">
        {QUERIES.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setQuery(item)}
            className={`rounded-full border px-3 py-1 text-xs ${query === item ? "border-gold text-gold" : "border-white/15 text-white/60"}`}
          >
            {item}
          </button>
        ))}
      </div>
      <p className="text-xs uppercase tracking-[0.16em] text-signal">{status}</p>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {sites.map((item) => (
          <Card key={item.id} relic={item} />
        ))}
        {objects.map((item) => (
          <Card key={item.id} relic={item} />
        ))}
      </div>
    </div>
  );
}

function Card({ relic }: { relic: Relic }) {
  return (
    <SignalFrame className="overflow-hidden">
      {relic.image ? (
        // External museum/wiki images vary by CDN; native img keeps the gallery resilient.
        // eslint-disable-next-line @next/next/no-img-element
        <img src={relic.image} alt={relic.title} className="h-48 w-full object-cover" />
      ) : (
        <div className="flex h-48 items-center justify-center bg-white/5 text-signal/50">No still recovered</div>
      )}
      <div className="p-4">
        <p className="text-[10px] uppercase tracking-[0.16em] text-plasma">
          {relic.source} · {relic.kind}
        </p>
        <h3 className="mt-1 font-display text-lg text-white">{relic.title}</h3>
        <p className="mt-1 text-xs text-parchment/70">
          {[relic.date, relic.culture].filter(Boolean).join(" · ")}
        </p>
        <a href={relic.url} target="_blank" rel="noreferrer" className="mt-3 inline-block text-xs text-signal">
          Open source record
        </a>
      </div>
    </SignalFrame>
  );
}
