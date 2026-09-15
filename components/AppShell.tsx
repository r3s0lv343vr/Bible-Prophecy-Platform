"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { EXPEDITIONS } from "@/content/expeditions";
import { NAV_ITEMS, PRODUCT_LINE, PRODUCT_SIGNAL, RANKS } from "@/lib/nav";
import { useProgress } from "./ProgressProvider";
import { NewsTicker } from "./NewsTicker";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { progress, rank, ready, dismissIntro } = useProgress();
  const [kitOpen, setKitOpen] = useState(false);
  const rankMeta = RANKS[rank];
  const last = EXPEDITIONS.find((e) => e.id === progress.lastExpeditionId);

  return (
    <div className="cosmic-bg starfield relative min-h-screen">
      {!progress.seenIntro && ready ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6 backdrop-blur-md">
          <div className="signal-border scanlines relative max-w-xl px-8 py-10 text-center">
            <p className="neon-title text-xs">Incoming transmission</p>
            <h1 className="mt-4 font-display text-3xl tracking-[0.3em] text-white md:text-4xl">
              {PRODUCT_SIGNAL}
            </h1>
            <p className="mt-4 text-sm leading-7 text-parchment/80">
              An unnamed archive is trying to speak with Earth. The method is older than the glow:
              Scripture first, history second, Seventh-day Adventist historicist conclusions labelled
              as conclusions. You are the investigator.
            </p>
            <button
              type="button"
              onClick={dismissIntro}
              className="mt-8 rounded-full border border-signal/60 bg-signal/10 px-6 py-3 text-xs uppercase tracking-[0.28em] text-signal hover:bg-signal/20"
            >
              Decode and enter
            </button>
          </div>
        </div>
      ) : null}

      <header className="sticky top-0 z-40 border-b border-signal/20 bg-[#03040c]/85 backdrop-blur-lg">
        <div className="flex items-center gap-3 px-3 py-2 md:px-5">
          <Link href="/" className="shrink-0">
            <div className="text-[10px] uppercase tracking-[0.32em] text-plasma">Field archive</div>
            <div className="font-display text-sm tracking-[0.22em] text-signal md:text-base">
              {PRODUCT_LINE}
            </div>
          </Link>
          <span className="pulse-dot hidden h-1.5 w-1.5 rounded-full bg-ok md:block" />
          <NewsTicker />
          <Link
            href="/news"
            className="hidden shrink-0 text-[10px] uppercase tracking-[0.22em] text-gold md:block"
          >
            Full signal
          </Link>
        </div>
      </header>

      <div className="mx-auto flex max-w-[1600px] gap-0 md:gap-4">
        <nav className="sticky top-[52px] hidden h-[calc(100vh-52px)] w-52 shrink-0 flex-col gap-1 overflow-y-auto p-3 lg:flex">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-xl border px-3 py-2 text-sm transition ${
                  active
                    ? "border-signal/50 bg-signal/10 text-signal"
                    : "border-transparent text-parchment/70 hover:border-white/10 hover:text-white"
                }`}
              >
                <div className="font-display tracking-[0.14em] uppercase text-[11px]">{item.label}</div>
                <div className="text-[10px] opacity-70">{item.hint}</div>
              </Link>
            );
          })}
        </nav>

        <main className="min-w-0 flex-1 px-3 py-4 pb-28 md:px-4 md:pb-10">{children}</main>

        <aside className="sticky top-[52px] hidden h-[calc(100vh-52px)] w-64 shrink-0 overflow-y-auto p-3 xl:block">
          <KitPanel />
        </aside>
      </div>

      <button
        type="button"
        onClick={() => setKitOpen(true)}
        className="fixed bottom-20 right-4 z-30 rounded-full border border-gold/50 bg-black/70 px-4 py-2 text-[10px] uppercase tracking-[0.22em] text-gold xl:hidden"
      >
        Kit
      </button>

      {kitOpen ? (
        <div className="fixed inset-0 z-40 bg-black/70 xl:hidden" onClick={() => setKitOpen(false)}>
          <div
            className="absolute right-0 top-0 h-full w-[86%] max-w-sm overflow-y-auto bg-[#050814] p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <KitPanel />
          </div>
        </div>
      ) : null}

      <nav className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-5 gap-1 border-t border-signal/20 bg-[#03040c]/95 p-2 lg:hidden">
        {NAV_ITEMS.filter((i) =>
          ["/", "/map", "/codex", "/relics", "/news"].includes(i.href),
        ).map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`rounded-lg py-2 text-center text-[10px] uppercase tracking-[0.12em] ${
              pathname === item.href ? "text-signal" : "text-parchment/70"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="pointer-events-none fixed bottom-4 left-4 hidden text-[10px] uppercase tracking-[0.2em] text-white/40 md:block">
        {rankMeta.label}
        {last ? ` · last: ${last.shortTitle}` : ""}
      </div>
    </div>
  );
}

function KitPanel() {
  const { progress, rank, reset } = useProgress();
  const rankMeta = RANKS[rank];
  return (
    <div className="signal-border rounded-2xl p-4">
      <p className="text-[10px] uppercase tracking-[0.28em] text-gold">Explorer kit</p>
      <h2 className="mt-1 font-display text-lg tracking-[0.16em] text-signal">{rankMeta.label}</h2>
      <p className="mt-2 text-xs leading-5 text-parchment/75">{rankMeta.line}</p>
      <div className="mt-4 grid grid-cols-2 gap-2 text-center text-[11px]">
        <Stat label="Sites" value={progress.completed.length} total={EXPEDITIONS.length} />
        <Stat label="Symbols" value={progress.symbols.length} total={12} />
        <Stat label="Artifacts" value={progress.artifacts.length} />
        <Stat label="Notes" value={progress.journal.length} />
      </div>
      <div className="mt-4 flex flex-col gap-2 text-xs">
        <Link className="text-signal hover:text-gold" href="/journal">
          Open journal →
        </Link>
        <Link className="text-signal hover:text-gold" href="/decoder">
          Open decoder →
        </Link>
        <Link className="text-signal hover:text-gold" href="/evidence">
          Evidence board →
        </Link>
      </div>
      <button
        type="button"
        onClick={reset}
        className="mt-6 text-[10px] uppercase tracking-[0.18em] text-white/40 hover:text-danger"
      >
        Reset local progress
      </button>
    </div>
  );
}

function Stat({ label, value, total }: { label: string; value: number; total?: number }) {
  return (
    <div className="rounded-xl border border-white/10 px-2 py-2">
      <div className="font-display text-signal">
        {value}
        {total ? <span className="text-white/40">/{total}</span> : null}
      </div>
      <div className="text-[10px] uppercase tracking-[0.16em] text-white/50">{label}</div>
    </div>
  );
}
