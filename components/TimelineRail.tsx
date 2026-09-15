"use client";

import Link from "next/link";
import { TIMELINE } from "@/content/timeline";
import { SignalFrame } from "./SignalFrame";

const KIND = {
  biblical: "text-signal",
  historical: "text-gold",
  prophetic: "text-plasma",
  doctrinal: "text-parchment",
};

export function TimelineRail() {
  return (
    <div className="space-y-5">
      <div>
        <p className="neon-title text-[11px]">Timeline instrument</p>
        <h1 className="mt-2 font-display text-3xl text-white">History and prophecy, inspectable.</h1>
      </div>
      <div className="relative space-y-4 before:absolute before:left-4 before:top-2 before:h-[calc(100%-1rem)] before:w-px before:bg-signal/30 md:before:left-1/2">
        {TIMELINE.map((event, index) => (
          <SignalFrame
            key={event.id}
            className={`p-5 md:w-[48%] ${index % 2 ? "md:ml-auto" : ""}`}
          >
            <p className={`text-[10px] uppercase tracking-[0.2em] ${KIND[event.kind]}`}>
              {event.year} · {event.kind}
            </p>
            <h2 className="mt-1 font-display text-xl text-white">{event.label}</h2>
            <p className="mt-2 text-sm leading-6 text-parchment/80">{event.body}</p>
            {event.expeditionId ? (
              <Link href={`/expedition/${event.expeditionId}`} className="mt-3 inline-block text-xs text-signal">
                Open related chamber
              </Link>
            ) : null}
          </SignalFrame>
        ))}
      </div>
    </div>
  );
}
