"use client";

import Link from "next/link";
import { EXPEDITIONS } from "@/content/expeditions";
import { TAGLINE } from "@/lib/nav";
import { nextOpenId } from "@/lib/progress";
import { useProgress } from "./ProgressProvider";

export function ExpeditionTable() {
  const { progress } = useProgress();
  const returning = progress.completed.length > 0 || progress.journal.length > 0;
  const nextId = nextOpenId(progress.completed);
  const next = EXPEDITIONS.find((item) => item.id === nextId) ?? EXPEDITIONS[0];
  const href = returning ? `/expedition/${next.id}` : "/expedition/interpreters-chamber";

  return (
    <div className="space-y-16">
      <section className="relative overflow-hidden rounded-[2rem] border border-gold/25 bg-[#0c0906] px-6 py-16 text-center md:px-16 md:py-24">
        <div className="pointer-events-none absolute inset-0 opacity-40" style={{
          background:
            "radial-gradient(800px 300px at 50% 0%, rgba(244,200,74,0.18), transparent), radial-gradient(500px 400px at 80% 100%, rgba(32,246,255,0.08), transparent)",
        }} />
        <p className="relative text-[11px] uppercase tracking-[0.42em] text-gold">Patmos · Asia · Heaven · Earth</p>
        <h1 className="relative mt-5 font-display text-4xl tracking-[0.12em] text-[#f7ecd4] md:text-6xl">
          The Revelation Expedition
        </h1>
        <p className="relative mx-auto mt-5 max-w-2xl text-lg leading-8 text-parchment/85">{TAGLINE}</p>
        <p className="relative mx-auto mt-6 max-w-xl text-sm leading-7 text-parchment/70">
          John received a series of extraordinary visions nearly 2,000 years ago. Beasts. Kingdoms. A
          dragon. A mysterious mark. A war over worship. A sealed scroll. A city descending from heaven.
        </p>
        <p className="relative mt-4 font-display text-xl text-signal">Your expedition begins on Patmos.</p>
        <Link
          href={href}
          className="relative mt-10 inline-flex rounded-full bg-gold px-8 py-3 text-xs uppercase tracking-[0.28em] text-black"
        >
          {returning ? "Continue expedition" : "Begin expedition"}
        </Link>
      </section>

      <section className="mx-auto max-w-2xl space-y-3 text-center text-sm leading-7 text-parchment/65">
        <p>You are not taking a course list. You are recovering a trail.</p>
        <p>Scripture first. Then clues. Then, only then, a labelled reading of what Seventh-day Adventists have understood from the evidence.</p>
        <p>
          Arrived from a search?{" "}
          <Link href="/investigations" className="text-gold underline-offset-4 hover:underline">
            Short public investigations
          </Link>{" "}
          can drop you into the same world.
        </p>
      </section>
    </div>
  );
}
