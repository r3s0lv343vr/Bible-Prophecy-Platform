"use client";

import Link from "next/link";
import { EXPEDITIONS } from "@/content/expeditions";
import { canAccess } from "@/lib/progress";
import { useProgress } from "./ProgressProvider";

export function ProphecyMap() {
  const { progress } = useProgress();

  return (
    <div className="space-y-5">
      <div>
        <p className="neon-title text-[11px]">Prophecy map</p>
        <h1 className="mt-2 font-display text-3xl tracking-[0.12em] text-white md:text-4xl">
          Patmos to the New Beginning
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-7 text-parchment/75">
          The route is visible. Access still follows evidence. Later chambers can reopen earlier
          ones — recapitulation is a feature, not a repeat lesson.
        </p>
      </div>

      <div className="signal-border relative min-h-[640px] overflow-hidden rounded-3xl p-3 md:p-6">
        <svg className="absolute inset-0 h-full w-full opacity-70" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="route" x1="0" x2="1">
              <stop offset="0%" stopColor="#20f6ff" />
              <stop offset="50%" stopColor="#ff3ad7" />
              <stop offset="100%" stopColor="#f4c84a" />
            </linearGradient>
          </defs>
          <polyline
            fill="none"
            stroke="url(#route)"
            strokeWidth="0.4"
            strokeDasharray="1.5 1.2"
            points={EXPEDITIONS.map((e) => `${e.map.x},${e.map.y}`).join(" ")}
          />
        </svg>
        <div className="relative min-h-[600px]">
          {EXPEDITIONS.map((item) => {
            const done = progress.completed.includes(item.id);
            const open = canAccess(item.id, item.prerequisites, progress.completed, item.signature);
            return (
              <Link
                key={item.id}
                href={open ? `/expedition/${item.id}` : "#"}
                className={`absolute w-40 -translate-x-1/2 -translate-y-1/2 rounded-2xl border px-3 py-2 text-left transition ${
                  done
                    ? "border-gold/50 bg-gold/10"
                    : open
                      ? "border-signal/50 bg-black/60 hover:bg-signal/10"
                      : "border-white/10 bg-black/40 opacity-50"
                }`}
                style={{ left: `${item.map.x}%`, top: `${item.map.y}%` }}
                aria-disabled={!open}
                onClick={(event) => {
                  if (!open) event.preventDefault();
                }}
              >
                <div className="text-[10px] uppercase tracking-[0.16em] text-plasma">
                  {String(item.sequence).padStart(2, "0")} · {item.scriptureRange}
                </div>
                <div className="font-display text-sm text-white">{item.shortTitle}</div>
                <div className="mt-1 line-clamp-2 text-[11px] leading-4 text-parchment/70">
                  {item.openingQuestion}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
