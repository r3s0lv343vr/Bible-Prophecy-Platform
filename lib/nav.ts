export const PRODUCT_LINE = "The Revelation Expedition";
export const TAGLINE =
  "An ancient prophecy. A trail through history. A mystery still unfolding.";

export type NavItem = {
  href: string;
  label: string;
  hint: string;
};

export const PRIMARY_NAV: NavItem[] = [
  { href: "/", label: "Expedition", hint: "Continue the trail" },
  { href: "/journal", label: "Journal", hint: "Field notebook" },
  { href: "/map", label: "Map", hint: "Known country" },
];

export const RANKS: Record<
  string,
  { label: string; threshold: number; line: string }
> = {
  explorer: {
    label: "Explorer",
    threshold: 0,
    line: "You have set foot on Patmos. Watch first. Write second.",
  },
  investigator: {
    label: "Investigator",
    threshold: 2,
    line: "The evidence is starting to speak. Keep Scripture first.",
  },
  pathfinder: {
    label: "Pathfinder",
    threshold: 5,
    line: "You can follow a symbol through history without losing the story.",
  },
  interpreter: {
    label: "Interpreter",
    threshold: 10,
    line: "Later visions are lighting up earlier ones.",
  },
  witness: {
    label: "Witness",
    threshold: 18,
    line: "The trail ends in restoration. Carry the invitation.",
  },
};

export const DECODER_STEPS: {
  id: import("./types").DecoderStepId;
  label: string;
  prompt: string;
  student: string;
}[] = [
  {
    id: "crossrefs",
    label: "Scripture reads Scripture",
    prompt: "Where else does the Bible already name this image?",
    student: "If the book explains its own symbol, start there.",
  },
  {
    id: "context",
    label: "Who first heard this?",
    prompt: "What world was John standing in?",
    student: "Begin with the first hearers, not tonight’s headlines.",
  },
  {
    id: "symbolic",
    label: "Sign or the thing itself?",
    prompt: "Which images are signs, and which are what they point to?",
    student: "Do not replace a Bible definition with a gadget.",
  },
  {
    id: "structure",
    label: "How is it built?",
    prompt: "Sequence, parallel, or a story told again with more light?",
    student: "Revelation often retells the same war from a new angle.",
  },
  {
    id: "grammar",
    label: "What is actually said?",
    prompt: "Read the sentences before drawing a chart.",
    student: "Watch the verbs: worship, witness, overcome.",
  },
  {
    id: "classification",
    label: "What kind of prophecy?",
    prompt: "Classic promise, apocalyptic vision, or mixed?",
    student: "Apocalyptic language is thick with symbols on purpose.",
  },
  {
    id: "christ",
    label: "Where is the Lamb?",
    prompt: "How does this pass through Jesus and his people?",
    student: "Find the Lamb before you hunt the beast.",
  },
  {
    id: "eschaton",
    label: "What still leans forward?",
    prompt: "What remains for the last crisis and the new world?",
    student: "Leave room for the end without forcing every verse into this week.",
  },
];

export const VIEW_LABELS = {
  text: "The text",
  history: "The historical trail",
  sda: "SDA / historicist reading",
  alternative: "Four ways Christians have tried to solve it",
} as const;
