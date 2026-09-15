"use client";

import { useState } from "react";
import { EXPEDITIONS } from "@/content/expeditions";
import { MAP_LAYOUT } from "@/content/map-layout";
import { nextOpenId } from "@/lib/progress";
import { SignalFrame } from "./SignalFrame";
import { useProgress } from "./ProgressProvider";

export function JournalDesk() {
  const { progress, addJournal } = useProgress();
  const knownIds = new Set([
    EXPEDITIONS[0].id,
    nextOpenId(progress.completed),
    ...progress.completed,
    ...progress.journal.flatMap((entry) => (entry.expeditionId ? [entry.expeditionId] : [])),
  ]);
  const known = EXPEDITIONS.filter((item) => knownIds.has(item.id));
  const [body, setBody] = useState("");
  const [prompt, setPrompt] = useState("What I think this means");
  const [expeditionId, setExpeditionId] = useState(known[0]?.id ?? EXPEDITIONS[0].id);

  return (
    <div className="space-y-5">
      <div>
        <p className="text-[10px] uppercase tracking-[0.28em] text-gold">Field journal</p>
        <h1 className="mt-2 font-display text-3xl text-[#f7ecd4]">What you saw. What you still cannot explain.</h1>
      </div>
      <SignalFrame className="p-5">
        <div className="grid gap-3 md:grid-cols-2">
          <select
            value={expeditionId}
            onChange={(e) => setExpeditionId(e.target.value)}
            className="rounded-xl border border-white/15 bg-black/40 p-2 text-sm"
          >
            {known.map((item) => (
              <option key={item.id} value={item.id}>
                {MAP_LAYOUT[item.id]?.place ?? item.shortTitle}
              </option>
            ))}
          </select>
          <input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="rounded-xl border border-white/15 bg-black/40 p-2 text-sm"
          />
        </div>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="mt-3 min-h-36 w-full rounded-xl border border-white/10 bg-black/30 p-3 text-sm"
          placeholder="Sketches, doubts, verses, conclusions..."
        />
        <button
          type="button"
          onClick={() => {
            if (!body.trim()) return;
            addJournal({ expeditionId, prompt, body: body.trim() });
            setBody("");
          }}
          className="mt-3 rounded-full bg-gold px-5 py-2 text-xs uppercase tracking-[0.18em] text-black"
        >
          Seal this page
        </button>
      </SignalFrame>
      <div className="space-y-3">
        {progress.journal.length === 0 ? (
          <p className="text-sm text-parchment/60">No pages yet. The first observation unlocks the habit.</p>
        ) : null}
        {progress.journal.map((entry) => (
          <SignalFrame key={entry.id} className="p-4">
            <p className="text-[10px] uppercase tracking-[0.18em] text-signal">{entry.prompt}</p>
            <p className="mt-2 text-sm leading-6 text-parchment/85">{entry.body}</p>
            <p className="mt-2 text-[10px] text-white/40">
              {(entry.expeditionId ? MAP_LAYOUT[entry.expeditionId]?.place : "Field note") +
                " · " +
                new Date(entry.createdAt).toLocaleString()}
            </p>
          </SignalFrame>
        ))}
      </div>
    </div>
  );
}
