"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { EXPEDITIONS } from "@/content/expeditions";
import { PRIMARY_NAV, RANKS } from "@/lib/nav";
import { TOOLS } from "@/lib/tools";
import { nextOpenId } from "@/lib/progress";
import { useProgress } from "./ProgressProvider";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { progress, rank } = useProgress();
  const [kitOpen, setKitOpen] = useState(false);
  const unlocked = progress.unlockedTools ?? [];
  const visibleTools = TOOLS.filter((tool) => unlocked.includes(tool.id));
  const current = EXPEDITIONS.find((e) => e.id === nextOpenId(progress.completed));

  return (
    <div className="parchment-bg relative min-h-screen">
      <header className="sticky top-0 z-40 border-b border-[#c4a574]/30 bg-[#140e08]/92 backdrop-blur-lg">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
          <Link href="/" className="shrink-0">
            <div className="text-[10px] uppercase tracking-[0.28em] text-gold">Field archive</div>
            <div className="font-display text-sm tracking-[0.18em] text-[#f3e2c0] md:text-base">
              Revelation Expedition
            </div>
          </Link>
          <nav className="ml-auto hidden items-center gap-1 md:flex">
            {PRIMARY_NAV.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-full px-4 py-2 text-[11px] uppercase tracking-[0.18em] ${
                    active ? "bg-gold/20 text-gold" : "text-[#ead7b0]/70 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <button
              type="button"
              onClick={() => setKitOpen(true)}
              className={`rounded-full px-4 py-2 text-[11px] uppercase tracking-[0.18em] ${
                kitOpen ? "bg-gold/20 text-gold" : "text-[#ead7b0]/70 hover:text-white"
              }`}
            >
              Kit
            </button>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6 pb-28 md:pb-12">{children}</main>

      {kitOpen ? (
        <div className="fixed inset-0 z-50 bg-black/70" onClick={() => setKitOpen(false)}>
          <aside
            className="absolute right-0 top-0 h-full w-[90%] max-w-sm overflow-y-auto border-l border-gold/20 bg-[#120d08] p-5"
            onClick={(event) => event.stopPropagation()}
          >
            <p className="text-[10px] uppercase tracking-[0.28em] text-gold">Explorer kit</p>
            <h2 className="mt-1 font-display text-2xl text-[#f3e2c0]">{RANKS[rank].label}</h2>
            <p className="mt-2 text-sm leading-6 text-parchment/75">{RANKS[rank].line}</p>
            {current ? (
              <p className="mt-4 text-sm text-signal">
                Next: {MAP_PLACE(current.id)} — {current.openingQuestion}
              </p>
            ) : null}
            <div className="mt-6 space-y-2">
              {visibleTools.length === 0 ? (
                <p className="text-sm text-parchment/60">
                  Tools appear when the trail requires them. You do not need a laboratory yet.
                </p>
              ) : (
                visibleTools.map((tool) => (
                  <Link
                    key={tool.id}
                    href={tool.href}
                    onClick={() => setKitOpen(false)}
                    className="block rounded-xl border border-white/10 px-3 py-3 hover:border-gold/40"
                  >
                    <div className="font-display text-[#f3e2c0]">{tool.label}</div>
                    <div className="text-xs text-parchment/60">{tool.hint}</div>
                  </Link>
                ))
              )}
            </div>
            <ResetControl />
            <button
              type="button"
              onClick={() => setKitOpen(false)}
              className="mt-6 text-xs uppercase tracking-[0.18em] text-parchment/50"
            >
              Close
            </button>
          </aside>
        </div>
      ) : null}

      <nav className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-4 border-t border-gold/20 bg-[#140e08]/95 p-2 md:hidden">
        {PRIMARY_NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`py-2 text-center text-[10px] uppercase tracking-[0.14em] ${
              pathname === item.href ? "text-gold" : "text-parchment/70"
            }`}
          >
            {item.label}
          </Link>
        ))}
        <button
          type="button"
          onClick={() => setKitOpen(true)}
          className="py-2 text-[10px] uppercase tracking-[0.14em] text-parchment/70"
        >
          Kit
        </button>
      </nav>
    </div>
  );
}

function MAP_PLACE(id: string) {
  if (id === "interpreters-chamber") return "Patmos";
  if (id === "seven-cities") return "the seven cities";
  return EXPEDITIONS.find((e) => e.id === id)?.shortTitle ?? "the next shore";
}

function ResetControl() {
  const { reset } = useProgress();
  return (
    <button
      type="button"
      onClick={reset}
      className="mt-8 text-[10px] uppercase tracking-[0.16em] text-white/35 hover:text-danger"
    >
      Reset local progress
    </button>
  );
}
