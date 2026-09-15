export const PRODUCT_LINE = "Revelation Expedition";
export const PRODUCT_SIGNAL = "UNNAMED TRANSMISSION";
export const TAGLINE = "See the symbols. Trace the history. Understand the prophecy.";

export type NavItem = {
  href: string;
  label: string;
  hint: string;
  group: "world" | "kit" | "field";
};

/** Central nav config so the shell can evolve without rewriting pages. */
export const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "Table", hint: "Expedition desk", group: "world" },
  { href: "/map", label: "Map", hint: "Prophecy route", group: "world" },
  { href: "/codex", label: "Codex", hint: "Symbol library", group: "kit" },
  { href: "/decoder", label: "Decoder", hint: "Interpretation method", group: "kit" },
  { href: "/evidence", label: "Evidence", hint: "Connection board", group: "kit" },
  { href: "/journal", label: "Journal", hint: "Field notes", group: "kit" },
  { href: "/timeline", label: "Timeline", hint: "Chronology", group: "kit" },
  { href: "/lab", label: "Lab", hint: "Reasoning cases", group: "kit" },
  { href: "/war-room", label: "War Room", hint: "Great Controversy", group: "world" },
  { href: "/relics", label: "Relics", hint: "Sites and artifacts", group: "field" },
  { href: "/news", label: "Signal", hint: "Real-world events", group: "field" },
  { href: "/investigations", label: "Briefs", hint: "Public investigations", group: "field" },
];

export const RANKS: Record<
  string,
  { label: string; threshold: number; line: string }
> = {
  explorer: {
    label: "Explorer",
    threshold: 0,
    line: "You have entered the archive. Observation is the first discipline.",
  },
  investigator: {
    label: "Investigator",
    threshold: 2,
    line: "Evidence is beginning to speak. Keep Scripture first.",
  },
  pathfinder: {
    label: "Pathfinder",
    threshold: 5,
    line: "You can trace a route through symbols, history, and worship.",
  },
  interpreter: {
    label: "Interpreter",
    threshold: 10,
    line: "Method before conclusion. Recapitulation is becoming visible.",
  },
  witness: {
    label: "Witness",
    threshold: 18,
    line: "The story ends in restoration. Carry the invitation.",
  },
};

export const LEARNING_LOOP = [
  "Observe",
  "Investigate",
  "Interpret",
  "Test",
  "Connect",
  "Decide",
  "Unlock",
] as const;

export const DECODER_STEPS: {
  id: import("./types").DecoderStepId;
  label: string;
  prompt: string;
}[] = [
  {
    id: "context",
    label: "Historical setting",
    prompt: "Who first heard this, and what world were they standing in?",
  },
  {
    id: "structure",
    label: "Literary structure",
    prompt: "How is the passage built? Parallel? Recapitulation? Sequence?",
  },
  {
    id: "grammar",
    label: "Words and flow",
    prompt: "What is actually said, before any chart is drawn?",
  },
  {
    id: "symbolic",
    label: "Literal or symbolic",
    prompt: "Which images are signs, and which are the things signified?",
  },
  {
    id: "crossrefs",
    label: "Scripture interprets Scripture",
    prompt: "Where else does the Bible define these images?",
  },
  {
    id: "classification",
    label: "Kind of prophecy",
    prompt: "Classic, apocalyptic, conditional, or mixed?",
  },
  {
    id: "christ",
    label: "Christ and the church",
    prompt: "How does this pass through the cross and the people of God?",
  },
  {
    id: "eschaton",
    label: "Last-day fulfilment",
    prompt: "What still leans toward the end of the conflict?",
  },
];

export const VIEW_LABELS = {
  text: "Biblical text",
  history: "Historical trail",
  sda: "SDA / historicist reading",
  alternative: "Other Christian readings",
} as const;
