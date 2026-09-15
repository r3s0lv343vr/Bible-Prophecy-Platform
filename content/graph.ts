export type GraphNode = {
  id: string;
  label: string;
  kind: "symbol" | "passage" | "claim" | "event";
};

export type GraphEdge = {
  from: string;
  to: string;
  relation: string;
};

export const GRAPH_NODES: GraphNode[] = [
  { id: "woman", label: "Woman", kind: "symbol" },
  { id: "rev12", label: "Revelation 12", kind: "passage" },
  { id: "church", label: "People of God", kind: "claim" },
  { id: "rev17", label: "Revelation 17", kind: "passage" },
  { id: "babylon", label: "Babylon", kind: "symbol" },
  { id: "dragon", label: "Dragon", kind: "symbol" },
  { id: "satan", label: "Satan named", kind: "claim" },
  { id: "rev13", label: "Revelation 13", kind: "passage" },
  { id: "sea-beast", label: "Sea beast", kind: "symbol" },
  { id: "earth-beast", label: "Earth beast", kind: "symbol" },
  { id: "worship", label: "Worship crisis", kind: "claim" },
  { id: "rev14", label: "Revelation 14", kind: "passage" },
  { id: "sabbath", label: "Sabbath / Creator", kind: "claim" },
  { id: "mark", label: "Mark", kind: "symbol" },
  { id: "seal", label: "Seal of God", kind: "symbol" },
  { id: "1844", label: "1844", kind: "event" },
  { id: "sanctuary", label: "Sanctuary", kind: "symbol" },
  { id: "dan8", label: "Daniel 8:14", kind: "passage" },
  { id: "judgment", label: "Judgment", kind: "claim" },
  { id: "rev20", label: "Revelation 20", kind: "passage" },
  { id: "eden", label: "Eden restored", kind: "claim" },
  { id: "rev21", label: "Revelation 21–22", kind: "passage" },
];

export const GRAPH_EDGES: GraphEdge[] = [
  { from: "woman", to: "rev12", relation: "appears in" },
  { from: "rev12", to: "church", relation: "historicist: faithful community" },
  { from: "woman", to: "rev17", relation: "recapitulated as opposite" },
  { from: "rev17", to: "babylon", relation: "named" },
  { from: "dragon", to: "rev12", relation: "hunts the woman" },
  { from: "rev12", to: "satan", relation: "12:9 identity confirmed" },
  { from: "dragon", to: "rev13", relation: "gives power" },
  { from: "rev13", to: "sea-beast", relation: "first beast" },
  { from: "rev13", to: "earth-beast", relation: "second beast" },
  { from: "earth-beast", to: "mark", relation: "enforces" },
  { from: "rev14", to: "worship", relation: "three messages" },
  { from: "rev14", to: "sabbath", relation: "Creator call" },
  { from: "mark", to: "seal", relation: "counterfeit pair" },
  { from: "seal", to: "sabbath", relation: "SDA synthesis" },
  { from: "dan8", to: "1844", relation: "day-year terminus" },
  { from: "1844", to: "sanctuary", relation: "cleansing" },
  { from: "sanctuary", to: "judgment", relation: "Day of Atonement" },
  { from: "rev20", to: "judgment", relation: "great white throne" },
  { from: "rev21", to: "eden", relation: "tree and river return" },
  { from: "worship", to: "rev13", relation: "coercion" },
  { from: "worship", to: "rev14", relation: "invitation" },
];
