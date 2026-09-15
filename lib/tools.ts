import type { ToolId } from "./types";

export type { ToolId };

export const TOOLS: {
  id: ToolId;
  href: string;
  label: string;
  hint: string;
}[] = [
  { id: "decoder", href: "/decoder", label: "Decoder", hint: "One rule at a time" },
  { id: "codex", href: "/codex", label: "Codex", hint: "Symbols you have identified" },
  { id: "evidence", href: "/evidence", label: "Evidence", hint: "Connections you made" },
  { id: "timeline", href: "/timeline", label: "Timeline", hint: "When chronology matters" },
  { id: "lab", href: "/lab", label: "Lab", hint: "Build a case" },
  { id: "war-room", href: "/war-room", label: "War Room", hint: "Two governments of worship" },
  { id: "relics", href: "/relics", label: "Relics", hint: "Finds from the trail" },
];

export const EXPEDITION_TOOL_UNLOCKS: Record<string, ToolId[]> = {
  "interpreters-chamber": ["journal", "decoder", "codex"],
  "seven-cities": ["evidence", "relics"],
  "trumpet-trail": ["timeline"],
  "2300-day-code": ["timeline"],
  "woman-dragon": ["war-room"],
  "sea-beast": ["lab"],
};

export function hasTool(unlocked: ToolId[] | undefined, id: ToolId) {
  return (unlocked ?? []).includes(id);
}
