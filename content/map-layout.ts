export const MAP_LAYOUT: Record<
  string,
  { x: number; y: number; place: string; land: string }
> = {
  "interpreters-chamber": { x: 148, y: 408, place: "Patmos", land: "Aegean exile" },
  "seven-cities": { x: 292, y: 348, place: "The seven cities", land: "Coast of Asia" },
  "throne-room": { x: 508, y: 96, place: "The throne", land: "Above the sea" },
  "sealed-scroll": { x: 628, y: 168, place: "The sealed scroll", land: "Unopened history" },
  "trumpet-trail": { x: 430, y: 248, place: "The trumpet road", land: "Empires in motion" },
  "woman-dragon": { x: 708, y: 214, place: "The woman and the dragon", land: "A war in the sky" },
  "sea-beast": { x: 792, y: 302, place: "The beast from the sea", land: "Crowded waters" },
  "earth-beast": { x: 888, y: 348, place: "The beast from the earth", land: "A newer shore" },
  "the-mark": { x: 852, y: 438, place: "The mark", land: "Allegiance" },
  "three-messengers": { x: 568, y: 148, place: "Three messengers", land: "Mid-heaven" },
  "sanctuary-vault": { x: 392, y: 168, place: "The sanctuary", land: "The pattern" },
  "2300-day-code": { x: 318, y: 118, place: "The long count", land: "Chronology" },
  "worship-question": { x: 508, y: 198, place: "The worship question", land: "The real conflict" },
  "sabbath-seal": { x: 238, y: 158, place: "The seal", land: "Beginning of the world" },
  "seven-vials": { x: 818, y: 188, place: "The last plagues", land: "Unmixed consequence" },
  "mystery-babylon": { x: 918, y: 248, place: "Mystery Babylon", land: "The other woman" },
  "fall-of-babylon": { x: 948, y: 168, place: "The fall", land: "A brittle network" },
  "return-of-the-king": { x: 698, y: 78, place: "The Rider", land: "The appearing" },
  "thousand-years": { x: 578, y: 52, place: "A thousand years", land: "Between two risings" },
  "final-case": { x: 468, y: 36, place: "The books", land: "The last court" },
  "death-of-death": { x: 348, y: 72, place: "Death of death", land: "The sequence" },
  "lost-city": { x: 198, y: 48, place: "The city", land: "Coming down" },
  "the-beginning": { x: 78, y: 78, place: "The beginning", land: "Tree and river" },
};

export type MapVisibility = "current" | "known" | "open" | "silhouette" | "fog";
