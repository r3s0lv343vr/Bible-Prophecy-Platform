"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { getNextExpedition } from "@/content/expeditions";
import { SITES } from "@/content/sites";
import { VIEW_LABELS } from "@/lib/nav";
import { canAccess } from "@/lib/progress";
import type { Expedition, PuzzleOption } from "@/lib/types";
import { LayerChip, SignalFrame } from "./SignalFrame";
import { useProgress } from "./ProgressProvider";
import { SanctuaryWalk } from "./SanctuaryWalk";
import { Chronometer } from "./Chronometer";
import { OpeningPatmos } from "./OpeningPatmos";

const PHASES = ["story", "scripture", "investigate", "interpret"] as const;

export function ExpeditionPlayer({ expedition }: { expedition: Expedition }) {
  const { progress, completeExpedition, addJournal } = useProgress();
  const open = canAccess(
    expedition.id,
    expedition.prerequisites,
    progress.completed,
    expedition.signature,
  );
  const done = progress.completed.includes(expedition.id);
  const next = getNextExpedition(expedition.id);
  const [phase, setPhase] = useState(0);
  const [selected, setSelected] = useState<string[]>([]);
  const [note, setNote] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const geos = SITES.filter((site) => expedition.geoIds.includes(site.id));

  const puzzle = expedition.puzzle;
  const correctIds = useMemo(
    () =>
      puzzle.order ??
      (puzzle.options ?? []).filter((opt) => opt.correct).map((opt) => opt.id),
    [puzzle],
  );

  if (expedition.id === "interpreters-chamber") {
    return <OpeningPatmos />;
  }

  if (!open) {
    return (
      <SignalFrame className="p-8">
        <p className="text-[10px] uppercase tracking-[0.24em] text-gold">Still in fog</p>
        <h1 className="mt-3 font-display text-3xl text-[#f7ecd4]">{expedition.title}</h1>
        <p className="mt-3 text-parchment/80">Walk the shore you can already see.</p>
        <Link href="/map" className="mt-6 inline-block text-gold">
          Return to the map
        </Link>
      </SignalFrame>
    );
  }

  function toggle(id: string) {
    if (puzzle.type === "order") {
      setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
      return;
    }
    if (puzzle.type === "identify" || puzzle.type === "reflect") {
      setSelected([id]);
      return;
    }
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }

  function grade() {
    if (puzzle.type === "reflect") {
      setResult(puzzle.explanation);
      completeExpedition(expedition.id);
      setPhase(3);
      return;
    }
    const ok =
      selected.length === correctIds.length &&
      selected.every((id, index) =>
        puzzle.type === "order" ? id === correctIds[index] : correctIds.includes(id),
      );
    setResult(
      ok
        ? puzzle.explanation
        : "Not yet. Stay with the text before you reach for a conclusion.",
    );
    if (ok) {
      completeExpedition(expedition.id);
      setPhase(3);
    }
  }

  const phaseId = PHASES[phase];
  const nextLabel =
    next?.id === "seven-cities"
      ? "Continue to Ephesus"
      : next
        ? `Continue to ${next.shortTitle}`
        : "Return to the map";

  return (
    <div className={`space-y-5 arc-${expedition.visualArc}`}>
      <div>
        <p className="text-[10px] uppercase tracking-[0.28em] text-gold">
          {expedition.environment} · {expedition.scriptureRange}
        </p>
        <h1 className="mt-2 font-display text-3xl text-[#f7ecd4] md:text-4xl">{expedition.title}</h1>
        <p className="mt-2 text-lg text-signal">{expedition.openingQuestion}</p>
      </div>

      {phaseId === "story" ? (
        <SignalFrame className="p-6 md:p-8">
          <p className="text-[10px] uppercase tracking-[0.2em] text-gold">The place</p>
          <p className="mt-4 text-base leading-8 text-parchment/90">{expedition.overview}</p>
          <button
            type="button"
            onClick={() => setPhase(1)}
            className="mt-8 rounded-full bg-gold px-6 py-3 text-xs uppercase tracking-[0.24em] text-black"
          >
            Open the text
          </button>
        </SignalFrame>
      ) : null}

      {phaseId === "scripture" ? (
        <div className="space-y-4">
          {expedition.scenes.map((scene) => (
            <SignalFrame key={scene.id} className="p-6">
              <p className="text-[10px] uppercase tracking-[0.2em] text-gold">{scene.title}</p>
              {scene.scripture ? (
                <p className="mt-2 font-display text-lg text-signal">{scene.scripture}</p>
              ) : null}
              <p className="mt-3 text-base leading-8 text-parchment/90">{scene.body}</p>
            </SignalFrame>
          ))}
          {expedition.id === "sanctuary-vault" ? <SanctuaryWalk /> : null}
          {expedition.id === "2300-day-code" ? <Chronometer /> : null}
          <button
            type="button"
            onClick={() => setPhase(2)}
            className="rounded-full bg-gold px-6 py-3 text-xs uppercase tracking-[0.24em] text-black"
          >
            Investigate
          </button>
        </div>
      ) : null}

      {phaseId === "investigate" ? (
        <div className="space-y-4">
          {expedition.evidence
            .filter((item) => item.layer === "text" || item.layer === "history")
            .map((item) => (
              <SignalFrame key={item.id} className="p-5">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-display text-xl text-[#f7ecd4]">{item.title}</h3>
                  <LayerChip layer={item.layer} />
                </div>
                {item.scripture ? <p className="mt-1 text-signal">{item.scripture}</p> : null}
                <p className="mt-3 text-sm leading-7 text-parchment/85">{item.body}</p>
              </SignalFrame>
            ))}
          <SignalFrame className="p-5">
            <p className="text-[10px] uppercase tracking-[0.2em] text-gold">Handle the evidence</p>
            <p className="mt-2 text-sm text-parchment/80">{puzzle.prompt}</p>
            <div className="mt-4 space-y-2">
              {(puzzle.options ?? []).map((opt: PuzzleOption, index) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => toggle(opt.id)}
                  className={`block w-full rounded-xl border px-4 py-3 text-left text-sm ${
                    selected.includes(opt.id)
                      ? "border-gold bg-gold/10 text-white"
                      : "border-white/10 text-parchment/80"
                  }`}
                >
                  {puzzle.type === "order" && selected.includes(opt.id)
                    ? `${selected.indexOf(opt.id) + 1}. `
                    : `${String.fromCharCode(65 + index)}. `}
                  {opt.label}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={grade}
              className="mt-4 rounded-full bg-gold px-5 py-2 text-xs uppercase tracking-[0.2em] text-black"
            >
              Test the trail
            </button>
            {result ? <p className="mt-4 text-sm leading-6 text-gold">{result}</p> : null}
            {expedition.caution ? <p className="mt-3 text-xs text-danger">{expedition.caution}</p> : null}
          </SignalFrame>
        </div>
      ) : null}

      {phaseId === "interpret" ? (
        <div className="space-y-4">
          <SignalFrame className="p-5">
            <LayerChip layer="sda" />
            <p className="mt-3 text-sm leading-7 text-parchment/85">{expedition.sdaConclusion}</p>
            <p className="mt-2 text-[10px] uppercase tracking-[0.14em] text-white/40">
              {VIEW_LABELS.sda}
            </p>
          </SignalFrame>
          <SignalFrame className="p-5">
            <LayerChip layer="alternative" />
            <p className="mt-1 text-xs uppercase tracking-[0.16em] text-gold">
              {expedition.alternativeView.school}
            </p>
            <p className="mt-3 text-sm leading-7 text-parchment/85">{expedition.alternativeView.summary}</p>
          </SignalFrame>
          {geos.length ? (
            <p className="text-sm text-parchment/70">
              Relics from this ground live in the kit once you have walked here.
            </p>
          ) : null}
          <SignalFrame className="p-5">
            <p className="text-[10px] uppercase tracking-[0.2em] text-gold">Journal</p>
            <p className="mt-2 text-sm text-parchment/80">{expedition.journalPrompt}</p>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="mt-3 min-h-28 w-full rounded-xl border border-white/10 bg-black/40 p-3 text-sm"
            />
            <button
              type="button"
              onClick={() => {
                if (!note.trim()) return;
                addJournal({
                  expeditionId: expedition.id,
                  prompt: expedition.journalPrompt,
                  body: note.trim(),
                });
                setNote("");
              }}
              className="mt-3 rounded-full border border-gold/40 px-4 py-2 text-xs uppercase tracking-[0.18em] text-gold"
            >
              Save field note
            </button>
          </SignalFrame>
          {done ? (
            <div className="rounded-2xl border border-gold/40 bg-gold/10 p-5">
              <p className="text-[10px] uppercase tracking-[0.2em] text-gold">Recovered</p>
              <p className="font-display text-xl text-[#f7ecd4]">{expedition.artifact.title}</p>
              <p className="text-sm text-parchment/75">{expedition.artifact.significance}</p>
              {next ? (
                <Link
                  href={`/expedition/${next.id}`}
                  className="mt-4 inline-flex rounded-full bg-gold px-5 py-2 text-xs uppercase tracking-[0.18em] text-black"
                >
                  {nextLabel}
                </Link>
              ) : (
                <Link href="/map" className="mt-4 inline-block text-gold">
                  Return to the map
                </Link>
              )}
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
