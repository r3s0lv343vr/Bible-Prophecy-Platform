"use client";

import Link from "next/link";
import { TIMELINE } from "@/content/timeline";
import { nextOpenId } from "@/lib/progress";
import { SignalFrame } from "./SignalFrame";
import { useProgress } from "./ProgressProvider";

const KIND = {
  biblical: "text-signal",
  historical: "text-gold",
  prophetic: "text-plasma",
  doctrinal: "text-parchment",
};

export function TimelineRail() {
  const { progress } = useProgress();
  const allowed = new Set([nextOpenId(progress.completed), ...progress.completed]);
  const events = TIMELINE.filter((event) => !event.expeditionId || allowed.has(event.expeditionId));

  return (
    <div className="space-y-5">
      <div>
        <p className="text-[10px] uppercase tracking-[0.28em] text-gold">Timeline instrument</p>
        <h1 className="mt-2 font-display text-3xl text-[#f7ecd4]">Only the years you have reached.</h1>
      </div>
      {events.length === 0 ? (
        <SignalFrame className="p-8">
          <p className="text-parchment/75">Chronology waits until the trail makes dates a live problem.</p>
        </SignalFrame>
      ) : null}
      <div className="relative space-y-4 before:absolute before:left-4 before:top-2 before:h-[calc(100%-1rem)] before:w-px before:bg-signal/30 md:before:left-1/2">
        {events.map((event, index) => (
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
