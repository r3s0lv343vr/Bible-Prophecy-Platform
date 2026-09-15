"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { EXPEDITIONS, getNextExpedition } from "@/content/expeditions";
import { SITES } from "@/content/sites";
import { LEARNING_LOOP, VIEW_LABELS } from "@/lib/nav";
import { canAccess } from "@/lib/progress";
import type { Expedition, PuzzleOption } from "@/lib/types";
import { LayerChip, SignalFrame } from "./SignalFrame";
import { useProgress } from "./ProgressProvider";
import { SanctuaryWalk } from "./SanctuaryWalk";
import { Chronometer } from "./Chronometer";

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
  const [loopIndex, setLoopIndex] = useState(0);
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

  if (!open) {
    return (
      <SignalFrame className="p-8">
        <p className="neon-title text-[11px]">Sealed chamber</p>
        <h1 className="mt-3 font-display text-3xl text-white">{expedition.title}</h1>
        <p className="mt-3 text-parchment/80">Recover earlier evidence before this location fully resolves.</p>
        <Link href="/map" className="mt-6 inline-block text-signal">
          Return to map
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
      return;
    }
    const ok =
      selected.length === correctIds.length && selected.every((id, index) => (puzzle.type === "order" ? id === correctIds[index] : correctIds.includes(id)));
    setResult(ok ? puzzle.explanation : "Not yet. Re-read the evidence layers — especially text before SDA conclusion.");
    if (ok) completeExpedition(expedition.id);
  }

  function saveNote() {
    if (!note.trim()) return;
    addJournal({
      expeditionId: expedition.id,
      prompt: expedition.journalPrompt,
      body: note.trim(),
    });
    setNote("");
  }

  return (
    <div className={`space-y-5 arc-${expedition.visualArc}`}>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-[10px] uppercase tracking-[0.28em] text-plasma">
            Chamber {String(expedition.sequence).padStart(2, "0")} · {expedition.scriptureRange}
          </p>
          <h1 className="mt-2 font-display text-3xl tracking-[0.08em] text-white md:text-4xl">
            {expedition.title}
          </h1>
          <p className="mt-2 text-lg text-signal">{expedition.openingQuestion}</p>
        </div>
        <div className="text-right text-xs text-parchment/60">
          <div>{expedition.environment}</div>
          <div>{done ? "Evidence recovered" : "Investigation open"}</div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {LEARNING_LOOP.map((step, index) => (
          <button
            key={step}
            type="button"
            onClick={() => setLoopIndex(index)}
            className={`rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.16em] ${
              loopIndex === index ? "border-[var(--accent)] text-white" : "border-white/10 text-white/50"
            }`}
          >
            {step}
          </button>
        ))}
      </div>

      <p className="max-w-3xl text-sm leading-7 text-parchment/80">{expedition.overview}</p>
      <p className="text-xs uppercase tracking-[0.16em] text-gold">{expedition.learningObjective}</p>

      {expedition.id === "sanctuary-vault" ? <SanctuaryWalk /> : null}
      {expedition.id === "2300-day-code" ? <Chronometer /> : null}

      <div className="grid gap-4 lg:grid-cols-2">
        {expedition.scenes.map((scene) => (
          <SignalFrame key={scene.id} className="p-5">
            <p className="text-[10px] uppercase tracking-[0.2em] text-signal">{scene.title}</p>
            {scene.scripture ? (
              <p className="mt-1 text-xs text-gold">{scene.scripture}</p>
            ) : null}
            <p className="mt-3 text-sm leading-7 text-parchment/85">{scene.body}</p>
          </SignalFrame>
        ))}
      </div>

      <SignalFrame className="p-5">
        <p className="text-[10px] uppercase tracking-[0.24em] text-plasma">Evidence layers</p>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {expedition.evidence.map((item) => (
            <div key={item.id} className="rounded-2xl border border-white/10 p-4">
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-display text-white">{item.title}</h3>
                <LayerChip layer={item.layer} />
              </div>
              {item.scripture ? <p className="mt-1 text-xs text-gold">{item.scripture}</p> : null}
              <p className="mt-2 text-sm leading-6 text-parchment/80">{item.body}</p>
              <p className="mt-2 text-[10px] uppercase tracking-[0.14em] text-white/40">
                {VIEW_LABELS[item.layer]}
              </p>
            </div>
          ))}
        </div>
      </SignalFrame>

      {geos.length ? (
        <SignalFrame className="p-5">
          <p className="text-[10px] uppercase tracking-[0.24em] text-gold">Earth coordinates</p>
          <div className="mt-3 flex flex-wrap gap-3">
            {geos.map((site) => (
              <Link
                key={site.id}
                href={`/relics?site=${site.id}`}
                className="rounded-xl border border-white/10 px-3 py-2 text-sm hover:border-signal/40"
              >
                {site.name}
              </Link>
            ))}
          </div>
        </SignalFrame>
      ) : null}

      <SignalFrame className="p-5">
        <p className="text-[10px] uppercase tracking-[0.24em] text-signal">Test the trail</p>
        <p className="mt-2 text-sm text-parchment/80">{puzzle.prompt}</p>
        <div className="mt-4 space-y-2">
          {(puzzle.options ?? []).map((opt: PuzzleOption, index) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => toggle(opt.id)}
              className={`block w-full rounded-xl border px-4 py-3 text-left text-sm ${
                selected.includes(opt.id)
                  ? "border-signal bg-signal/10 text-white"
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
          className="mt-4 rounded-full bg-signal px-5 py-2 text-xs uppercase tracking-[0.2em] text-black"
        >
          Submit reasoning
        </button>
        {result ? <p className="mt-4 text-sm leading-6 text-gold">{result}</p> : null}
        {expedition.caution ? (
          <p className="mt-3 text-xs text-danger">{expedition.caution}</p>
        ) : null}
      </SignalFrame>

      <div className="grid gap-4 lg:grid-cols-2">
        <SignalFrame className="p-5">
          <p className="text-[10px] uppercase tracking-[0.24em] text-gold">SDA / historicist conclusion</p>
          <p className="mt-3 text-sm leading-7 text-parchment/85">{expedition.sdaConclusion}</p>
        </SignalFrame>
        <SignalFrame className="p-5">
          <p className="text-[10px] uppercase tracking-[0.24em] text-parchment">Other Christian readings</p>
          <p className="mt-1 text-xs uppercase tracking-[0.16em] text-white/50">{expedition.alternativeView.school}</p>
          <p className="mt-3 text-sm leading-7 text-parchment/85">{expedition.alternativeView.summary}</p>
        </SignalFrame>
      </div>

      <SignalFrame className="p-5">
        <p className="text-[10px] uppercase tracking-[0.24em] text-plasma">Journal</p>
        <p className="mt-2 text-sm text-parchment/80">{expedition.journalPrompt}</p>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="mt-3 min-h-28 w-full rounded-xl border border-white/10 bg-black/40 p-3 text-sm outline-none focus:border-signal/50"
        />
        <button
          type="button"
          onClick={saveNote}
          className="mt-3 rounded-full border border-gold/40 px-4 py-2 text-xs uppercase tracking-[0.18em] text-gold"
        >
          Save field note
        </button>
      </SignalFrame>

      {done ? (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-gold/40 bg-gold/10 p-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-gold">Artifact recovered</p>
            <p className="font-display text-white">{expedition.artifact.title}</p>
            <p className="text-sm text-parchment/75">{expedition.artifact.significance}</p>
          </div>
          {next ? (
            <Link
              href={`/expedition/${next.id}`}
              className="rounded-full bg-gold px-5 py-2 text-xs uppercase tracking-[0.18em] text-black"
            >
              Next: {next.shortTitle}
            </Link>
          ) : (
            <Link href="/map" className="text-gold">
              Return to map
            </Link>
          )}
        </div>
      ) : null}

      {expedition.connections.length ? (
        <div className="text-sm text-signal/80">
          Recapitulation links:{" "}
          {expedition.connections.map((c) => {
            const target = EXPEDITIONS.find((e) => e.id === c.targetExpeditionId);
            return (
              <Link key={c.targetExpeditionId} href={`/expedition/${c.targetExpeditionId}`} className="mr-3 underline">
                {target?.shortTitle}
              </Link>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
