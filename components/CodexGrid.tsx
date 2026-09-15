"use client";

import { SYMBOLS } from "@/content/symbols";
import { SignalFrame } from "./SignalFrame";
import { useProgress } from "./ProgressProvider";

export function CodexGrid() {
  const { progress } = useProgress();
  const found = SYMBOLS.filter((symbol) => progress.symbols.includes(symbol.id));

  return (
    <div className="space-y-5">
      <div>
        <p className="text-[10px] uppercase tracking-[0.28em] text-gold">Codex</p>
        <h1 className="mt-2 font-display text-3xl text-[#f7ecd4]">Only what you have identified.</h1>
        <p className="mt-2 max-w-2xl text-sm leading-7 text-parchment/75">
          Empty pages are honest. Symbols enter when you meet them, and their names enter when the text
          has earned them.
        </p>
      </div>
      {found.length === 0 ? (
        <SignalFrame className="p-8">
          <p className="text-parchment/70">No entries yet. Walk the first island.</p>
        </SignalFrame>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {found.map((symbol) => (
            <SignalFrame key={symbol.id} className="p-5">
              <p className="text-3xl text-signal">{symbol.glyph}</p>
              <h2 className="mt-2 font-display text-xl text-[#f7ecd4]">{symbol.name}</h2>
              <p className="mt-3 text-sm leading-6 text-parchment/80">{symbol.definition}</p>
              <p className="mt-3 text-xs text-gold">{symbol.primaryPassages.join(" · ")}</p>
              <p className="mt-2 text-sm leading-6 text-parchment/75">{symbol.historicist}</p>
            </SignalFrame>
          ))}
        </div>
      )}
    </div>
  );
}
