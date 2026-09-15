"use client";

import { useState } from "react";
import { EXPEDITIONS } from "@/content/expeditions";
import { DECODER_STEPS } from "@/lib/nav";
import { SignalFrame } from "./SignalFrame";
import { useProgress } from "./ProgressProvider";

export function DecoderStudio() {
  const { progress, saveDecoder } = useProgress();
  const unlocked = progress.decoderRules.length
    ? DECODER_STEPS.filter((step) => progress.decoderRules.includes(step.id))
    : DECODER_STEPS.filter((step) => step.id === "crossrefs");
  const [showAll, setShowAll] = useState(false);
  const [expeditionId, setExpeditionId] = useState(EXPEDITIONS[0].id);
  const expedition = EXPEDITIONS.find((e) => e.id === expeditionId)!;
  const draft = progress.decoder.find((d) => d.expeditionId === expeditionId);
  const steps = showAll ? DECODER_STEPS : unlocked;

  return (
    <div className="space-y-5">
      <div>
        <p className="text-[10px] uppercase tracking-[0.28em] text-gold">Decoder</p>
        <h1 className="mt-2 font-display text-3xl text-[#f7ecd4]">One rule when you need it.</h1>
        <p className="mt-2 max-w-2xl text-sm leading-7 text-parchment/75">
          Do not jump to the answer. Follow the evidence. Full reference stays folded until you ask for it.
        </p>
      </div>
      <button
        type="button"
        onClick={() => setShowAll((v) => !v)}
        className="text-xs uppercase tracking-[0.16em] text-signal"
      >
        {showAll ? "Show only earned rules" : "Open full reference"}
      </button>
      <select
        value={expeditionId}
        onChange={(e) => setExpeditionId(e.target.value)}
        className="rounded-xl border border-white/15 bg-black/50 px-3 py-2 text-sm"
      >
        {EXPEDITIONS.filter((item) => progress.completed.includes(item.id) || item.id === EXPEDITIONS[0].id).map(
          (item) => (
            <option key={item.id} value={item.id}>
              {item.title}
            </option>
          ),
        )}
      </select>
      <div className="grid gap-4 lg:grid-cols-2">
        {steps.map((step) => (
          <SignalFrame key={step.id} className="p-5">
            <p className="text-[10px] uppercase tracking-[0.2em] text-signal">{step.label}</p>
            <p className="mt-1 text-sm text-parchment/80">{step.student}</p>
            <p className="mt-3 text-xs leading-6 text-gold/80">{expedition.decoderNotes[step.id]}</p>
            <textarea
              value={draft?.answers[step.id] ?? ""}
              onChange={(e) => saveDecoder(expeditionId, step.id, e.target.value)}
              placeholder="Working notes"
              className="mt-3 min-h-24 w-full rounded-xl border border-white/10 bg-black/30 p-3 text-sm"
            />
          </SignalFrame>
        ))}
      </div>
    </div>
  );
}
