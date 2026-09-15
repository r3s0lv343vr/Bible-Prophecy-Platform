import { SITES } from "@/content/sites";

export type NewsItem = {
  title: string;
  link: string;
  source: string;
  published?: string;
  summary?: string;
  topic?: string;
};

const FEEDS = [
  { source: "Adventist Review", url: "https://adventistreview.org/feed/" },
  { source: "BBC World", url: "https://feeds.bbci.co.uk/news/world/rss.xml" },
  { source: "Archaeology Daily", url: "https://www.sciencedaily.com/rss/fossils_ruins/archaeology.xml" },
  { source: "NPR World", url: "https://feeds.npr.org/1004/rss.xml" },
];

const TOPIC_RULES: { topic: string; keys: string[] }[] = [
  { topic: "religious liberty", keys: ["religious freedom", "liberty of conscience", "persecution", "blasphemy"] },
  { topic: "archaeology", keys: ["archaeolog", "excavation", "artifact", "temple", "inscription", "relic"] },
  { topic: "middle east", keys: ["israel", "jerusalem", "gaza", "iran", "turkey", "egypt"] },
  { topic: "vatican / church", keys: ["vatican", "pope", "papal", "catholic", "adventist"] },
  { topic: "creation / sabbath", keys: ["sabbath", "creation", "sunday law"] },
];

function strip(value: string) {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/&#x([0-9a-f]+);/gi, (_, hex: string) => String.fromCharCode(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, num: string) => String.fromCharCode(Number(num)))
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tag(title: string, summary: string) {
  const hay = `${title} ${summary}`.toLowerCase();
  return TOPIC_RULES.find((rule) => rule.keys.some((key) => hay.includes(key)))?.topic;
}

function parseRss(xml: string, source: string): NewsItem[] {
  const blocks = [...xml.matchAll(/<item[\s\S]*?<\/item>/gi)];
  return blocks.slice(0, 12).map((block) => {
    const chunk = block[0];
    const title = strip(chunk.match(/<title>([\s\S]*?)<\/title>/i)?.[1] ?? "Untitled");
    const link = strip(
      chunk.match(/<link>([\s\S]*?)<\/link>/i)?.[1] ??
        chunk.match(/<guid[\s\S]*?>([\s\S]*?)<\/guid>/i)?.[1] ??
        "/news",
    );
    const summary = strip(chunk.match(/<description>([\s\S]*?)<\/description>/i)?.[1] ?? "").slice(0, 280);
    const published = strip(chunk.match(/<pubDate>([\s\S]*?)<\/pubDate>/i)?.[1] ?? "");
    return { title, link, source, summary, published, topic: tag(title, summary) };
  });
}

async function readFeed(url: string, source: string) {
  try {
    const res = await fetch(url, {
      next: { revalidate: 1800 },
      headers: { "User-Agent": "RevelationExpedition/0.1 research-archive" },
    });
    if (!res.ok) return [] as NewsItem[];
    const xml = await res.text();
    return parseRss(xml, source);
  } catch {
    return [] as NewsItem[];
  }
}

export async function getNews(): Promise<NewsItem[]> {
  const groups = await Promise.all(FEEDS.map((feed) => readFeed(feed.url, feed.source)));
  const merged = groups.flat();
  if (merged.length) return merged;
  return SITES.slice(0, 4).map((site) => ({
    title: `Research prompt: ${site.name} — ${site.summary}`,
    link: `/relics?site=${site.id}`,
    source: "archive",
    topic: "archaeology",
  }));
}
