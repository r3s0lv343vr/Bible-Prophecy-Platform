"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { EXPEDITIONS } from "@/content/expeditions";
import { MAP_LAYOUT } from "@/content/map-layout";
import { canAccess, nextOpenId, nodeVisibility } from "@/lib/progress";
import { useProgress } from "./ProgressProvider";

const VB = { w: 1000, h: 620 };

export function ProphecyMap() {
  const { progress } = useProgress();
  const currentId = nextOpenId(progress.completed);
  const [selectedId, setSelectedId] = useState(currentId);

  const nodes = useMemo(
    () =>
      EXPEDITIONS.map((item) => ({
        item,
        layout: MAP_LAYOUT[item.id],
        vis: nodeVisibility(
          item.sequence,
          item.id,
          item.prerequisites,
          progress.completed,
          progress.lastExpeditionId,
        ),
      })),
    [progress.completed, progress.lastExpeditionId],
  );

  const visible = nodes.filter((node) => node.layout && node.vis !== "fog");
  const known = visible.filter(
    (node) => node.vis === "known" || node.vis === "current" || node.vis === "open",
  );
  const selected =
    visible.find((node) => node.item.id === selectedId) ??
    visible.find((node) => node.item.id === currentId) ??
    visible[0];
  const travelOpen = selected
    ? canAccess(selected.item.id, selected.item.prerequisites, progress.completed)
    : false;

  return (
    <div className="space-y-5">
      <div>
        <p className="text-[10px] uppercase tracking-[0.32em] text-gold">Expedition map</p>
        <h1 className="mt-2 font-display text-3xl text-[#f7ecd4] md:text-4xl">Known country</h1>
        <p className="mt-2 max-w-2xl text-sm leading-7 text-parchment/75">
          Marks are buttons. Names live in the field notes beside the chart — never crowded onto the
          paper. Later country stays in fog on purpose.
        </p>
      </div>

      <div className="grid items-start gap-4 lg:grid-cols-[minmax(280px,360px)_minmax(0,1fr)]">
        <aside className="order-2 rounded-[1.5rem] border border-gold/25 bg-[#120d08] p-5 lg:order-1 lg:sticky lg:top-20">
          {!selected ? (
            <p className="text-sm text-parchment/70">The chart is still dark.</p>
          ) : selected.vis === "silhouette" ? (
            <>
              <p className="text-[10px] uppercase tracking-[0.24em] text-plasma">A shape on the horizon</p>
              <h2 className="mt-2 font-display text-3xl leading-tight text-[#f7ecd4]">
                {selected.layout.land}
              </h2>
              <p className="mt-4 text-base leading-8 text-parchment/80">
                You can feel a destination forming, but the name is still sealed. Finish the ground
                under your feet.
              </p>
            </>
          ) : (
            <>
              <p className="text-[10px] uppercase tracking-[0.24em] text-gold">{selected.layout.land}</p>
              <h2 className="mt-2 font-display text-4xl leading-tight text-[#f7ecd4]">
                {selected.layout.place}
              </h2>
              <p className="mt-4 text-lg leading-8 text-signal">{selected.item.openingQuestion}</p>
              <p className="mt-4 text-base leading-8 text-parchment/85">{selected.item.overview}</p>
              {travelOpen ? (
                <Link
                  href={`/expedition/${selected.item.id}`}
                  className="mt-6 inline-flex min-h-12 items-center rounded-full bg-gold px-6 py-3 text-xs uppercase tracking-[0.22em] text-black"
                >
                  Travel here
                </Link>
              ) : (
                <p className="mt-6 text-base leading-7 text-parchment/60">
                  This shore opens after earlier ground is walked.
                </p>
              )}
            </>
          )}

          <div className="mt-8 border-t border-white/10 pt-4">
            <p className="text-[10px] uppercase tracking-[0.2em] text-parchment/50">Known places</p>
            <ul className="mt-3 space-y-1">
              {known.map(({ item, layout, vis }) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => setSelectedId(item.id)}
                    className={`block min-h-11 w-full rounded-lg px-3 py-2 text-left text-base leading-6 ${
                      selected?.item.id === item.id ? "bg-gold/15 text-gold" : "text-parchment/85 hover:bg-white/5"
                    }`}
                  >
                    {layout.place}
                    {vis === "current" ? " · you are here" : vis === "known" ? " · walked" : " · open"}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <div className="order-1 lg:order-2">
          <div className="map-sheet relative overflow-hidden rounded-[1.5rem] border border-gold/25">
            <svg
              viewBox={`0 0 ${VB.w} ${VB.h}`}
              className="pointer-events-none h-auto w-full"
              aria-hidden="true"
            >
              <defs>
                <radialGradient id="fog" cx="70%" cy="30%" r="70%">
                  <stop offset="0%" stopColor="#1a140c" stopOpacity="0.12" />
                  <stop offset="100%" stopColor="#07060a" stopOpacity="0.9" />
                </radialGradient>
                <linearGradient id="sea" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#16323a" />
                  <stop offset="100%" stopColor="#0b1c22" />
                </linearGradient>
              </defs>
              <rect width={VB.w} height={VB.h} fill="url(#sea)" />
              <path
                d="M40 420 C 120 360, 180 390, 250 350 C 340 300, 410 330, 500 290 C 620 240, 740 280, 900 220 L 980 620 L 20 620 Z"
                fill="#2a2116"
                opacity="0.85"
              />
              <path d="M80 470 C 140 450, 170 480, 210 455 C 190 500, 120 510, 80 470" fill="#3a2f20" />
              <circle cx="148" cy="408" r="22" fill="#4a3b26" />
              <text x="40" y="40" fill="#ead7b0" fontSize="14" letterSpacing="4">
                AEGEAN · ASIA · THE UNSEEN
              </text>
              <rect width={VB.w} height={VB.h} fill="url(#fog)" />
              {visible.map(({ item, layout, vis }, index) => {
                const prev = visible[index - 1];
                if (!prev?.layout) return null;
                return (
                  <line
                    key={`line-${item.id}`}
                    x1={prev.layout.x}
                    y1={prev.layout.y}
                    x2={layout.x}
                    y2={layout.y}
                    stroke={vis === "silhouette" ? "rgba(234,215,176,0.18)" : "#f4c84a"}
                    strokeWidth={vis === "current" ? 3 : 1.5}
                    strokeDasharray={vis === "open" || vis === "current" ? "6 6" : "2 8"}
                  />
                );
              })}
            </svg>

            {visible.map(({ item, layout, vis }) => {
              const active = selected?.item.id === item.id;
              const label = vis === "silhouette" ? "Unknown shore" : layout.place;
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={active}
                  aria-label={`${label}${vis === "current" ? ", you are here" : ""}`}
                  title={label}
                  onClick={() => setSelectedId(item.id)}
                  className={`group absolute z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center outline-none ${
                    vis === "current" ? "pulse-dot" : ""
                  }`}
                  style={{
                    left: `${(layout.x / VB.w) * 100}%`,
                    top: `${(layout.y / VB.h) * 100}%`,
                  }}
                >
                  <span
                    className={`block rounded-full border-2 ${
                      vis === "silhouette"
                        ? "h-7 w-7 border-[#ead7b0]/40 bg-[#1b1712]"
                        : vis === "known"
                          ? "h-8 w-8 border-[#f7ecd4] bg-gold"
                          : "h-9 w-9 border-[#f7ecd4] bg-signal"
                    } ${active ? "ring-4 ring-gold/50" : "group-hover:ring-4 group-hover:ring-gold/30 group-focus-visible:ring-4 group-focus-visible:ring-gold"}`}
                  />
                </button>
              );
            })}

            <p className="pointer-events-none absolute bottom-3 left-4 text-[10px] uppercase tracking-[0.2em] text-parchment/55">
              Tap a mark · read the notes · travel
            </p>
          </div>
          <div className="mt-3 flex flex-wrap gap-4 text-[11px] uppercase tracking-[0.16em] text-parchment/55">
            <span className="inline-flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-signal" /> You are here
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-gold" /> Walked
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="h-3 w-3 rounded-full border border-[#ead7b0]/40 bg-[#1b1712]" /> Horizon
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
