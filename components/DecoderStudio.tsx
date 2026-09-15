"use client";

import { useState } from "react";
import { EXPEDITIONS } from "@/content/expeditions";
import { DECODER_STEPS } from "@/lib/nav";
import { SignalFrame } from "./SignalFrame";
import { useProgress } from "./ProgressProvider";

export function DecoderStudio() {
  const { progress, saveDecoder } = useProgress();
  const [expeditionId, setExpeditionId] = useState(EXPEDITIONS[0].id);
  const expedition = EXPEDITIONS.find((e) => e.id === expeditionId)!;
  const draft = progress.decoder.find((d) => d.expeditionId === expeditionId);

  return (
    <div className="space-y-5">
      <div>
        <p className="neon-title text-[11px]">Prophecy decoder</p>
        <h1 className="mt-2 font-display text-3xl text-white">Method before conclusion.</h1>
        <p className="mt-2 max-w-2xl text-sm leading-7 text-parchment/75">
          Eight disciplines from the manuscript&apos;s interpretive training. The assistant later can hint;
          it cannot replace this trail.
        </p>
      </div>
      <select
        value={expeditionId}
        onChange={(e) => setExpeditionId(e.target.value)}
        className="rounded-xl border border-white/15 bg-black/50 px-3 py-2 text-sm"
      >
        {EXPEDITIONS.map((item) => (
          <option key={item.id} value={item.id}>
            {item.sequence}. {item.title}
          </option>
        ))}
      </select>
      <div className="grid gap-4 lg:grid-cols-2">
        {DECODER_STEPS.map((step) => (
          <SignalFrame key={step.id} className="p-5">
            <p className="text-[10px] uppercase tracking-[0.2em] text-signal">{step.label}</p>
            <p className="mt-1 text-sm text-parchment/70">{step.prompt}</p>
            <p className="mt-3 text-xs leading-6 text-gold/80">{expedition.decoderNotes[step.id]}</p>
            <textarea
              value={draft?.answers[step.id] ?? ""}
              onChange={(e) => saveDecoder(expeditionId, step.id, e.target.value)}
              placeholder="Your working notes"
              className="mt-3 min-h-24 w-full rounded-xl border border-white/10 bg-black/30 p-3 text-sm outline-none focus:border-signal/40"
            />
          </SignalFrame>
        ))}
      </div>
    </div>
  );
}
