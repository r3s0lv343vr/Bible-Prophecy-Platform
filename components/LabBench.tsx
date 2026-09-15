"use client";

import { useMemo, useState } from "react";
import { LAB_CASES } from "@/content/lab";
import { SignalFrame } from "./SignalFrame";
import { useProgress } from "./ProgressProvider";

export function LabBench() {
  const { progress, saveLabScore } = useProgress();
  const [caseId, setCaseId] = useState(LAB_CASES[0].id);
  const lab = LAB_CASES.find((item) => item.id === caseId)!;
  const [picks, setPicks] = useState<Record<string, string>>({});

  const score = useMemo(() => {
    return lab.dimensions.reduce((sum, dim) => {
      const option = dim.options.find((opt) => opt.id === picks[dim.id]);
      return sum + (option?.score ?? 0);
    }, 0);
  }, [lab, picks]);
  const max = lab.dimensions.reduce((sum, dim) => sum + Math.max(...dim.options.map((o) => o.score)), 0);

  return (
    <div className="space-y-5">
      <div>
        <p className="text-[10px] uppercase tracking-[0.28em] text-gold">Prophecy lab</p>
        <h1 className="mt-2 font-display text-3xl text-[#f7ecd4]">Build a case. Score the trail, not a lucky guess.</h1>
      </div>
      <div className="flex flex-wrap gap-2">
        {LAB_CASES.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => {
              setCaseId(item.id);
              setPicks({});
            }}
            className={`rounded-full border px-3 py-1 text-xs ${caseId === item.id ? "border-signal text-signal" : "border-white/15 text-white/60"}`}
          >
            {item.title}
          </button>
        ))}
      </div>
      <SignalFrame className="p-5">
        <p className="text-sm leading-7 text-parchment/85">{lab.passage}</p>
        <p className="mt-3 text-gold">{lab.prompt}</p>
      </SignalFrame>
      {lab.dimensions.map((dim) => (
        <SignalFrame key={dim.id} className="p-5">
          <p className="text-[10px] uppercase tracking-[0.18em] text-signal">{dim.label}</p>
          <div className="mt-3 space-y-2">
            {dim.options.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setPicks((prev) => ({ ...prev, [dim.id]: opt.id }))}
                className={`block w-full rounded-xl border px-3 py-2 text-left text-sm ${
                  picks[dim.id] === opt.id ? "border-signal bg-signal/10" : "border-white/10"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </SignalFrame>
      ))}
      <button
        type="button"
        onClick={() => saveLabScore(lab.id, score)}
        className="rounded-full bg-signal px-5 py-2 text-xs uppercase tracking-[0.18em] text-black"
      >
        Record score {score}/{max}
      </button>
      {progress.labScores[lab.id] != null ? (
        <p className="text-sm text-gold">Saved: {progress.labScores[lab.id]}</p>
      ) : null}
    </div>
  );
}
