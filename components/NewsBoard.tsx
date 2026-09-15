"use client";

import { useEffect, useState } from "react";
import type { NewsItem } from "@/lib/news";
import { SignalFrame } from "./SignalFrame";

export function NewsBoard() {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/news")
      .then((res) => res.json())
      .then((data) => setItems(data.items ?? []))
      .catch(() => setError("Live feeds are currently unreachable from this node."));
  }, []);

  return (
    <div className="space-y-5">
      <div>
        <p className="neon-title text-[11px]">World signal</p>
        <h1 className="mt-2 font-display text-3xl text-white">Real events, for research — not for panic charts.</h1>
        <p className="mt-2 max-w-2xl text-sm leading-7 text-parchment/75">
          Adventist Review, world desks, and archaeology feeds. Headlines can illustrate liberty,
          ruins, and public worship. They do not replace the Decoder.
        </p>
      </div>
      {error ? <p className="text-danger text-sm">{error}</p> : null}
      <div className="grid gap-4 md:grid-cols-2">
        {items.map((item) => (
          <SignalFrame key={item.link + item.title} className="p-5">
            <p className="text-[10px] uppercase tracking-[0.18em] text-gold">
              {item.source}
              {item.topic ? ` · ${item.topic}` : ""}
            </p>
            <h2 className="mt-2 font-display text-xl text-white">{item.title}</h2>
            {item.summary ? <p className="mt-2 text-sm leading-6 text-parchment/75">{item.summary}</p> : null}
            <a href={item.link} target="_blank" rel="noreferrer" className="mt-3 inline-block text-xs text-signal">
              Open original
            </a>
          </SignalFrame>
        ))}
      </div>
    </div>
  );
}
