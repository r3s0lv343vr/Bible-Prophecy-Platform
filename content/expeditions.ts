import type { DecoderNotes, Expedition } from "@/lib/types";

const method: DecoderNotes = {
  context: "Begin with the first hearers: a persecuted Asian church under Rome, not a 21st-century headline.",
  structure: "Watch for recapitulation: Revelation retells the same war from new angles rather than a single straight timeline.",
  grammar: "Read the sentences. Then the images. Do not skip the verbs of worship, witness, and overcome.",
  symbolic: "Ask whether the Bible already defines the image. If it does, do not invent a gadget to replace that definition.",
  crossrefs: "Daniel, Exodus, the prophets, and the Gospels are the decoder ring. Revelation is a remix of Scripture.",
  classification: "Apocalyptic prophecy: highly symbolic, historically unfolding in the historicist school, Christ-centred.",
  christ: "Locate the Lamb before locating the beast. Interpretation that cannot preach the cross is unfinished.",
  eschaton: "Leave room for a last crisis of worship without forcing every verse into tomorrow's news cycle.",
};

export const EXPEDITIONS: Expedition[] = [
  {
    id: "interpreters-chamber",
    sequence: 1,
    title: "Patmos",
    shortTitle: "Patmos",
    scriptureRange: "Rev 1",
    environment: "A rocky island in the Aegean",
    openingQuestion: "What was John shown, and why was it sent?",
    visualArc: "ruins",
    map: { x: 16, y: 72 },
    geoIds: ["patmos"],
    prerequisites: [],
    overview:
      "John is a prisoner on Patmos. The sea is loud. A revelation of Jesus Christ has been placed in your hands. Find out what it is before you try to solve the rest of the book.",
    scenes: [
      {
        id: "exile",
        title: "A prisoner writes",
        scripture: "Rev 1:9-11",
        body: "John is on Patmos 'because of the word of God and the testimony of Jesus.' Any reading that ignores worship and witness has already left the book.",
      },
      {
        id: "method",
        title: "Eight disciplines",
        body: "Historicist reading does not mean 'newspaper first.' It means the visions unfold through the centuries between John and the New Jerusalem, tested by Scripture.",
      },
      {
        id: "schools",
        title: "Name the schools",
        body: "Preterist: mostly first century. Futurist: mostly still ahead. Idealist: timeless principles. Historicist: a through-history panorama. This expedition trains the last, without hiding the others.",
      },
    ],
    evidence: [
      {
        id: "rev1",
        layer: "text",
        title: "The book's own purpose",
        scripture: "Rev 1:1-3",
        body: "A revelation of Jesus Christ, to show his servants what must soon take place, with a blessing on the reader who keeps it.",
      },
      {
        id: "dayyear",
        layer: "sda",
        title: "Day-year clue texts",
        scripture: "Num 14:34; Ezek 4:6",
        body: "In apocalyptic time periods SDA historicists apply a day for a year. This is a method claim, not a verse that appears inside Revelation 1.",
      },
      {
        id: "schools-e",
        layer: "alternative",
        title: "Other maps of time",
        body: "A futurist may reserve most of Revelation for a short end-time. A preterist may see Nero and 70 AD as enough. Record them; do not erase them.",
      },
    ],
    decoderNotes: method,
    puzzle: {
      type: "select",
      prompt: "Which moves belong to responsible decoding? Select every true discipline.",
      options: [
        { id: "a", label: "Establish historical setting first", correct: true },
        { id: "b", label: "Let current headlines fix the meaning before the text", correct: false },
        { id: "c", label: "Use Scripture to define symbols", correct: true },
        { id: "d", label: "Separate text, history, and denominational conclusion", correct: true },
        { id: "e", label: "Treat the AI or a teacher as the final authority", correct: false },
      ],
      explanation:
        "The Decoder is a workflow, not an oracle. You recovered it by choosing method over shortcut.",
    },
    journalPrompt:
      "What did you notice in the first fragment that you did not expect?",
    artifact: {
      id: "decoder",
      title: "Prophecy Decoder",
      significance: "Persistent interpretation workflow for every later chamber.",
    },
    connections: [
      {
        targetExpeditionId: "woman-dragon",
        relation: "method applied",
        explanation: "Revelation 12 is the first major test of symbol literacy.",
      },
    ],
    alternativeView: {
      school: "All schools",
      summary: "Every Christian school claims to honour Scripture. The difference is time-map and symbol rules. Keep those rules visible.",
    },
    sdaConclusion:
      "SDA / historicist reading: Revelation is a panorama of the conflict between God and Satan from John’s day to restoration, centred on Jesus — not a newspaper decoder.",
    learningObjective: "State the decoding method before quoting an SDA conclusion.",
  },
  {
    id: "seven-cities",
    sequence: 2,
    title: "The Seven Ruined Cities",
    shortTitle: "Churches",
    scriptureRange: "Rev 2–3",
    environment: "Seven excavation lamps along a coast",
    openingQuestion: "Why is Jesus sending seven warnings?",
    visualArc: "ruins",
    map: { x: 50, y: 88 },
    geoIds: ["ephesus", "smyrna", "pergamum", "thyatira", "sardis", "philadelphia", "laodicea"],
    prerequisites: ["interpreters-chamber"],
    overview:
      "Walk Ephesus to Laodicea. Each church has a portrait of Christ, a diagnosis, a call, and a promise. Historicists also hear successive eras of church history — without erasing the local letters.",
    scenes: [
      {
        id: "ephesus",
        title: "Ephesus — first love",
        scripture: "Rev 2:1-7",
        body: "Orthodoxy without love. The lampstand is portable. Truth that cannot love is already migrating.",
      },
      {
        id: "smyrna",
        title: "Smyrna — crown through death",
        scripture: "Rev 2:8-11",
        body: "No rebuke. Prison and poverty with hidden riches. Ten days of testing; faithfulness unto death.",
      },
      {
        id: "pergamum",
        title: "Pergamum — throne on the hill",
        scripture: "Rev 2:12-17",
        body: "Faithful Antipas, and also Balaam. Compromise beside an imperial cult is not ancient trivia.",
      },
      {
        id: "laodicea",
        title: "Laodicea — knock",
        scripture: "Rev 3:14-22",
        body: "Wealth, lukewarm water, and Christ outside the door of his own church. The last letter is a meal invitation.",
      },
    ],
    evidence: [
      {
        id: "local",
        layer: "text",
        title: "Real cities",
        body: "The seven churches were postal stops in Asia Minor. Archaeology still holds their theatres, streets, and inscriptions.",
      },
      {
        id: "ages",
        layer: "sda",
        title: "Seven eras",
        body: "Apostolic; persecuted; imperial compromise; wilderness church; Reformation; advent awakening; last-day Laodicea. A historicist overlay, tested against the letters rather than replacing them.",
      },
      {
        id: "idealist-ch",
        layer: "alternative",
        title: "Every church in every age",
        body: "Many readers treat the seven as timeless spiritual types. That reading can sit beside history if it does not forbid history.",
      },
    ],
    decoderNotes: {
      ...method,
      context: "Domitianic Asia: imperial cult, trade guilds, synagogues, and fragile house churches.",
      structure: "Sevenfold pattern: address, 'I know,' diagnosis, call, ear formula, promise to the overcomer.",
    },
    puzzle: {
      type: "identify",
      prompt: "Which church is told it is poor, blind, and naked — yet is offered gold, garments, and salve?",
      options: [
        { id: "sardis", label: "Sardis" },
        { id: "philadelphia", label: "Philadelphia" },
        { id: "laodicea", label: "Laodicea", correct: true },
        { id: "ephesus", label: "Ephesus" },
      ],
      explanation: "The last warning is medical and merciful. Laodicea is diagnosed in order to be healed.",
    },
    journalPrompt: "Which of the seven letters most resembles your community's actual spiritual weather?",
    artifact: {
      id: "medallions",
      title: "Seven city medallions",
      significance: "Each diagnosis and promise stays in the kit for later recapitulation.",
    },
    connections: [
      {
        targetExpeditionId: "the-mark",
        relation: "worship pressure",
        explanation: "Pergamum and Thyatira already know what coerced worship feels like.",
      },
    ],
    alternativeView: {
      school: "Idealist",
      summary: "The seven are perennial church conditions rather than a historical sequence.",
    },
    sdaConclusion:
      "Christ walks among lampstands in John's day and across church history. The last word to the last church is still an invitation.",
    learningObjective: "Name problem, counsel, and promise for at least four churches, then state the historicist overlay as overlay.",
  },
  {
    id: "throne-room",
    sequence: 3,
    title: "The Throne Room",
    shortTitle: "Throne",
    scriptureRange: "Rev 4–5",
    environment: "Cinematic heavenly chamber",
    openingQuestion: "Who truly rules, and who can open the scroll?",
    visualArc: "heaven",
    map: { x: 84, y: 88 },
    geoIds: [],
    prerequisites: ["seven-cities"],
    overview:
      "The ruined cities are not the last word. The next scene is worship: holy, holy, holy, and a slain Lamb standing.",
    scenes: [
      {
        id: "door",
        title: "A door in heaven",
        scripture: "Rev 4:1-11",
        body: "Before seals and horses, the cosmos is shown as a courtroom-temple. Creation is already a worship argument.",
      },
      {
        id: "lamb",
        title: "The only opener",
        scripture: "Rev 5:1-10",
        body: "No one in heaven or earth can open the scroll. Then the Lion is a Lamb as if slain. History has a worthy centre.",
      },
    ],
    evidence: [
      {
        id: "worship4",
        layer: "text",
        title: "Creator hymn",
        scripture: "Rev 4:11",
        body: "Worthy are you... for you created all things. This hymn will later fuel the first angel's message.",
      },
      {
        id: "lamb5",
        layer: "sda",
        title: "Sanctuary in heaven",
        body: "SDA reading: John is shown heavenly temple furniture and ministry, not a metaphor-only stage set.",
      },
    ],
    decoderNotes: {
      ...method,
      christ: "If the Lamb cannot open the scroll, no historicist chart can.",
    },
    puzzle: {
      type: "select",
      prompt: "What qualifies the opener of the scroll?",
      options: [
        { id: "a", label: "Military conquest as a lion only", correct: false },
        { id: "b", label: "Being slain and purchasing people for God", correct: true },
        { id: "c", label: "Secret knowledge unavailable to the church", correct: false },
        { id: "d", label: "The elders' majority vote", correct: false },
      ],
      explanation: "Worthiness is cruciform. The rest of the book must keep this in view.",
    },
    journalPrompt: "If the Lamb holds history, what changes about how you watch the news tonight?",
    artifact: {
      id: "scroll",
      title: "Sealed scroll",
      significance: "The artefact that later seals will unfasten.",
    },
    connections: [
      {
        targetExpeditionId: "sabbath-seal",
        relation: "creator worship",
        explanation: "Revelation 4's creation hymn returns in Revelation 14:7.",
      },
    ],
    alternativeView: {
      school: "Various",
      summary: "Some see only liturgy; some see only future. Historicists see the present government of God over the whole age.",
    },
    sdaConclusion:
      "The throne is occupied. The Lamb is worthy. Interpretation that skips worship will misread every later beast.",
    learningObjective: "Connect Revelation 4–5 worship to later worship-crisis passages.",
  },
  {
    id: "sealed-scroll",
    sequence: 4,
    title: "The Sealed Scroll",
    shortTitle: "Seals",
    scriptureRange: "Rev 6–8:1",
    environment: "Nested lock sequence",
    openingQuestion: "What is revealed when history is unsealed?",
    visualArc: "conflict",
    map: { x: 84, y: 76 },
    geoIds: [],
    prerequisites: ["throne-room"],
    overview:
      "Horsemen move across the map. Historicists hear the church's story: gospel, conflict, compromise, persecution, crisis, cosmic signs, silence.",
    scenes: [
      {
        id: "horses",
        title: "Four riders",
        scripture: "Rev 6:1-8",
        body: "White, red, black, pale. Not a video-game loot drop. A pattern of proclamation, violence, scarcity, and death that recapitulates the church's road.",
      },
      {
        id: "souls",
        title: "Under the altar",
        scripture: "Rev 6:9-11",
        body: "The fifth seal is a cry for justice, not a proof-text that the dead are conscious tourists. The scene is sanctuary-court, and the word is 'wait.'",
      },
    ],
    evidence: [
      {
        id: "recap",
        layer: "sda",
        title: "Seals as church ages",
        body: "A historicist overlay parallels the seven churches: from apostolic white horse to last-day shaking. Recapitulation, not a second unrelated movie.",
      },
      {
        id: "fut-seals",
        layer: "alternative",
        title: "Futurist horsemen",
        body: "Dispensational readings often place the riders after a rapture, in a short tribulation. Compare; do not caricature.",
      },
    ],
    decoderNotes: method,
    puzzle: {
      type: "order",
      prompt: "Order the first four seal colours as they appear.",
      options: [
        { id: "white", label: "White" },
        { id: "red", label: "Red" },
        { id: "black", label: "Black" },
        { id: "pale", label: "Pale" },
      ],
      order: ["white", "red", "black", "pale"],
      explanation: "Sequence matters because later recapitulations will rhyme with this pattern.",
    },
    journalPrompt: "Where do you still want Revelation to be a spectacle rather than a pastoral warning?",
    artifact: {
      id: "seal-fragments",
      title: "Seal fragments",
      significance: "Patterns to reconnect when beasts and trumpets rhyme with the seals.",
    },
    connections: [
      {
        targetExpeditionId: "death-of-death",
        relation: "state of the dead",
        explanation: "The fifth seal's imagery must be read with the rest of Scripture on death.",
      },
    ],
    alternativeView: {
      school: "Futurist",
      summary: "Horsemen as still-future global calamities after the church is removed.",
    },
    sdaConclusion:
      "The seals disclose the church's historical conflict under the Lamb's authority, ending in cosmic shaking and the seventh-seal pause.",
    learningObjective: "Describe recapitulation: churches and seals as parallel panoramas.",
  },
  {
    id: "trumpet-trail",
    sequence: 5,
    title: "The Trumpet Trail",
    shortTitle: "Trumpets",
    scriptureRange: "Rev 8–11",
    environment: "Military-historical campaign map",
    openingQuestion: "How do the trumpets trace judgment and historical movement?",
    visualArc: "conflict",
    map: { x: 50, y: 76 },
    geoIds: ["rome", "constantinople"],
    prerequisites: ["sealed-scroll"],
    overview:
      "Trumpets are alarms in the land. Historicist dossiers often follow Western Rome's fall, then eastern crises, then a little book opened — Daniel unsealed.",
    scenes: [
      {
        id: "alarms",
        title: "Partial judgments",
        scripture: "Rev 8:6-13",
        body: "Thirds, not totals. Trumpets warn; bowls later exhaust. The difference is theological, not cinematic.",
      },
      {
        id: "little-book",
        title: "The opened booklet",
        scripture: "Rev 10",
        body: "Sweet in the mouth, bitter in the stomach. Historicists hear the 19th-century prophecy awakening and the disappointment that forced a sanctuary reread.",
      },
    ],
    evidence: [
      {
        id: "hist-tr",
        layer: "history",
        title: "Empires move",
        body: "From the Mediterranean to the Bosporus, real armies changed the map John already knew as 'earth.'",
      },
      {
        id: "sda-tr",
        layer: "sda",
        title: "Traditional trumpet dossiers",
        body: "Classic SDA historicists mapped trumpets onto Goths, Islam, Ottomans, and 1840s expectation. Later SDA scholars sometimes revise details while keeping the historicist frame. Hold details with humility.",
      },
    ],
    decoderNotes: {
      ...method,
      context: "Match historical dossiers to texts without forcing every chronicle into a verse.",
    },
    puzzle: {
      type: "select",
      prompt: "What is the theological purpose of the trumpets in this expedition's frame?",
      options: [
        { id: "a", label: "Entertainment through destruction", correct: false },
        { id: "b", label: "Warnings in history that call to repentance", correct: true },
        { id: "c", label: "Proof that God has abandoned the church", correct: false },
      ],
      explanation: "Judgment language is moral and missional. Spectacle is a design risk this platform refuses.",
    },
    journalPrompt: "How do you tell the difference between watching judgment and gawking at it?",
    artifact: {
      id: "little-book",
      title: "Daniel link — little book",
      significance: "Revelation 10 sends the investigator back to Daniel.",
    },
    connections: [
      {
        targetExpeditionId: "2300-day-code",
        relation: "opened book",
        explanation: "The bitter-sweet book is a chronology and sanctuary problem, not only an emotion.",
      },
    ],
    alternativeView: {
      school: "Futurist / preterist",
      summary: "Trumpets as future ecological disasters, or as 70 AD only.",
    },
    sdaConclusion:
      "Trumpets trace historical judgments within the Great Controversy and prepare the three angels' worldwide cry.",
    caution: "Do not gamify plagues. Names of the dead are not points.",
    learningObjective: "Distinguish warning (trumpets) from completion (bowls) and connect ch. 10 to Daniel.",
  },
  {
    id: "woman-dragon",
    sequence: 6,
    title: "The Woman and the Dragon",
    shortTitle: "Dragon",
    scriptureRange: "Rev 12",
    environment: "Symbolic observatory / mural",
    openingQuestion: "Who is the woman, and who is hunting her?",
    visualArc: "conflict",
    map: { x: 16, y: 76 },
    geoIds: [],
    prerequisites: ["trumpet-trail"],
    overview:
      "A woman clothed with the sun, a dragon with seven heads, a child caught up to the throne, a war in heaven, a wilderness of 1260 days.",
    scenes: [
      {
        id: "sign",
        title: "Two signs",
        scripture: "Rev 12:1-6",
        body: "Sun, moon, twelve stars: Joseph's family language (Gen 37) plus covenant community. The dragon waits to devour the child.",
      },
      {
        id: "named",
        title: "Identity confirmed",
        scripture: "Rev 12:7-9",
        body: "The great dragon was thrown down, that ancient serpent, called the devil and Satan. The mural labels itself.",
      },
      {
        id: "wilderness",
        title: "Two wings of a great eagle",
        scripture: "Rev 12:13-17",
        body: "The remnant keep the commandments of God and the testimony of Jesus. A people, not a mascot.",
      },
    ],
    evidence: [
      {
        id: "gen37",
        layer: "text",
        title: "Sun, moon, stars",
        scripture: "Gen 37:9-10",
        body: "Joseph's dream already used this family imagery. Revelation is not inventing a private code.",
      },
      {
        id: "1260",
        layer: "sda",
        title: "Time, times, and half a time",
        scripture: "Rev 12:6,14; 13:5; Dan 7:25",
        body: "1260 days = 42 months = 3.5 times. Historicist day-year: 1260 years of wilderness pressure, classically 538–1798.",
      },
      {
        id: "mariol",
        layer: "alternative",
        title: "Mary-only reading",
        body: "The woman includes the Messiah's mother historically, but the wilderness flight of 1260 days cannot be reduced to Bethlehem.",
      },
    ],
    decoderNotes: {
      ...method,
      symbolic: "Woman = community of faith; dragon is named; child = the Messiah who will rule with a rod of iron.",
    },
    puzzle: {
      type: "compare",
      prompt: "Match the image to the best text-grounded identity.",
      options: [
        { id: "woman", label: "Woman → faithful people of God (and the messianic line)", correct: true },
        { id: "dragon", label: "Dragon → Satan, explicitly named in 12:9", correct: true },
        { id: "child", label: "Child → Christ caught up to the throne", correct: true },
        { id: "ufo", label: "Dragon → a future unnamed empire with no biblical label", correct: false },
      ],
      explanation: "You built two evidence trees: identity of the hunter, identity of the hunted.",
    },
    journalPrompt: "The dragon is angry with the woman and goes to make war with the remnant. What does 'testimony of Jesus' mean in your week?",
    artifact: {
      id: "dragon-card",
      title: "Dragon identity card",
      significance: "12:9 is an identity confirmation, not a rumour.",
    },
    connections: [
      {
        targetExpeditionId: "mystery-babylon",
        relation: "two women",
        explanation: "The faithful woman of 12 is inverted by the woman of 17.",
      },
      {
        targetExpeditionId: "sea-beast",
        relation: "agency",
        explanation: "The dragon gives power to the beast. Do not confuse agent and instrument.",
      },
    ],
    alternativeView: {
      school: "Futurist",
      summary: "Often Israel in a future tribulation, with a still-future 1260 literal days.",
    },
    sdaConclusion:
      "The woman is God's people; the child is Christ; the dragon is Satan; the remnant are commandment-keeping witnesses after a long wilderness.",
    learningObjective: "Separate symbol, naming verse, and historicist time period.",
  },
  {
    id: "sea-beast",
    sequence: 7,
    title: "The Beast from the Sea",
    shortTitle: "Sea beast",
    scriptureRange: "Rev 13:1-10",
    environment: "Historical dossier room",
    openingQuestion: "What kind of power does the composite beast represent?",
    visualArc: "conflict",
    map: { x: 16, y: 64 },
    geoIds: ["rome"],
    prerequisites: ["woman-dragon"],
    overview:
      "Seven heads, ten horns, leopard-bear-lion features, blasphemy, war on the saints, 42 months. Daniel 7 is on the table.",
    scenes: [
      {
        id: "composite",
        title: "Daniel's zoo, one body",
        scripture: "Rev 13:1-2; Dan 7:3-8",
        body: "The beast inherits the earlier empires. Historicists read a continuation of Rome in a religious-political form.",
      },
      {
        id: "wound",
        title: "A wound that heals",
        scripture: "Rev 13:3",
        body: "A crisis of supremacy, then a recovery of influence. 1798 is the classic date; healing is treated as later restoration of prestige.",
      },
    ],
    evidence: [
      {
        id: "dan7",
        layer: "text",
        title: "Four beasts and a little horn",
        scripture: "Dan 7",
        body: "Same conflict language: time, times, half a time; mouth speaking great things; war on the saints.",
      },
      {
        id: "538-1798",
        layer: "history",
        title: "Supremacy window",
        body: "From the post-imperial west to the French Revolutionary captivity of the papacy — a historical dossier, not a hate campaign against Catholic neighbours.",
      },
      {
        id: "care",
        layer: "sda",
        title: "Systems, not souls",
        body: "The claim is about an institution's prophetic role. It is not a judgment of every Catholic Christian. Hostility toward persons is a failure of this reading.",
      },
    ],
    decoderNotes: {
      ...method,
      crossrefs: "Daniel 7 is required reading. Revelation 13 does not start from a blank page.",
    },
    puzzle: {
      type: "select",
      prompt: "Which statements are true to this expedition's method?",
      options: [
        { id: "a", label: "The beast is a composite of Daniel's empires", correct: true },
        { id: "b", label: "The dragon and the beast are identical with no distinction", correct: false },
        { id: "c", label: "42 months / 1260 days are the same period family as Rev 12", correct: true },
        { id: "d", label: "Individual believers are the beast", correct: false },
      ],
      explanation: "Instrument versus enemy; period family; no permission for contempt.",
    },
    journalPrompt: "How will you speak about this dossier without turning neighbours into villains?",
    artifact: {
      id: "beast-dossier",
      title: "Sea-beast dossier",
      significance: "Composite identity, period, wound, and a moral boundary.",
    },
    connections: [
      {
        targetExpeditionId: "earth-beast",
        relation: "enforcer",
        explanation: "A second power will make an image of the first.",
      },
    ],
    alternativeView: {
      school: "Futurist",
      summary: "A still-future Antichrist individual ruling a revived European coalition.",
    },
    sdaConclusion:
      "The sea beast is the papal phase of Rome: a worship-claiming power that persecutes, is wounded, and recovers influence. Persons are not the target of the symbol.",
    caution: "Label institutions and interpretations. Do not baptize prejudice.",
    learningObjective: "Use Daniel 7 as cross-reference and state the SDA conclusion only after the evidence trail.",
  },
  {
    id: "earth-beast",
    sequence: 8,
    title: "The Beast from the Earth",
    shortTitle: "Earth beast",
    scriptureRange: "Rev 13:11-15",
    environment: "Political case-file office",
    openingQuestion: "Why does something lamb-like speak like a dragon?",
    visualArc: "conflict",
    map: { x: 50, y: 64 },
    geoIds: [],
    prerequisites: ["sea-beast"],
    overview:
      "Two horns like a lamb, speech like a dragon, fire from heaven, an image to the first beast. Appearance versus behaviour.",
    scenes: [
      {
        id: "lamb-horns",
        title: "Christ-like costume",
        scripture: "Rev 13:11",
        body: "Lamb horns suggest youth, protest against monarchy, and a Christian self-image. Dragon speech is the betrayal.",
      },
      {
        id: "image",
        title: "The image",
        scripture: "Rev 13:14-15",
        body: "An image is a copy of a relation: civil power enforcing a religious mark. The file is about coerced worship.",
      },
    ],
    evidence: [
      {
        id: "earth",
        layer: "text",
        title: "From the earth",
        scripture: "Rev 13:11; 17:15",
        body: "If waters are peoples, earth can mark a different stage — a nation rising away from the old crowded sea of empires.",
      },
      {
        id: "usa",
        layer: "sda",
        title: "Classic SDA identification",
        body: "The United States: lamb-like Protestant republican beginnings; a predicted future of enforced worship contrary to liberty. A prophecy of trajectory, not a sneer at a flag.",
      },
    ],
    decoderNotes: method,
    puzzle: {
      type: "identify",
      prompt: "The contradiction dossier is mainly about…",
      options: [
        { id: "a", label: "Currency design" },
        { id: "b", label: "Lamb-like appearance versus dragon-like coerced worship", correct: true },
        { id: "c", label: "Whether the earth is flat" },
      ],
      explanation: "Keep the moral centre: liberty versus coerced worship.",
    },
    journalPrompt: "Where do Christian words and dragon methods still travel together in public life?",
    artifact: {
      id: "contradiction-file",
      title: "Contradiction dossier",
      significance: "Appearance versus speech, ready for the mark investigation.",
    },
    connections: [
      {
        targetExpeditionId: "the-mark",
        relation: "enforcement",
        explanation: "The earth beast is the mark's publicist and police.",
      },
    ],
    alternativeView: {
      school: "Various",
      summary: "Read as future false prophet only, or as any propaganda state. Historicists specify a place in the map of nations.",
    },
    sdaConclusion:
      "The earth beast represents the United States in prophecy: lamb-like civil/religious liberty that will eventually enforce an image of the first beast.",
    learningObjective: "State the appearance/behaviour contradiction before the national identification.",
  },
  {
    id: "the-mark",
    sequence: 9,
    title: "The Mark",
    shortTitle: "Mark",
    scriptureRange: "Rev 13:16–18; Deut 6",
    environment: "Rumour-investigation room",
    openingQuestion: "Is the mark a device, a number, or an allegiance problem?",
    visualArc: "conflict",
    map: { x: 84, y: 64 },
    geoIds: [],
    prerequisites: ["earth-beast"],
    overview:
      "Forehead and hand. Buying and selling. 666. Place the gadget theories on the table, then open Deuteronomy.",
    scenes: [
      {
        id: "table",
        title: "Rumour table",
        body: "Chips, barcodes, passports, tattoos, currencies. Some could become tools of coercion. None of them are the Bible's first definition of forehead and hand.",
      },
      {
        id: "deut",
        title: "A sign on your hand",
        scripture: "Deut 6:6-8; Exod 13:9",
        body: "Israel already knew forehead/hand as loyalty to God's words. Revelation is in that stream: belief and practice.",
      },
      {
        id: "worship",
        title: "The real binary",
        scripture: "Rev 14:9-12",
        body: "The mark warning sits beside 'those who keep the commandments of God and the faith of Jesus.' Worship and law are on the same page.",
      },
    ],
    evidence: [
      {
        id: "notchip",
        layer: "text",
        title: "Location of the sign",
        body: "Forehead and hand are moral locations in Torah. A technology might police a mark; it is not automatically the mark.",
      },
      {
        id: "sabbath-mark",
        layer: "sda",
        title: "Sabbath vs counterfeit sabbath",
        body: "SDA historicists conclude the end-time issue is the authority of the Creator expressed in the seventh-day Sabbath versus an enforced substitute day of worship. The mark is received when the issue is clear and coercion is in force — not by accident today.",
      },
      {
        id: "fut-mark",
        layer: "alternative",
        title: "Futurist implant",
        body: "A still-future Antichrist literal brand or implant. Note it as a competing school, then return to the Torah echo.",
      },
    ],
    decoderNotes: {
      ...method,
      grammar: "Receive, forehead, hand, buy, sell, number. Ask what each meant in Scripture before it meant in Silicon Valley.",
    },
    puzzle: {
      type: "select",
      prompt: "Clear the misconceptions. Select what this investigation defends.",
      options: [
        { id: "a", label: "The mark is essentially allegiance in worship", correct: true },
        { id: "b", label: "A microchip is the only possible fulfilment", correct: false },
        { id: "c", label: "Forehead/hand already mean thought and action in Torah", correct: true },
        { id: "d", label: "People can currently 'have the mark' by using a bank card", correct: false },
      ],
      explanation: "You cleared the rumour table. The remaining file is worship and law.",
    },
    journalPrompt: "What evidence would you still need before accepting the SDA claim about Sabbath and the mark?",
    artifact: {
      id: "allegiance-file",
      title: "Mark / allegiance file",
      significance: "Rumour control plus the worship thesis.",
    },
    connections: [
      {
        targetExpeditionId: "sabbath-seal",
        relation: "counterfeit pair",
        explanation: "Seal and mark are a pair. Do not study one in isolation.",
      },
    ],
    alternativeView: {
      school: "Futurist",
      summary: "Literal future brand, often technological, under a world ruler.",
    },
    sdaConclusion:
      "The mark is enforced allegiance against God's law, centred in the worship of the Creator versus a counterfeit sabbath. It is not a random gadget.",
    learningObjective: "Refute gadget-only theories using Deuteronomy and Revelation 14, then state the SDA thesis as a thesis.",
  },
  {
    id: "three-messengers",
    sequence: 10,
    title: "The Three Messengers",
    shortTitle: "Angels",
    scriptureRange: "Rev 14:6-12",
    environment: "Sky / world-message sequence",
    openingQuestion: "What message must reach the whole world?",
    visualArc: "gold",
    map: { x: 84, y: 52 },
    geoIds: [],
    prerequisites: ["the-mark"],
    overview:
      "Three mid-heaven proclamations: everlasting gospel and Creator-judgment; Babylon's fall; the mark warning. This is the remnant's brief.",
    scenes: [
      {
        id: "first",
        title: "First angel",
        scripture: "Rev 14:6-7",
        body: "Eternal gospel. Hour of judgment. Worship the Maker of heaven, earth, sea, and fountains. Creation language is Sabbath language.",
      },
      {
        id: "second",
        title: "Second angel",
        scripture: "Rev 14:8",
        body: "Fallen, fallen is Babylon. A system intoxicated nations. Later expanded in chapters 17–18.",
      },
      {
        id: "third",
        title: "Third angel",
        scripture: "Rev 14:9-12",
        body: "The sharpest warning in Scripture sits next to patient saints. Fear-preaching without the Lamb is a counterfeit of this message.",
      },
    ],
    evidence: [
      {
        id: "gospel",
        layer: "text",
        title: "Gospel first",
        body: "The sequence is gospel → critique of Babylon → warning. Rearranging the order produces a different religion.",
      },
      {
        id: "sda-3ang",
        layer: "sda",
        title: "Identity brief",
        body: "Seventh-day Adventists take these three messages as their global assignment: judgment-hour gospel, exit from confusion, commandment-keeping faith of Jesus.",
      },
    ],
    decoderNotes: method,
    puzzle: {
      type: "order",
      prompt: "Assemble the field brief in canonical order.",
      options: [
        { id: "gospel", label: "Everlasting gospel + Creator judgment" },
        { id: "babylon", label: "Babylon is fallen" },
        { id: "mark", label: "Do not receive the mark" },
      ],
      order: ["gospel", "babylon", "mark"],
      explanation: "The three-message brief is now in the kit.",
    },
    journalPrompt: "If this brief is for the whole world, what would humility look like in how you share it?",
    artifact: {
      id: "three-angels-brief",
      title: "Three-message field brief",
      significance: "The public identity of the remnant movement in SDA reading.",
    },
    connections: [
      {
        targetExpeditionId: "worship-question",
        relation: "synthesis",
        explanation: "The three angels name the real conflict: worship.",
      },
    ],
    alternativeView: {
      school: "Many Protestants",
      summary: "Often unread as a specific last-day movement brief; treated as general evangelism or future angelic events.",
    },
    sdaConclusion:
      "Revelation 14:6-12 is the last-day gospel assignment: Creator worship in the judgment hour, separation from Babylon, and refusal of the beast's mark.",
    learningObjective: "Recite the three messages in order and connect the first to Creation/Sabbath.",
  },
  {
    id: "sanctuary-vault",
    sequence: 11,
    title: "The Sanctuary Vault",
    shortTitle: "Sanctuary",
    scriptureRange: "Exod 25; Heb 8–9; Lev 16",
    environment: "Interactive sanctuary",
    openingQuestion: "What does the sanctuary ritual explain about sin, mercy, law and judgment?",
    visualArc: "gold",
    map: { x: 50, y: 52 },
    geoIds: ["jerusalem", "sinai"],
    prerequisites: ["three-messengers"],
    overview:
      "Courtyard, Holy Place, Most Holy Place. Lamb, priest, blood, ark, mercy seat. Understand the ritual before the date.",
    scenes: [
      {
        id: "court",
        title: "Courtyard",
        body: "Altar and laver. Sin is not ignored; it is confessed onto a substitute. Cheap grace skips this room.",
      },
      {
        id: "holy",
        title: "Holy Place",
        body: "Lamp, table, incense. Daily ministry: light, bread, prayer. Christ as priest is not an extra credit doctrine.",
      },
      {
        id: "most-holy",
        title: "Most Holy Place",
        scripture: "Lev 16",
        body: "Once a year: mercy seat, law beneath, blood above. Judgment and mercy occupy the same furniture.",
      },
    ],
    evidence: [
      {
        id: "heb8",
        layer: "text",
        title: "Copy and shadow",
        scripture: "Heb 8:1-5",
        body: "The earthly tent points to a heavenly ministry. The letter to the Hebrews is required, not optional.",
      },
      {
        id: "sda-sanc",
        layer: "sda",
        title: "Two apartments, two phases",
        body: "SDA reading: Christ's heavenly ministry has a holy-place phase and a most-holy-place / Day of Atonement phase. 1844 names the transition. First understand the rooms.",
      },
    ],
    decoderNotes: method,
    puzzle: {
      type: "order",
      prompt: "Walk the sanctuary in ritual order.",
      options: [
        { id: "court", label: "Courtyard — altar" },
        { id: "holy", label: "Holy Place — daily" },
        { id: "most", label: "Most Holy Place — yearly" },
      ],
      order: ["court", "holy", "most"],
      explanation: "You recovered the sanctuary schema. Dates come after furniture.",
    },
    journalPrompt: "What happens to your picture of God if mercy sits above the law, not instead of it?",
    artifact: {
      id: "sanctuary-schema",
      title: "Sanctuary schema",
      significance: "Spatial theology for the 2300-day chamber.",
    },
    connections: [
      {
        targetExpeditionId: "2300-day-code",
        relation: "why the date matters",
        explanation: "Daniel 8:14 is a sanctuary sentence before it is a calendar sentence.",
      },
    ],
    alternativeView: {
      school: "Much of Protestantism",
      summary: "Often a completed atonement on the cross with no two-phase heavenly ministry. Record the disagreement honestly.",
    },
    sdaConclusion:
      "The sanctuary explains the gospel as substitution, priestly mediation, and a final Day of Atonement that vindicates God and his people.",
    learningObjective: "Name the three spaces and their gospel function before discussing 1844.",
  },
  {
    id: "2300-day-code",
    sequence: 12,
    title: "The 2300-Day Code",
    shortTitle: "1844",
    scriptureRange: "Dan 8–9",
    environment: "Chronology puzzle chamber",
    openingQuestion: "How does the prophetic period terminate in 1844?",
    visualArc: "gold",
    map: { x: 16, y: 52 },
    geoIds: [],
    prerequisites: ["sanctuary-vault"],
    overview:
      "2300 evenings-mornings. 70 weeks cut off. 457 BC. AD 27, 31, 34. Then 1844. Day-year arithmetic in public, with its disputes in public too.",
    scenes: [
      {
        id: "question",
        title: "How long?",
        scripture: "Dan 8:13-14",
        body: "The question is about the sanctuary and the transgression that desolates. The answer is 2300 evenings-mornings; then the sanctuary shall be cleansed / restored to its rightful state.",
      },
      {
        id: "cut-off",
        title: "Cut off for the people",
        scripture: "Dan 9:24-27",
        body: "Seventy weeks are determined (cut off) for Daniel's people. Historicists cut them from the 2300, starting the same decree.",
      },
    ],
    evidence: [
      {
        id: "457",
        layer: "history",
        title: "The 457 BC decree",
        body: "Artaxerxes' seventh year (Ezra 7) is the historicist start: restore and build Jerusalem with civil authority, not merely a temple permit.",
      },
      {
        id: "math",
        layer: "sda",
        title: "The arithmetic",
        body: "457 BC + 2300 years lands in 1844 (no year zero). 69 weeks (483 years) land at AD 27. Mid-week AD 31. 70 weeks close AD 34. The Millerites expected the Advent; SDA reread the event as heavenly Day of Atonement.",
      },
      {
        id: "critique",
        layer: "alternative",
        title: "Critiques to keep on the table",
        body: "Many scholars read 2300 as literal days under Antiochus IV, or reject day-year. A serious historicist can show the math and the objections.",
      },
    ],
    decoderNotes: {
      ...method,
      classification: "Apocalyptic time: day-year is the SDA key. State it as a key, then test it against Daniel 9's fulfilled messianic week.",
    },
    puzzle: {
      type: "identify",
      prompt: "If 457 BC starts the 2300 years, and there is no year zero, the terminus is…",
      options: [
        { id: "1843", label: "1843" },
        { id: "1844", label: "1844", correct: true },
        { id: "1798", label: "1798" },
        { id: "1914", label: "1914" },
      ],
      explanation: "The 1844 chronometer is in the kit. Pair it with the sanctuary, not with a failed date for the Advent.",
    },
    journalPrompt: "The first readers of 1844 were disappointed. What does intellectual honesty look like after a wrong expectation?",
    artifact: {
      id: "chronometer",
      title: "1844 Chronometer",
      significance: "Date, sanctuary, and judgment tied together.",
    },
    connections: [
      {
        targetExpeditionId: "worship-question",
        relation: "judgment hour",
        explanation: "The first angel's 'hour of his judgment' is this light in SDA reading.",
      },
    ],
    alternativeView: {
      school: "Historical-critical / preterist",
      summary: "2300 as Antiochus; no 1844. Futurists may restart the 70th week after a gap.",
    },
    sdaConclusion:
      "The 2300 days end in 1844 with the beginning of the investigative judgment / cleansing of the heavenly sanctuary.",
    learningObjective: "Reproduce the 457–1844 arithmetic and distinguish it from the Second Coming.",
  },
  {
    id: "worship-question",
    sequence: 13,
    title: "The Worship Question",
    shortTitle: "Worship",
    scriptureRange: "Rev 12–14 synthesis",
    environment: "Evidence convergence room",
    openingQuestion: "What is this conflict really about?",
    visualArc: "gold",
    map: { x: 16, y: 40 },
    geoIds: [],
    prerequisites: ["2300-day-code"],
    overview:
      "Dragon, beasts, mark, angels, Creator, commandments. The objects physically converge until the word WORSHIP is unavoidable.",
    scenes: [
      {
        id: "converge",
        title: "The table fills",
        body: "If you only collect monsters, you will miss the plot. Every line is about who is worthy.",
      },
    ],
    evidence: [
      {
        id: "rev13w",
        layer: "text",
        title: "Who will you worship?",
        scripture: "Rev 13:4,8,12,15",
        body: "The word keeps repeating. The beast crisis is a worship crisis.",
      },
      {
        id: "rev14w",
        layer: "sda",
        title: "Creator versus coercion",
        body: "Revelation 14 answers Revelation 13. The Lamb's people worship the Maker; the beast's people worship the image.",
      },
    ],
    decoderNotes: method,
    puzzle: {
      type: "identify",
      prompt: "Name the synthesis this chamber is built to discover.",
      options: [
        { id: "war", label: "Military victory charts" },
        { id: "worship", label: "Worship — who deserves humanity's allegiance", correct: true },
        { id: "dates", label: "Dates for their own sake" },
      ],
      explanation: "The larger case of the whole world is allegiance.",
    },
    journalPrompt: "Who deserves humanity's allegiance — and why? Answer without using the word 'because I was told.'",
    artifact: {
      id: "worship-key",
      title: "Worship keystone",
      significance: "Central synthesis of Revelation 12–14.",
    },
    connections: [
      {
        targetExpeditionId: "sabbath-seal",
        relation: "how worship is signed",
        explanation: "Sabbath becomes relevant because Creation became relevant.",
      },
    ],
    alternativeView: {
      school: "Idealist",
      summary: "Worship as a timeless heart-issue only, without historicist institutions. Still a true layer — incomplete as a total map.",
    },
    sdaConclusion:
      "The Great Controversy in Revelation 12–14 is about worship: Creator versus dragon-backed counterfeit.",
    learningObjective: "State the central question of the whole expedition in one sentence.",
  },
  {
    id: "sabbath-seal",
    sequence: 14,
    title: "The Sabbath Seal",
    shortTitle: "Sabbath",
    scriptureRange: "Gen 2; Exod 20; Rev 7; 14",
    environment: "Return-to-origin chamber",
    openingQuestion: "Why does Creation become relevant to the final worship crisis?",
    visualArc: "gold",
    map: { x: 50, y: 40 },
    geoIds: ["sinai"],
    prerequisites: ["worship-question"],
    overview:
      "Creation → Creator → sovereignty → law → Sabbath → worship → Revelation 14. Earlier Bible comes back online.",
    scenes: [
      {
        id: "chain",
        title: "The chain",
        scripture: "Exod 20:8-11; Rev 14:6-7",
        body: "The Sabbath commandment and the first angel use the same creation formula: heaven, earth, sea. That is not a coincidence in a book obsessed with worship.",
      },
    ],
    evidence: [
      {
        id: "sign",
        layer: "text",
        title: "A sign between",
        scripture: "Exod 31:13; Ezek 20:12,20",
        body: "Sabbath is already called a sign of who sanctifies whom.",
      },
      {
        id: "seal-sda",
        layer: "sda",
        title: "Seal versus mark",
        body: "The seal of God in the forehead is loyal belief in the Creator, expressed in the Sabbath as his authority-sign, when the issue is forced. Until then, it is light to walk in, not a panic.",
      },
    ],
    decoderNotes: method,
    puzzle: {
      type: "order",
      prompt: "Reconstruct the recapitulation chain.",
      options: [
        { id: "creation", label: "Creation" },
        { id: "creator", label: "Creator's claim" },
        { id: "law", label: "Law" },
        { id: "sabbath", label: "Sabbath sign" },
        { id: "rev14", label: "Revelation 14 call" },
      ],
      order: ["creation", "creator", "law", "sabbath", "rev14"],
      explanation: "Genesis is now a last-day book.",
    },
    journalPrompt: "What would it mean to receive the Sabbath as gift rather than as a club?",
    artifact: {
      id: "sabbath-seal-sigil",
      title: "Sabbath seal sigil",
      significance: "Creator worship made visible.",
    },
    connections: [
      {
        targetExpeditionId: "the-mark",
        relation: "pair",
        explanation: "New connection available: mark chamber glows.",
      },
    ],
    alternativeView: {
      school: "Most Sunday-keeping Christians",
      summary: "Lord's Day as resurrection memorial; Sabbath fulfilled in Christ. The disagreement should be described fairly.",
    },
    sdaConclusion:
      "In the end-time worship crisis the Sabbath functions as the seal-sign of the Creator's authority, paired against the mark.",
    learningObjective: "Show the verbal link between Exodus 20:11 and Revelation 14:7.",
  },
  {
    id: "seven-vials",
    sequence: 15,
    title: "The Seven Vials",
    shortTitle: "Plagues",
    scriptureRange: "Rev 15–16",
    environment: "Crisis world map",
    openingQuestion: "What happens when rejection of God's government reaches its final consequence?",
    visualArc: "babylon",
    map: { x: 84, y: 40 },
    geoIds: [],
    prerequisites: ["sabbath-seal"],
    overview:
      "Seven bowls. No more thirds. The tone is justice, not entertainment. Each plague rhymes with earlier warnings.",
    scenes: [
      {
        id: "song",
        title: "Song of Moses and the Lamb",
        scripture: "Rev 15:3-4",
        body: "Before bowls, a song about just and true ways. If you cannot sing that, you are not ready to study plagues.",
      },
    ],
    evidence: [
      {
        id: "exodus",
        layer: "text",
        title: "Exodus echo",
        body: "Sores, blood, darkness, frogs: the last crisis remembers Egypt. The point is liberation and judgment, not gore.",
      },
      {
        id: "sda-plagues",
        layer: "sda",
        title: "After close of probation",
        body: "SDA reading: the seven last plagues fall after human probation closes. They are not evangelistic scare-effects for scoring points.",
      },
    ],
    decoderNotes: method,
    puzzle: {
      type: "select",
      prompt: "How should this chamber be studied?",
      options: [
        { id: "a", label: "As theological justice and the cost of entrenched rebellion", correct: true },
        { id: "b", label: "As a reward animation for completing earlier levels", correct: false },
      ],
      explanation: "Restraint is a learning objective.",
    },
    journalPrompt: "What would it mean to love justice without loving anyone's destruction?",
    artifact: {
      id: "vial-set",
      title: "Bowl warnings",
      significance: "Links back to trumpets and to the worship decision.",
    },
    connections: [
      {
        targetExpeditionId: "trumpet-trail",
        relation: "intensification",
        explanation: "Trumpets warned; bowls complete.",
      },
    ],
    alternativeView: {
      school: "Futurist",
      summary: "Literal future ecological collapse during a short tribulation.",
    },
    sdaConclusion:
      "The bowls are God's final, unmixed judgments after the worship lines are drawn — moral consequence, not spectacle.",
    caution: "No destruction-as-entertainment.",
    learningObjective: "Contrast trumpets (warning) and bowls (completion) without graphic fascination.",
  },
  {
    id: "mystery-babylon",
    sequence: 16,
    title: "Mystery Babylon",
    shortTitle: "Babylon",
    scriptureRange: "Rev 17",
    environment: "Decoding hall / opulent ruin",
    openingQuestion: "Who is the woman on the scarlet beast?",
    visualArc: "babylon",
    map: { x: 84, y: 28 },
    geoIds: ["babylon", "rome"],
    prerequisites: ["seven-vials"],
    overview:
      "Purple, scarlet, cup, waters, seven heads, ten horns, blood of saints. Distinguish symbol, text, and historicist application.",
    scenes: [
      {
        id: "woman17",
        title: "The other woman",
        scripture: "Rev 17:1-6",
        body: "She sits on many waters. She is drunk with the blood of the saints. Recapitulation: Revelation 12 inverted.",
      },
      {
        id: "heads",
        title: "Heads are hills and kings",
        scripture: "Rev 17:9-11",
        body: "The text interprets itself more than most chapters. Seven mountains. A city that reigned over the kings of the earth.",
      },
    ],
    evidence: [
      {
        id: "city",
        layer: "text",
        title: "The woman is a city",
        scripture: "Rev 17:18",
        body: "The woman you saw is the great city. Start there.",
      },
      {
        id: "rome-sda",
        layer: "sda",
        title: "Historicist city",
        body: "John's first readers could hear Rome. Historicists hear Rome's religious continuation and an end-time coalition of apostate religion. Again: systems, not Catholic persons as such.",
      },
    ],
    decoderNotes: method,
    puzzle: {
      type: "select",
      prompt: "What must a careful wall include?",
      options: [
        { id: "a", label: "The angel's own interpretation (city, waters, heads)", correct: true },
        { id: "b", label: "The contrast with the woman of Revelation 12", correct: true },
        { id: "c", label: "Permission to hate ordinary believers of another church", correct: false },
      ],
      explanation: "A large evidence wall, with moral boundaries.",
    },
    journalPrompt: "Where is 'Babylon' a useful diagnosis of confusion, and where is it a lazy insult?",
    artifact: {
      id: "babylon-wall",
      title: "Babylon evidence wall",
      significance: "Symbol, text, application, and ethics in one artefact.",
    },
    connections: [
      {
        targetExpeditionId: "woman-dragon",
        relation: "recapitulation",
        explanation: "New connection available on the woman symbol.",
      },
    ],
    alternativeView: {
      school: "Preterist / futurist",
      summary: "Rome of the Caesars only, or a future rebuilt Babylon / world council.",
    },
    sdaConclusion:
      "Babylon is the apostate religious-political system centred historically in Rome and expanded in the end to a global coalition. The call is to come out.",
    caution: "Do not collapse 'Babylon' into an ethnic or neighbour-shaped slur.",
    learningObjective: "Build the wall: text's own keys, then historicist application, then ethics.",
  },
  {
    id: "fall-of-babylon",
    sequence: 17,
    title: "The Fall of Babylon",
    shortTitle: "Collapse",
    scriptureRange: "Rev 18",
    environment: "Prosperous city collapsing",
    openingQuestion: "Why does a seemingly invulnerable system collapse so quickly?",
    visualArc: "babylon",
    map: { x: 50, y: 28 },
    geoIds: [],
    prerequisites: ["mystery-babylon"],
    overview:
      "Kings, merchants, sailors. A dependency network. Pull the centre and watch the cascade. Hear 'come out of her, my people.'",
    scenes: [
      {
        id: "network",
        title: "Trade and throne",
        scripture: "Rev 18:9-19",
        body: "Religion, luxury, and power have a shared ledger. The lament is economic as well as liturgical.",
      },
    ],
    evidence: [
      {
        id: "comeout",
        layer: "text",
        title: "Come out",
        scripture: "Rev 18:4",
        body: "The opposite of gloating. Rescue language.",
      },
    ],
    decoderNotes: method,
    puzzle: {
      type: "identify",
      prompt: "The fall is sudden because…",
      options: [
        { id: "a", label: "God is arbitrary" },
        { id: "b", label: "The network was always dependent and brittle", correct: true },
        { id: "c", label: "The merchants were the true saints" },
      ],
      explanation: "Cascade collapse is a moral-economic reading, not schadenfreude.",
    },
    journalPrompt: "What would 'come out' mean without becoming proud that you already 'left'?",
    artifact: {
      id: "network-chart",
      title: "Babylon network chart",
      significance: "Shows collapse as unmasked dependence.",
    },
    connections: [],
    alternativeView: {
      school: "Various",
      summary: "Literal future city destruction versus symbolic end of a world-system.",
    },
    sdaConclusion:
      "Babylon's fall is the sudden unveiling that a coercive religious-economic system cannot hold. The pastoral word is 'come out.'",
    learningObjective: "Explain collapse as network failure plus divine sentence, and keep the 'come out' tone.",
  },
  {
    id: "return-of-the-king",
    sequence: 18,
    title: "The Return of the King",
    shortTitle: "Advent",
    scriptureRange: "Rev 19",
    environment: "Cinematic final approach",
    openingQuestion: "Who is the rider, and what changes when Christ returns?",
    visualArc: "cinematic",
    map: { x: 16, y: 28 },
    geoIds: [],
    prerequisites: ["fall-of-babylon"],
    overview:
      "From Lamb and Priest to King of kings. White horse, faithful and true. The map contracts toward Revelation 20.",
    scenes: [
      {
        id: "rider",
        title: "A name written",
        scripture: "Rev 19:11-16",
        body: "The same Jesus. Different office in the visual memory: not a new Christ.",
      },
    ],
    evidence: [
      {
        id: "visible",
        layer: "sda",
        title: "Literal advent",
        scripture: "Rev 1:7; 19:11-16",
        body: "Personal, visible, glorious. SDA reading rejects a secret rapture as the church's disappearance trick.",
      },
    ],
    decoderNotes: method,
    puzzle: {
      type: "select",
      prompt: "The rider is…",
      options: [
        { id: "a", label: "A different messiah from the Lamb", correct: false },
        { id: "b", label: "Jesus Christ, now revealed as King of kings", correct: true },
      ],
      explanation: "Office shift, not identity shift.",
    },
    journalPrompt: "If the King is also the Lamb, how should that govern Christian hope?",
    artifact: {
      id: "rider-standard",
      title: "King's standard",
      significance: "Visual memory update: Lamb and Rider are one.",
    },
    connections: [],
    alternativeView: {
      school: "Dispensational",
      summary: "Often a two-stage coming (rapture then revelation). Compare 1 Thess 4 and Rev 19 in the lab.",
    },
    sdaConclusion:
      "The Second Coming is a single, visible, climactic appearing of Jesus as King, after which the millennium of Revelation 20 begins.",
    learningObjective: "Identify the Rider with the Lamb and reject a divided Christ.",
  },
  {
    id: "thousand-years",
    sequence: 19,
    title: "The Thousand Years",
    shortTitle: "Millennium",
    scriptureRange: "Rev 20:1-10",
    environment: "Between two resurrections",
    openingQuestion: "What actually happens during the millennium?",
    visualArc: "judicial",
    map: { x: 16, y: 16 },
    geoIds: [],
    prerequisites: ["return-of-the-king"],
    overview:
      "First resurrection, thousand years, Satan bound, second resurrection, final gathering. Stand between the two risings.",
    scenes: [
      {
        id: "bind",
        title: "Bound by emptiness",
        scripture: "Rev 20:1-3",
        body: "A chain and a pit. SDA reading: Satan is bound by the desolation of earth after the Advent — no one left to deceive — not a literal tourist-free picnic in a literal cave only.",
      },
    ],
    evidence: [
      {
        id: "two-res",
        layer: "text",
        title: "Two resurrections",
        scripture: "Rev 20:4-6,12-13; John 5:28-29",
        body: "Blessed is the one who shares in the first resurrection. The rest of the dead live not until the thousand years end.",
      },
      {
        id: "sda-mill",
        layer: "sda",
        title: "Where are the saints?",
        body: "With Christ in heaven during the thousand years; earth lies desolate (Jer 4 imagery often paired). Judgment of the lost is reviewed. Then descent of the city.",
      },
    ],
    decoderNotes: method,
    puzzle: {
      type: "order",
      prompt: "Place the millennial sequence.",
      options: [
        { id: "first", label: "First resurrection / Advent" },
        { id: "thousand", label: "Thousand years" },
        { id: "second", label: "Second resurrection" },
        { id: "last", label: "Final gathering and fire" },
      ],
      order: ["first", "thousand", "second", "last"],
      explanation: "You are standing between two resurrections.",
    },
    journalPrompt: "Who / where / when — write three short answers for the millennium.",
    artifact: {
      id: "two-horizon",
      title: "Two-resurrection horizon",
      significance: "A timeline you can stand inside.",
    },
    connections: [
      {
        targetExpeditionId: "death-of-death",
        relation: "sequence",
        explanation: "Millennium only works if death is sleep until resurrection.",
      },
    ],
    alternativeView: {
      school: "Augustine / amillennial; premillennial futurist",
      summary: "The thousand years as the church age, or as a golden age on earth after Christ returns with mixed survivors.",
    },
    sdaConclusion:
      "Premillennial: saints in heaven, earth desolate, Satan bound, then second resurrection and last assault before the New Jerusalem scene.",
    learningObjective: "Answer who, where, and when for the thousand years in the SDA sequence.",
  },
  {
    id: "final-case",
    sequence: 20,
    title: "The Final Case",
    shortTitle: "Judgment",
    scriptureRange: "Rev 20:11-15",
    environment: "Court / infinite archive",
    openingQuestion: "How does the final judgment work?",
    visualArc: "judicial",
    map: { x: 50, y: 16 },
    geoIds: [],
    prerequisites: ["thousand-years"],
    overview:
      "Books. Book of Life. The investigation metaphor reaches its payoff: the last scene is itself evidence-based judgment.",
    scenes: [
      {
        id: "books",
        title: "Opened books",
        scripture: "Rev 20:12",
        body: "The dead are judged from what is written. God is not improvising. The Lamb still stands in the logic of the book.",
      },
    ],
    evidence: [
      {
        id: "life",
        layer: "text",
        title: "The decisive book",
        scripture: "Rev 20:15",
        body: "Not in the Book of Life: the lake of fire. The question is belonging, not trivia scores.",
      },
    ],
    decoderNotes: method,
    puzzle: {
      type: "identify",
      prompt: "The last court is primarily…",
      options: [
        { id: "a", label: "A talent show" },
        { id: "b", label: "An evidence archive about allegiance to the Lamb", correct: true },
      ],
      explanation: "The expedition has been practicing for this metaphor all along.",
    },
    journalPrompt: "What would it mean to trust a judgment that is both just and cruciform?",
    artifact: {
      id: "book-of-life-file",
      title: "Book of Life case file",
      significance: "The ultimate artefact of belonging.",
    },
    connections: [],
    alternativeView: {
      school: "Various",
      summary: "Some collapse judgment into death; some spread it into many secret courts. Revelation's image is public and bookish.",
    },
    sdaConclusion:
      "Executive judgment after the millennium is public, just, and decided by the Book of Life — the Lamb's register.",
    learningObjective: "Explain why an investigation aesthetic fits Revelation 20 without making salvation a puzzle grade.",
  },
  {
    id: "death-of-death",
    sequence: 21,
    title: "The Death of Death",
    shortTitle: "Death",
    scriptureRange: "Rev 20; Eccl 9; 1 Thess 4",
    environment: "Logic reconstruction chamber",
    openingQuestion: "How do resurrection, judgment, second death, hell and the soul fit together?",
    visualArc: "judicial",
    map: { x: 84, y: 16 },
    geoIds: [],
    prerequisites: ["final-case"],
    overview:
      "Arrange the sequence: death → resurrection → judgment → second death. Test claims of a naturally immortal soul.",
    scenes: [
      {
        id: "sleep",
        title: "The dead know not",
        scripture: "Eccl 9:5-6; John 11:11-14",
        body: "Scripture's ordinary language is sleep. Exceptions (Samuel's scene, Lazarus parable) must not overthrow the rule without work.",
      },
    ],
    evidence: [
      {
        id: "immortal",
        layer: "text",
        title: "Who alone has immortality",
        scripture: "1 Tim 6:16; Rom 2:7",
        body: "Immortality is God's, and a gift, not a human default.",
      },
      {
        id: "sda-sod",
        layer: "sda",
        title: "Conditional immortality",
        body: "The soul is not an independently conscious immortal entity. Hell is the second death, not eternal torment of undying souls. This is a minority view in global Christianity; present it as such.",
      },
    ],
    decoderNotes: method,
    puzzle: {
      type: "order",
      prompt: "Arrange the SDA biblical sequence.",
      options: [
        { id: "death", label: "Death as sleep" },
        { id: "res", label: "Resurrection" },
        { id: "jud", label: "Judgment" },
        { id: "second", label: "Second death for the lost" },
      ],
      order: ["death", "res", "jud", "second"],
      explanation: "The competing sequences are now visible.",
    },
    journalPrompt: "What pastoral difference does 'sleep until resurrection' make at a funeral?",
    artifact: {
      id: "sequence-keys",
      title: "Life-death sequence keys",
      significance: "Stops Revelation 20 from being read through Plato.",
    },
    connections: [
      {
        targetExpeditionId: "sealed-scroll",
        relation: "fifth seal",
        explanation: "Souls under the altar are a sanctuary image, not a tour of heaven.",
      },
    ],
    alternativeView: {
      school: "Mainstream immortal-soul",
      summary: "Conscious dead in heaven/hell immediately. Historic Protestant and Catholic majority. Describe it fairly, then show the SDA counter-texts.",
    },
    sdaConclusion:
      "Humans are mortal; the dead sleep; the wicked perish in the second death after judgment; eternal life is always a gift in Christ.",
    learningObjective: "Contrast conditional immortality with immortal-soul sequences using Scripture.",
  },
  {
    id: "lost-city",
    sequence: 22,
    title: "The Lost City Found",
    shortTitle: "City",
    scriptureRange: "Rev 21",
    environment: "Luminous city exploration",
    openingQuestion: "Where has the entire expedition been heading?",
    visualArc: "luminous",
    map: { x: 66, y: 6 },
    geoIds: ["jerusalem"],
    prerequisites: ["death-of-death"],
    overview:
      "The dusty archive lighting fails on purpose. Gates, foundations, measurements, God with humanity. Not a buried city — a descending one.",
    scenes: [
      {
        id: "descend",
        title: "Coming down",
        scripture: "Rev 21:1-4",
        body: "Behold, the dwelling of God is with man. The investigation's prize was never a secret chart. It was this sentence.",
      },
    ],
    evidence: [
      {
        id: "no-temple",
        layer: "text",
        title: "No temple",
        scripture: "Rev 21:22",
        body: "The Lord God and the Lamb are its temple. Sanctuary language completes, it does not vanish without meaning.",
      },
    ],
    decoderNotes: method,
    puzzle: {
      type: "identify",
      prompt: "The lost city is found by…",
      options: [
        { id: "dig", label: "Digging it out of the earth" },
        { id: "down", label: "Watching God make his home with humanity", correct: true },
      ],
      explanation: "Emotional and visual payoff: light replaces dust.",
    },
    journalPrompt: "If God will dwell with humanity, what kind of person are you becoming for that city?",
    artifact: {
      id: "city-map",
      title: "New Jerusalem map",
      significance: "The destination artefact.",
    },
    connections: [
      {
        targetExpeditionId: "interpreters-chamber",
        relation: "why method mattered",
        explanation: "The chamber's last wall: why any of this matters.",
      },
    ],
    alternativeView: {
      school: "Symbolic-only",
      summary: "The city as the church in the present. Historicists do not deny present communion, but they will not cancel a real new world.",
    },
    sdaConclusion:
      "The New Jerusalem is the real home of the redeemed on a renewed earth, God dwelling with humanity.",
    learningObjective: "Describe the visual-theological shift from ruins to unborrowed light.",
  },
  {
    id: "the-beginning",
    sequence: 23,
    title: "The Beginning",
    shortTitle: "Invitation",
    scriptureRange: "Rev 22",
    environment: "Open luminous world",
    openingQuestion: "Is this really the end?",
    visualArc: "luminous",
    map: { x: 34, y: 6 },
    geoIds: [],
    prerequisites: ["lost-city"],
    overview:
      "River, tree of life, no curse, God's face, a continued invitation. Close the journal: expedition complete. The story is not.",
    scenes: [
      {
        id: "tree",
        title: "Eden unbarred",
        scripture: "Rev 22:1-5",
        body: "The tree returns. Leaves for the healing of the nations. Growth is not over.",
      },
      {
        id: "come",
        title: "The Spirit and the bride say come",
        scripture: "Rev 22:17",
        body: "The last move is invitation, not a locked trophy room.",
      },
    ],
    evidence: [
      {
        id: "curse",
        layer: "text",
        title: "No more curse",
        scripture: "Rev 22:3",
        body: "Genesis 3 is not the last authors of the human story.",
      },
    ],
    decoderNotes: method,
    puzzle: {
      type: "reflect",
      prompt: "There is no trap here. Write the last field note: what remains unfinished in you?",
      explanation: "The story is not over. That is the point.",
      options: [{ id: "note", label: "I will keep investigating and keep the invitation", correct: true }],
    },
    journalPrompt: "Expedition complete. The story is not. What will you keep, and what will you refuse to weaponise?",
    artifact: {
      id: "open-journal",
      title: "Unclosed journal",
      significance: "Witness rank is invitation, not graduation from needing grace.",
    },
    connections: [],
    alternativeView: {
      school: "All disciples",
      summary: "Every Christian school can say Amen to 'Come, Lord Jesus' even while arguing maps.",
    },
    sdaConclusion:
      "Revelation ends in restoration, healing, and an open invitation. The Great Controversy closes with God-with-us, not with the beast's biography.",
    learningObjective: "Close the arc: conflict was never the destination; dwelling is.",
  },
];

export function getExpedition(id: string) {
  return EXPEDITIONS.find((item) => item.id === id);
}

export function getNextExpedition(id: string) {
  const current = getExpedition(id);
  if (!current) return undefined;
  return EXPEDITIONS.find((item) => item.sequence === current.sequence + 1);
}
