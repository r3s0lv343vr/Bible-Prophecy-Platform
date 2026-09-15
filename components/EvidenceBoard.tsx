"use client";

import { useState } from "react";
import { GRAPH_NODES } from "@/content/graph";
import { SignalFrame } from "./SignalFrame";
import { useProgress } from "./ProgressProvider";

const STARTER = {
  id: "rev1",
  label: "Revelation 1 fragment",
  kind: "passage" as const,
};

export function EvidenceBoard() {
  const { progress, addLink } = useProgress();
  const unlocked = progress.unlockedTools?.includes("evidence");
  const knownIds = new Set([
    STARTER.id,
    ...progress.links.flatMap((link) => [link.from, link.to]),
  ]);
  const knownNodes = [
    STARTER,
    ...GRAPH_NODES.filter((node) => knownIds.has(node.id) && node.id !== STARTER.id),
  ];
  const [from, setFrom] = useState(knownNodes[0]?.id ?? STARTER.id);
  const [to, setTo] = useState(knownNodes[1]?.id ?? STARTER.id);
  const [note, setNote] = useState("");

  if (!unlocked && progress.links.length === 0) {
    return (
      <div className="space-y-4">
        <h1 className="font-display text-3xl text-[#f7ecd4]">Evidence board</h1>
        <SignalFrame className="p-8">
          <p className="text-parchment/75">
            Almost empty. The first recovered fragment sits here once you have something to pin beside it.
          </p>
        </SignalFrame>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div>
        <p className="text-[10px] uppercase tracking-[0.28em] text-gold">Evidence board</p>
        <h1 className="mt-2 font-display text-3xl text-[#f7ecd4]">Only the strings you tied.</h1>
      </div>
      <div className="flex flex-wrap gap-3">
        {knownNodes.map((node) => (
          <div key={node.id} className="rounded-xl border border-gold/30 bg-gold/5 px-3 py-3">
            <div className="text-[9px] uppercase tracking-[0.16em] text-plasma">{node.kind}</div>
            <div className="text-sm text-[#f7ecd4]">{node.label}</div>
          </div>
        ))}
      </div>
      {progress.links.map((link) => (
        <p key={link.id} className="text-sm text-parchment/75">
          {link.from} → {link.to}: {link.note}
        </p>
      ))}
      {knownNodes.length > 1 ? (
        <SignalFrame className="p-5">
          <p className="text-sm text-parchment/80">Tie two clues only if you can say why.</p>
          <div className="mt-3 grid gap-3 md:grid-cols-3">
            <select value={from} onChange={(e) => setFrom(e.target.value)} className="rounded-xl border border-white/15 bg-black/40 p-2 text-sm">
              {knownNodes.map((n) => (
                <option key={n.id} value={n.id}>{n.label}</option>
              ))}
            </select>
            <select value={to} onChange={(e) => setTo(e.target.value)} className="rounded-xl border border-white/15 bg-black/40 p-2 text-sm">
              {knownNodes.map((n) => (
                <option key={n.id} value={n.id}>{n.label}</option>
              ))}
            </select>
            <input
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Why this link?"
              className="rounded-xl border border-white/15 bg-black/40 p-2 text-sm"
            />
          </div>
          <button
            type="button"
            onClick={() => {
              if (!note.trim()) return;
              addLink(from, to, note.trim());
              setNote("");
            }}
            className="mt-3 rounded-full bg-gold px-4 py-2 text-xs uppercase tracking-[0.16em] text-black"
          >
            String it
          </button>
        </SignalFrame>
      ) : null}
    </div>
  );
}
