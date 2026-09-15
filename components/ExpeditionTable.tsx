"use client";

import Link from "next/link";
import { EXPEDITIONS } from "@/content/expeditions";
import { LEARNING_LOOP, TAGLINE } from "@/lib/nav";
import { canAccess } from "@/lib/progress";
import { useProgress } from "./ProgressProvider";
import { SignalFrame } from "./SignalFrame";

export function ExpeditionTable() {
  const { progress } = useProgress();
  const current =
    EXPEDITIONS.find((e) => !progress.completed.includes(e.id) && canAccess(e.id, e.prerequisites, progress.completed, e.signature)) ??
    EXPEDITIONS[0];
  const recovered = EXPEDITIONS.filter((e) => progress.completed.includes(e.id));

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="neon-title text-[11px]">Expedition table</p>
          <h1 className="mt-2 max-w-2xl font-display text-3xl tracking-[0.12em] text-white md:text-5xl">
            A working desk, not a course list.
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-7 text-parchment/80">{TAGLINE}</p>
        </div>
        <div className="flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.16em] text-signal/70">
          {LEARNING_LOOP.map((step) => (
            <span key={step} className="rounded-full border border-signal/20 px-2 py-1">
              {step}
            </span>
          ))}
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-12">
        <SignalFrame className="p-5 lg:col-span-7">
          <p className="text-[10px] uppercase tracking-[0.24em] text-plasma">Open mystery</p>
          <h2 className="mt-2 font-display text-2xl tracking-[0.08em] text-white">{current.title}</h2>
          <p className="mt-1 text-signal">{current.openingQuestion}</p>
          <p className="mt-3 text-sm leading-7 text-parchment/80">{current.overview}</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href={`/expedition/${current.id}`}
              className="rounded-full bg-signal px-5 py-2 text-xs uppercase tracking-[0.2em] text-black"
            >
              Enter chamber
            </Link>
            <Link
              href="/map"
              className="rounded-full border border-white/20 px-5 py-2 text-xs uppercase tracking-[0.2em] text-white"
            >
              Prophecy map
            </Link>
          </div>
        </SignalFrame>

        <SignalFrame className="p-5 lg:col-span-5">
          <p className="text-[10px] uppercase tracking-[0.24em] text-gold">Field journal</p>
          <p className="mt-2 text-sm leading-6 text-parchment/80">
            {progress.journal[0]?.body ||
              "Blank pages. The manuscript wanted writing, not only watching. Your first note unlocks nothing — it makes you honest."}
          </p>
          <Link href="/journal" className="mt-4 inline-block text-xs uppercase tracking-[0.18em] text-signal">
            Write a note →
          </Link>
        </SignalFrame>

        <SignalFrame className="p-5 lg:col-span-4">
          <p className="text-[10px] uppercase tracking-[0.24em] text-signal">Recovered objects</p>
          <ul className="mt-3 space-y-2 text-sm">
            {recovered.length === 0 ? (
              <li className="text-white/50">The table is almost empty. That is the beginning.</li>
            ) : (
              recovered.slice(-6).map((item) => (
                <li key={item.id} className="flex justify-between gap-3">
                  <span>{item.artifact.title}</span>
                  <span className="text-[10px] uppercase tracking-[0.14em] text-gold">{item.shortTitle}</span>
                </li>
              ))
            )}
          </ul>
        </SignalFrame>

        <SignalFrame className="p-5 lg:col-span-4">
          <p className="text-[10px] uppercase tracking-[0.24em] text-plasma">Public briefs</p>
          <p className="mt-2 text-sm leading-6 text-parchment/80">
            666, the mark, 1844, Babylon — short investigations for people who arrived from a search, not from page one.
          </p>
          <Link href="/investigations" className="mt-4 inline-block text-xs uppercase tracking-[0.18em] text-signal">
            Open briefs →
          </Link>
        </SignalFrame>

        <SignalFrame className="p-5 lg:col-span-4">
          <p className="text-[10px] uppercase tracking-[0.24em] text-gold">Earth channel</p>
          <p className="mt-2 text-sm leading-6 text-parchment/80">
            Relics, ruins, and maps from open museum APIs. News from the world the prophecies still interrupt.
          </p>
          <div className="mt-4 flex gap-4 text-xs uppercase tracking-[0.18em] text-signal">
            <Link href="/relics">Relics</Link>
            <Link href="/news">Signal</Link>
          </div>
        </SignalFrame>
      </div>
    </div>
  );
}
