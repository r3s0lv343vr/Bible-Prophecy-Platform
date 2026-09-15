export type Rank =
  | "explorer"
  | "investigator"
  | "pathfinder"
  | "interpreter"
  | "witness";

export type VisualArc =
  | "ruins"
  | "heaven"
  | "conflict"
  | "gold"
  | "babylon"
  | "cinematic"
  | "judicial"
  | "luminous";

export type EvidenceLayer = "text" | "history" | "sda" | "alternative";

export type PuzzleType =
  | "select"
  | "order"
  | "identify"
  | "compare"
  | "reflect";

export type DecoderStepId =
  | "context"
  | "structure"
  | "grammar"
  | "symbolic"
  | "crossrefs"
  | "classification"
  | "christ"
  | "eschaton";

export type GeoSite = {
  id: string;
  name: string;
  lat: number;
  lng: number;
  summary: string;
  expeditionId?: string;
  searchTerms: string[];
};

export type EvidenceItem = {
  id: string;
  layer: EvidenceLayer;
  title: string;
  body: string;
  scripture?: string;
};

export type PuzzleOption = {
  id: string;
  label: string;
  correct?: boolean;
  note?: string;
};

export type Puzzle = {
  type: PuzzleType;
  prompt: string;
  options?: PuzzleOption[];
  order?: string[];
  explanation: string;
};

export type DecoderNotes = Record<DecoderStepId, string>;

export type Scene = {
  id: string;
  title: string;
  body: string;
  scripture?: string;
};

export type Expedition = {
  id: string;
  sequence: number;
  title: string;
  shortTitle: string;
  scriptureRange: string;
  environment: string;
  openingQuestion: string;
  visualArc: VisualArc;
  map: { x: number; y: number };
  geoIds: string[];
  prerequisites: string[];
  signature?: boolean;
  overview: string;
  scenes: Scene[];
  evidence: EvidenceItem[];
  decoderNotes: DecoderNotes;
  puzzle: Puzzle;
  journalPrompt: string;
  artifact: { id: string; title: string; significance: string };
  connections: {
    targetExpeditionId: string;
    relation: string;
    explanation: string;
  }[];
  alternativeView: { school: string; summary: string };
  sdaConclusion: string;
  caution?: string;
  learningObjective: string;
};

export type SymbolEntry = {
  id: string;
  name: string;
  glyph: string;
  definition: string;
  primaryPassages: string[];
  historicist: string;
  related: string[];
  unlockAfter: string[];
};

export type TimelineEvent = {
  id: string;
  label: string;
  year: string;
  range?: string;
  kind: "biblical" | "historical" | "prophetic" | "doctrinal";
  body: string;
  expeditionId?: string;
};

export type Investigation = {
  slug: string;
  title: string;
  question: string;
  minutes: number;
  summary: string;
  steps: { title: string; body: string; scripture?: string }[];
  sdaConclusion: string;
  otherViews: { school: string; summary: string }[];
  expeditionId: string;
};

export type JournalEntry = {
  id: string;
  expeditionId?: string;
  prompt: string;
  body: string;
  createdAt: string;
};

export type DecoderDraft = {
  expeditionId: string;
  answers: Partial<Record<DecoderStepId, string>>;
  updatedAt: string;
};

export type EvidenceLink = {
  id: string;
  from: string;
  to: string;
  note: string;
};

export type ProgressState = {
  completed: string[];
  artifacts: string[];
  symbols: string[];
  journal: JournalEntry[];
  decoder: DecoderDraft[];
  links: EvidenceLink[];
  labScores: Record<string, number>;
  seenIntro: boolean;
  lastExpeditionId?: string;
};
