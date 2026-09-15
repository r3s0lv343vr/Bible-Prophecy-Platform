"use client";

import { useState } from "react";
import { GRAPH_EDGES, GRAPH_NODES } from "@/content/graph";
import { SignalFrame } from "./SignalFrame";
import { useProgress } from "./ProgressProvider";

export function EvidenceBoard() {
  const { progress, addLink } = useProgress();
  const [from, setFrom] = useState(GRAPH_NODES[0].id);
  const [to, setTo] = useState(GRAPH_NODES[1].id);
  const [note, setNote] = useState("");

  return (
    <div className="space-y-5">
      <div>
        <p className="neon-title text-[11px]">Evidence board</p>
        <h1 className="mt-2 font-display text-3xl text-white">Red-string inference, labelled.</h1>
      </div>
      <SignalFrame className="relative min-h-[420px] p-4">
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {GRAPH_EDGES.map((edge) => {
            const a = GRAPH_NODES.find((n) => n.id === edge.from)!;
            const b = GRAPH_NODES.find((n) => n.id === edge.to)!;
            const i = GRAPH_NODES.indexOf(a);
            const j = GRAPH_NODES.indexOf(b);
            const ax = 8 + (i % 6) * 16;
            const ay = 12 + Math.floor(i / 6) * 28;
            const bx = 8 + (j % 6) * 16;
            const by = 12 + Math.floor(j / 6) * 28;
            return (
              <line
                key={`${edge.from}-${edge.to}`}
                x1={ax}
                y1={ay}
                x2={bx}
                y2={by}
                stroke="rgba(255,58,215,0.45)"
                strokeWidth="0.35"
              />
            );
          })}
        </svg>
        <div className="relative grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
          {GRAPH_NODES.map((node) => (
            <div key={node.id} className="rounded-xl border border-signal/25 bg-black/50 px-2 py-3 text-center">
              <div className="text-[9px] uppercase tracking-[0.16em] text-plasma">{node.kind}</div>
              <div className="mt-1 text-xs text-white">{node.label}</div>
            </div>
          ))}
        </div>
      </SignalFrame>
      <SignalFrame className="p-5">
        <p className="text-sm text-parchment/80">Add your own connection. Infer; don&apos;t invent.</p>
        <div className="mt-3 grid gap-3 md:grid-cols-3">
          <select value={from} onChange={(e) => setFrom(e.target.value)} className="rounded-xl border border-white/15 bg-black/40 p-2 text-sm">
            {GRAPH_NODES.map((n) => (
              <option key={n.id} value={n.id}>{n.label}</option>
            ))}
          </select>
          <select value={to} onChange={(e) => setTo(e.target.value)} className="rounded-xl border border-white/15 bg-black/40 p-2 text-sm">
            {GRAPH_NODES.map((n) => (
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
          className="mt-3 rounded-full bg-plasma/80 px-4 py-2 text-xs uppercase tracking-[0.16em] text-black"
        >
          String it
        </button>
        <ul className="mt-4 space-y-2 text-sm text-parchment/75">
          {progress.links.map((link) => (
            <li key={link.id}>
              {link.from} → {link.to}: {link.note}
            </li>
          ))}
        </ul>
      </SignalFrame>
    </div>
  );
}
