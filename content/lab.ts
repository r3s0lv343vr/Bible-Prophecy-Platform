export type LabCase = {
  id: string;
  title: string;
  passage: string;
  prompt: string;
  dimensions: {
    id: string;
    label: string;
    options: { id: string; label: string; score: number }[];
  }[];
};

export const LAB_CASES: LabCase[] = [
  {
    id: "daniel-7",
    title: "Unfamiliar dossier: Daniel 7",
    passage:
      "Daniel sees four beasts from the sea, a little horn with eyes and a mouth, a court seated, books opened, and a son of man given dominion.",
    prompt: "Score the reasoning path, not a lucky identification. What is a defensible next move?",
    dimensions: [
      {
        id: "context",
        label: "TEXT · who first heard this",
        options: [
          { id: "c1", label: "Ask what empire Daniel's hearers already lived under", score: 2 },
          { id: "c2", label: "Start with this week's headlines", score: 0 },
          { id: "c3", label: "Ignore the date of the vision", score: 0 },
        ],
      },
      {
        id: "symbols",
        label: "SYMBOL",
        options: [
          { id: "s1", label: "Let Daniel 7:17,23 define beasts as kings/kingdoms", score: 2 },
          { id: "s2", label: "Treat beasts as weather", score: 0 },
          { id: "s3", label: "Wait for an angelic dictionary that never comes and stop", score: 1 },
        ],
      },
      {
        id: "cross",
        label: "CROSS-REFERENCE",
        options: [
          { id: "x1", label: "Carry the little horn into Revelation 13's mouth and war", score: 2 },
          { id: "x2", label: "Refuse to let Revelation near Daniel", score: 0 },
          { id: "x3", label: "Only use extra-biblical omens", score: 0 },
        ],
      },
      {
        id: "conclusion",
        label: "CONCLUSION",
        options: [
          {
            id: "n1",
            label: "Name the historicist claim as a claim after showing the trail",
            score: 2,
          },
          { id: "n2", label: "Announce the denomination's answer with no trail", score: 0 },
          { id: "n3", label: "Pretend all schools are identical", score: 0 },
        ],
      },
    ],
  },
  {
    id: "rev-14-7",
    title: "Unfamiliar dossier: Revelation 14:7",
    passage:
      "Fear God and give him glory, because the hour of his judgment has come, and worship him who made heaven and earth and sea and springs of water.",
    prompt: "Which reasoning moves honour the text?",
    dimensions: [
      {
        id: "text",
        label: "TEXT",
        options: [
          { id: "t1", label: "Notice the creation formula matching Exodus 20:11", score: 2 },
          { id: "t2", label: "Ignore 'worship' and hunt a date only", score: 0 },
        ],
      },
      {
        id: "history",
        label: "HISTORY",
        options: [
          { id: "h1", label: "Ask what 'hour of judgment' meant to Advent awakening readers — as history, not as proof by itself", score: 2 },
          { id: "h2", label: "Assume the verse cannot have meant anything until this decade", score: 0 },
        ],
      },
      {
        id: "school",
        label: "CONCLUSION",
        options: [
          { id: "k1", label: "Label the SDA Creator-Sabbath synthesis as historicist interpretation", score: 2 },
          { id: "k2", label: "Hide that other Christians read the verse as general praise", score: 0 },
        ],
      },
    ],
  },
];
