"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { EXPEDITIONS } from "@/content/expeditions";
import { MAP_LAYOUT } from "@/content/map-layout";
import { canAccess, nextOpenId, nodeVisibility } from "@/lib/progress";
import { useProgress } from "./ProgressProvider";

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

  const selected = nodes.find((node) => node.item.id === selectedId) ?? nodes[0];
  const travelOpen = canAccess(
    selected.item.id,
    selected.item.prerequisites,
    progress.completed,
  );
  const known = nodes.filter((node) => node.vis === "known" || node.vis === "current" || node.vis === "open");

  return (
    <div className="space-y-5">
      <div>
        <p className="text-[10px] uppercase tracking-[0.32em] text-gold">Expedition map</p>
        <h1 className="mt-2 font-display text-3xl text-[#f7ecd4] md:text-4xl">Known country</h1>
        <p className="mt-2 max-w-2xl text-sm leading-7 text-parchment/75">
          Only the ground you have walked — and the next shore — is named. Click a mark. Read it here.
          Then travel. The rest of the world stays in fog on purpose.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="map-sheet relative overflow-hidden rounded-[1.5rem] border border-gold/25">
          <svg viewBox="0 0 1000 620" className="h-auto w-full" role="img" aria-label="Expedition map of known country">
            <defs>
              <radialGradient id="fog" cx="70%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#1a140c" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#07060a" stopOpacity="0.92" />
              </radialGradient>
              <linearGradient id="sea" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#16323a" />
                <stop offset="100%" stopColor="#0b1c22" />
              </linearGradient>
            </defs>
            <rect width="1000" height="620" fill="url(#sea)" />
            <path
              d="M40 420 C 120 360, 180 390, 250 350 C 340 300, 410 330, 500 290 C 620 240, 740 280, 900 220 L 980 620 L 20 620 Z"
              fill="#2a2116"
              opacity="0.85"
            />
            <path
              d="M80 470 C 140 450, 170 480, 210 455 C 190 500, 120 510, 80 470"
              fill="#3a2f20"
            />
            <circle cx="148" cy="408" r="18" fill="#4a3b26" />
            <text x="40" y="40" fill="#ead7b0" fontSize="14" letterSpacing="4">
              AEGEAN · ASIA · THE UNSEEN
            </text>
            <rect width="1000" height="620" fill="url(#fog)" />
            {nodes.map(({ item, layout, vis }, index) => {
              if (!layout || vis === "fog") return null;
              const prev = nodes[index - 1];
              if (!prev?.layout) return null;
              if (vis === "silhouette" && prev.vis === "fog") return null;
              if (vis === "known" || vis === "current" || vis === "open" || prev.vis === "known" || prev.vis === "current") {
                return (
                  <line
                    key={`line-${item.id}`}
                    x1={prev.layout.x}
                    y1={prev.layout.y}
                    x2={layout.x}
                    y2={layout.y}
                    stroke={vis === "silhouette" ? "rgba(234,215,176,0.15)" : "#f4c84a"}
                    strokeWidth={vis === "current" ? 3 : 1.5}
                    strokeDasharray={vis === "open" || vis === "current" ? "6 6" : "2 8"}
                  />
                );
              }
              return null;
            })}
            {nodes.map(({ item, layout, vis }) => {
              if (!layout) return null;
              if (vis === "fog") {
                return (
                  <circle key={item.id} cx={layout.x} cy={layout.y} r="4" fill="rgba(234,215,176,0.08)" />
                );
              }
              const active = selectedId === item.id;
              const r = vis === "current" ? 14 : vis === "silhouette" ? 8 : 11;
              return (
                  <g
                    key={item.id}
                    role="button"
                    tabIndex={0}
                    className="cursor-pointer"
                    onClick={() => setSelectedId(item.id)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        setSelectedId(item.id);
                      }
                    }}
                  >
                  <circle
                    cx={layout.x}
                    cy={layout.y}
                    r={r + 8}
                    fill={vis === "current" ? "rgba(244,200,74,0.18)" : "transparent"}
                  />
                  <circle
                    cx={layout.x}
                    cy={layout.y}
                    r={r}
                    fill={vis === "silhouette" ? "#1b1712" : vis === "known" ? "#f4c84a" : "#20f6ff"}
                    stroke="#f7ecd4"
                    strokeWidth={active ? 3 : 1}
                  />
                  {(vis === "known" || vis === "current" || vis === "open") && active ? (
                    <text
                      x={layout.x + 16}
                      y={layout.y - 12}
                      fill="#f7ecd4"
                      fontSize="16"
                      style={{ fontFamily: "var(--font-display), sans-serif" }}
                    >
                      {layout.place}
                    </text>
                  ) : null}
                </g>
              );
            })}
          </svg>
          <p className="absolute bottom-3 left-4 text-[10px] uppercase tracking-[0.2em] text-parchment/50">
            Click a mark. Names wait in the field notes.
          </p>
        </div>

        <aside className="rounded-[1.5rem] border border-gold/25 bg-[#120d08] p-5">
          {selected.vis === "fog" ? (
            <>
              <p className="text-[10px] uppercase tracking-[0.24em] text-parchment/50">Uncharted</p>
              <h2 className="mt-2 font-display text-2xl text-[#f7ecd4]">Fog</h2>
              <p className="mt-3 text-sm leading-7 text-parchment/75">
                Later country is there. It is not yours yet. Walk the shore you can see.
              </p>
            </>
          ) : selected.vis === "silhouette" ? (
            <>
              <p className="text-[10px] uppercase tracking-[0.24em] text-plasma">A shape on the horizon</p>
              <h2 className="mt-2 font-display text-2xl text-[#f7ecd4]">{selected.layout.land}</h2>
              <p className="mt-3 text-sm leading-7 text-parchment/75">
                You can feel a destination forming, but the name is still sealed. Finish the ground under your feet.
              </p>
            </>
          ) : (
            <>
              <p className="text-[10px] uppercase tracking-[0.24em] text-gold">{selected.layout.land}</p>
              <h2 className="mt-2 font-display text-3xl text-[#f7ecd4]">{selected.layout.place}</h2>
              <p className="mt-3 text-lg leading-7 text-signal">{selected.item.openingQuestion}</p>
              <p className="mt-3 text-sm leading-7 text-parchment/80">{selected.item.overview}</p>
              {travelOpen ? (
                <Link
                  href={`/expedition/${selected.item.id}`}
                  className="mt-6 inline-flex rounded-full bg-gold px-5 py-2 text-xs uppercase tracking-[0.22em] text-black"
                >
                  Travel here
                </Link>
              ) : (
                <p className="mt-6 text-sm text-parchment/60">This shore opens after earlier ground is walked.</p>
              )}
            </>
          )}

          <div className="mt-8 border-t border-white/10 pt-4">
            <p className="text-[10px] uppercase tracking-[0.2em] text-parchment/50">Known places</p>
            <ul className="mt-3 space-y-2">
              {known.map(({ item, layout, vis }) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => setSelectedId(item.id)}
                    className={`block w-full rounded-lg px-2 py-2 text-left text-sm ${
                      selectedId === item.id ? "bg-gold/15 text-gold" : "text-parchment/80"
                    }`}
                  >
                    {layout.place}
                    {vis === "current" ? " · you are here" : ""}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
