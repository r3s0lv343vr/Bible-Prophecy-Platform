"use client";

import Link from "next/link";
import { SYMBOLS } from "@/content/symbols";
import { SignalFrame } from "./SignalFrame";
import { useProgress } from "./ProgressProvider";

export function CodexGrid() {
  const { progress } = useProgress();
  return (
    <div className="space-y-5">
      <div>
        <p className="neon-title text-[11px]">Symbol codex</p>
        <h1 className="mt-2 font-display text-3xl text-white">Reusable images, not trivia stickers.</h1>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {SYMBOLS.map((symbol) => {
          const open = symbol.unlockAfter.every((id) => progress.completed.includes(id)) || progress.symbols.includes(symbol.id);
          return (
            <SignalFrame key={symbol.id} className={`p-5 ${open ? "" : "opacity-50"}`}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-3xl text-signal">{symbol.glyph}</p>
                  <h2 className="mt-2 font-display text-xl text-white">{symbol.name}</h2>
                </div>
                <span className="text-[10px] uppercase tracking-[0.16em] text-gold">
                  {open ? "Unsealed" : "Sealed"}
                </span>
              </div>
              <p className="mt-3 text-sm leading-6 text-parchment/80">
                {open ? symbol.definition : "Recover the related chamber to read the full entry."}
              </p>
              {open ? (
                <>
                  <p className="mt-3 text-xs text-gold">{symbol.primaryPassages.join(" · ")}</p>
                  <p className="mt-2 text-sm leading-6 text-parchment/75">{symbol.historicist}</p>
                  <div className="mt-3 flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.14em] text-signal">
                    {symbol.related.map((rel) => (
                      <span key={rel} className="rounded-full border border-signal/20 px-2 py-1">
                        {rel}
                      </span>
                    ))}
                  </div>
                </>
              ) : (
                <Link href={`/expedition/${symbol.unlockAfter[0]}`} className="mt-3 inline-block text-xs text-signal">
                  Go to required chamber
                </Link>
              )}
            </SignalFrame>
          );
        })}
      </div>
    </div>
  );
}
