"use client";

import { useMemo, useState } from "react";
import { SignalFrame } from "./SignalFrame";

export function Chronometer() {
  const [start, setStart] = useState(-457);
  const span = 2300;
  const terminus = useMemo(() => {
    const raw = start + span;
    return start < 0 && raw >= 0 ? raw - 1 : raw;
  }, [start]);

  return (
    <SignalFrame className="p-5">
      <p className="text-[10px] uppercase tracking-[0.24em] text-gold">1844 chronometer</p>
      <p className="mt-2 text-sm text-parchment/80">
        Historicist arithmetic: no year zero. A start in 457 BC plus 2300 years lands in 1844.
        Drag the decree year to see how brittle (or stable) the terminus is.
      </p>
      <label className="mt-4 block text-xs uppercase tracking-[0.16em] text-signal">
        Start year (negative = BC)
      </label>
      <input
        type="range"
        min={-500}
        max={-400}
        value={start}
        onChange={(e) => setStart(Number(e.target.value))}
        className="mt-2 w-full accent-signal"
      />
      <div className="mt-3 grid grid-cols-3 gap-3 text-center">
        <div>
          <div className="text-white/50 text-[10px] uppercase tracking-[0.16em]">Start</div>
          <div className="font-display text-xl text-signal">{start < 0 ? `${Math.abs(start)} BC` : start}</div>
        </div>
        <div>
          <div className="text-white/50 text-[10px] uppercase tracking-[0.16em]">Span</div>
          <div className="font-display text-xl text-plasma">{span}</div>
        </div>
        <div>
          <div className="text-white/50 text-[10px] uppercase tracking-[0.16em]">Terminus</div>
          <div className="font-display text-xl text-gold">{terminus}</div>
        </div>
      </div>
      <p className="mt-3 text-xs text-parchment/60">
        Pair this date with the sanctuary rooms. The Millerite mistake was naming the event, not only the math.
      </p>
    </SignalFrame>
  );
}
