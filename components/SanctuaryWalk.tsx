"use client";

import { useState } from "react";
import { SignalFrame } from "./SignalFrame";

const ROOMS = [
  {
    id: "court",
    title: "Courtyard",
    body: "Altar and laver. Confession, substitute, washing. The gospel begins in the open, not in a secret room.",
  },
  {
    id: "holy",
    title: "Holy Place",
    body: "Lampstand, table of bread, incense. Daily priestly work: light, life, prayer. Hebrews will not let this stay on earth only.",
  },
  {
    id: "most",
    title: "Most Holy Place",
    body: "Ark, law, mercy seat. Once a year the blood meets the law. Judgment is not the opposite of mercy; it is mercy with truth.",
  },
];

export function SanctuaryWalk() {
  const [room, setRoom] = useState(ROOMS[0].id);
  const current = ROOMS.find((r) => r.id === room)!;
  return (
    <SignalFrame className="p-5">
      <p className="text-[10px] uppercase tracking-[0.24em] text-gold">Sanctuary explorer</p>
      <div className="mt-4 grid gap-3 md:grid-cols-3">
        {ROOMS.map((item, index) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setRoom(item.id)}
            className={`rounded-2xl border px-4 py-6 text-left ${
              room === item.id ? "border-gold bg-gold/10" : "border-white/10"
            }`}
          >
            <div className="text-[10px] uppercase tracking-[0.18em] text-signal">
              {index + 1}
            </div>
            <div className="font-display text-white">{item.title}</div>
          </button>
        ))}
      </div>
      <p className="mt-4 text-sm leading-7 text-parchment/85">{current.body}</p>
    </SignalFrame>
  );
}
