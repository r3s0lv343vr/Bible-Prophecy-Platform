"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export type NewsItem = {
  title: string;
  link: string;
  source: string;
  published?: string;
  topic?: string;
};

export function NewsTicker() {
  const [items, setItems] = useState<NewsItem[]>([]);

  useEffect(() => {
    let active = true;
    fetch("/api/news")
      .then((res) => res.json())
      .then((data) => {
        if (active && Array.isArray(data.items)) setItems(data.items.slice(0, 16));
      })
      .catch(() => {
        if (active) setItems([]);
      });
    return () => {
      active = false;
    };
  }, []);

  const feed = items.length
    ? items
    : [
        {
          title: "Signal channels initializing — open the news chamber for a full briefing",
          link: "/news",
          source: "archive",
        },
      ];

  const loop = [...feed, ...feed];

  return (
    <div className="relative flex min-w-0 flex-1 items-center overflow-hidden border-l border-signal/20">
      <div className="marquee-track flex w-max gap-10 whitespace-nowrap px-4 text-[11px] uppercase tracking-[0.18em] text-signal/80">
        {loop.map((item, index) => {
          const href = item.link || "/news";
          const className = "hover:text-gold";
          const inner = (
            <>
              <span className="mr-2 text-plasma/80">{item.source}</span>
              {item.title}
            </>
          );
          return href.startsWith("http") ? (
            <a key={`${item.link}-${index}`} href={href} target="_blank" rel="noreferrer" className={className}>
              {inner}
            </a>
          ) : (
            <Link key={`${item.link}-${index}`} href={href} className={className}>
              {inner}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
