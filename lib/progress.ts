import { RANKS } from "./nav";
import type { ProgressState, Rank } from "./types";

export const STORAGE_KEY = "revelation-expedition-progress-v2";

export const emptyProgress = (): ProgressState => ({
  completed: [],
  artifacts: [],
  symbols: [],
  journal: [],
  decoder: [],
  decoderRules: [],
  links: [],
  labScores: {},
  unlockedTools: [],
});

let snapshot: ProgressState = emptyProgress();
const listeners = new Set<() => void>();
let hydrated = false;

function emit() {
  listeners.forEach((listener) => listener());
}

export function loadProgress(): ProgressState {
  if (typeof window === "undefined") return emptyProgress();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyProgress();
    return { ...emptyProgress(), ...JSON.parse(raw) };
  } catch {
    return emptyProgress();
  }
}

export function saveProgress(state: ProgressState) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function hydrateProgress() {
  if (hydrated || typeof window === "undefined") return snapshot;
  snapshot = loadProgress();
  hydrated = true;
  return snapshot;
}

export function getProgressSnapshot() {
  if (typeof window === "undefined") return snapshot;
  if (!hydrated) return hydrateProgress();
  return snapshot;
}

const serverSnapshot = emptyProgress();

export function getServerProgress() {
  return serverSnapshot;
}

export function subscribeProgress(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function writeProgress(
  updater: ProgressState | ((prev: ProgressState) => ProgressState),
) {
  const current = getProgressSnapshot();
  snapshot = typeof updater === "function" ? updater(current) : updater;
  saveProgress(snapshot);
  emit();
}

export function rankFor(completed: number): Rank {
  const order: Rank[] = [
    "witness",
    "interpreter",
    "pathfinder",
    "investigator",
    "explorer",
  ];
  for (const rank of order) {
    if (completed >= RANKS[rank].threshold) return rank;
  }
  return "explorer";
}

export function canAccess(
  expeditionId: string,
  prerequisites: string[],
  completed: string[],
  signature?: boolean,
) {
  if (prerequisites.length === 0) return true;
  if (completed.includes(expeditionId)) return true;
  void signature;
  return prerequisites.every((id) => completed.includes(id));
}

const SEQUENCE = [
  "interpreters-chamber",
  "seven-cities",
  "throne-room",
  "sealed-scroll",
  "trumpet-trail",
  "woman-dragon",
  "sea-beast",
  "earth-beast",
  "the-mark",
  "three-messengers",
  "sanctuary-vault",
  "2300-day-code",
  "worship-question",
  "sabbath-seal",
  "seven-vials",
  "mystery-babylon",
  "fall-of-babylon",
  "return-of-the-king",
  "thousand-years",
  "final-case",
  "death-of-death",
  "lost-city",
  "the-beginning",
];

export function nextOpenId(completed: string[]) {
  return SEQUENCE.find((id) => !completed.includes(id)) ?? SEQUENCE[SEQUENCE.length - 1];
}

export function nodeVisibility(
  sequence: number,
  expeditionId: string,
  prerequisites: string[],
  completed: string[],
  lastExpeditionId?: string,
): "current" | "known" | "open" | "silhouette" | "fog" {
  const open = canAccess(expeditionId, prerequisites, completed);
  const done = completed.includes(expeditionId);
  const frontier = completed.length
    ? Math.max(...completed.map((id) => SEQUENCE.indexOf(id) + 1), 0)
    : 0;
  const currentId =
    lastExpeditionId && !completed.includes(lastExpeditionId)
      ? lastExpeditionId
      : nextOpenId(completed);
  if (expeditionId === currentId) return "current";
  if (done) return "known";
  if (open) return "open";
  if (sequence <= frontier + 2) return "silhouette";
  return "fog";
}
