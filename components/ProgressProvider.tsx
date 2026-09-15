"use client";

import { createContext, useCallback, useContext, useMemo, useSyncExternalStore } from "react";
import { EXPEDITIONS } from "@/content/expeditions";
import { SYMBOLS } from "@/content/symbols";
import {
  emptyProgress,
  getProgressSnapshot,
  getServerProgress,
  rankFor,
  subscribeProgress,
  writeProgress,
} from "@/lib/progress";
import type { JournalEntry, ProgressState, Rank, ToolId } from "@/lib/types";
import { EXPEDITION_TOOL_UNLOCKS } from "@/lib/tools";

type ProgressContextValue = {
  progress: ProgressState;
  ready: boolean;
  rank: Rank;
  completeExpedition: (id: string) => void;
  addJournal: (entry: Omit<JournalEntry, "id" | "createdAt"> & { id?: string }) => void;
  saveDecoder: (expeditionId: string, step: string, value: string) => void;
  addLink: (from: string, to: string, note: string) => void;
  saveLabScore: (id: string, score: number) => void;
  unlockTool: (id: ToolId) => void;
  unlockRule: (id: string) => void;
  discoverSymbol: (id: string) => void;
  reset: () => void;
};

const ProgressContext = createContext<ProgressContextValue | null>(null);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const progress = useSyncExternalStore(
    subscribeProgress,
    getProgressSnapshot,
    getServerProgress,
  );
  const ready = true;

  const completeExpedition = useCallback((id: string) => {
    writeProgress((prev) => {
      const expedition = EXPEDITIONS.find((item) => item.id === id);
      const artifacts = expedition?.artifact
        ? Array.from(new Set([...prev.artifacts, expedition.artifact.id]))
        : prev.artifacts;
      const symbols = Array.from(
        new Set([
          ...prev.symbols,
          ...SYMBOLS.filter((symbol) => symbol.unlockAfter.includes(id)).map((s) => s.id),
        ]),
      );
      return {
        ...prev,
        completed: prev.completed.includes(id) ? prev.completed : [...prev.completed, id],
        artifacts,
        symbols,
        lastExpeditionId: id,
        unlockedTools: Array.from(
          new Set([
            ...(prev.unlockedTools ?? []),
            ...(EXPEDITION_TOOL_UNLOCKS[id] ?? []),
          ]),
        ),
      };
    });
  }, []);

  const addJournal = useCallback(
    (entry: Omit<JournalEntry, "id" | "createdAt"> & { id?: string }) => {
      writeProgress((prev) => ({
        ...prev,
        journal: [
          {
            id: entry.id ?? crypto.randomUUID(),
            expeditionId: entry.expeditionId,
            prompt: entry.prompt,
            body: entry.body,
            createdAt: new Date().toISOString(),
          },
          ...prev.journal,
        ],
      }));
    },
    [],
  );

  const saveDecoder = useCallback((expeditionId: string, step: string, value: string) => {
    writeProgress((prev) => {
      const existing = prev.decoder.find((d) => d.expeditionId === expeditionId);
      const nextDraft = {
        expeditionId,
        updatedAt: new Date().toISOString(),
        answers: { ...(existing?.answers ?? {}), [step]: value },
      };
      return {
        ...prev,
        decoder: existing
          ? prev.decoder.map((d) => (d.expeditionId === expeditionId ? nextDraft : d))
          : [...prev.decoder, nextDraft],
      };
    });
  }, []);

  const addLink = useCallback((from: string, to: string, note: string) => {
    writeProgress((prev) => ({
      ...prev,
      links: [...prev.links, { id: crypto.randomUUID(), from, to, note }],
    }));
  }, []);

  const saveLabScore = useCallback((id: string, score: number) => {
    writeProgress((prev) => ({
      ...prev,
      labScores: { ...prev.labScores, [id]: score },
    }));
  }, []);

  const unlockTool = useCallback((id: ToolId) => {
    writeProgress((prev) => ({
      ...prev,
      unlockedTools: prev.unlockedTools?.includes(id)
        ? prev.unlockedTools
        : [...(prev.unlockedTools ?? []), id],
    }));
  }, []);

  const unlockRule = useCallback((id: string) => {
    writeProgress((prev) => ({
      ...prev,
      decoderRules: prev.decoderRules?.includes(id) ? prev.decoderRules : [...(prev.decoderRules ?? []), id],
    }));
  }, []);

  const discoverSymbol = useCallback((id: string) => {
    writeProgress((prev) => ({
      ...prev,
      symbols: prev.symbols.includes(id) ? prev.symbols : [...prev.symbols, id],
    }));
  }, []);

  const reset = useCallback(() => {
    writeProgress(emptyProgress());
  }, []);

  const rank = rankFor(progress.completed.length);

  const value = useMemo(
    () => ({
      progress,
      ready,
      rank,
      completeExpedition,
      addJournal,
      saveDecoder,
      addLink,
      saveLabScore,
      unlockTool,
      unlockRule,
      discoverSymbol,
      reset,
    }),
    [
      progress,
      ready,
      rank,
      completeExpedition,
      addJournal,
      saveDecoder,
      addLink,
      saveLabScore,
      unlockTool,
      unlockRule,
      discoverSymbol,
      reset,
    ],
  );

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress must be used within ProgressProvider");
  return ctx;
}
