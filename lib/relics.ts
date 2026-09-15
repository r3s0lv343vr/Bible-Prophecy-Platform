import { SITES } from "@/content/sites";

export type Relic = {
  id: string;
  title: string;
  image?: string;
  source: string;
  date?: string;
  culture?: string;
  url: string;
  kind: "object" | "site";
  siteId?: string;
};

async function safeJson(url: string) {
  const res = await fetch(url, {
    next: { revalidate: 3600 },
    headers: { "User-Agent": "RevelationExpedition/0.1 educational-research" },
  });
  if (!res.ok) throw new Error("fetch failed");
  return res.json();
}

async function metRelics(query: string): Promise<Relic[]> {
  try {
    const search = await safeJson(
      `https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=${encodeURIComponent(query)}`,
    );
    const ids: number[] = (search.objectIDs ?? []).slice(0, 8);
    const objects = await Promise.all(
      ids.map(async (id): Promise<Relic | null> => {
        try {
          const item = await safeJson(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`);
          if (!item.primaryImageSmall && !item.primaryImage) return null;
          return {
            id: `met-${id}`,
            title: item.title ?? "Untitled object",
            image: item.primaryImageSmall || item.primaryImage,
            source: "The Met",
            date: item.objectDate,
            culture: item.culture || item.period || item.department,
            url: item.objectURL || `https://www.metmuseum.org/art/collection/search/${id}`,
            kind: "object",
          };
        } catch {
          return null;
        }
      }),
    );
    return objects.filter((item): item is Relic => item !== null);
  } catch {
    return [];
  }
}

async function clevelandRelics(query: string): Promise<Relic[]> {
  try {
    const data = await safeJson(
      `https://openaccess-api.clevelandart.org/api/artworks/?q=${encodeURIComponent(query)}&has_image=1&limit=8`,
    );
    return (data.data ?? [])
      .map((item: { id: number; title: string; url?: string; creation_date?: string; culture?: string[]; images?: { web?: { url?: string } } }) => ({
        id: `cma-${item.id}`,
        title: item.title,
        image: item.images?.web?.url,
        source: "Cleveland Museum of Art",
        date: item.creation_date,
        culture: item.culture?.[0],
        url: item.url || `https://www.clevelandart.org/art/${item.id}`,
        kind: "object" as const,
      }))
      .filter((item: Relic) => item.image);
  } catch {
    return [];
  }
}

async function wikiSites(siteId?: string): Promise<Relic[]> {
  const chosen = siteId ? SITES.filter((s) => s.id === siteId) : SITES;
  const pages = await Promise.all(
    chosen.map(async (site) => {
      try {
        const data = await safeJson(
          `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(site.name)}&prop=pageimages|extracts|info&inprop=url&pithumbsize=800&exintro=1&explaintext=1&format=json`,
        );
        const page = Object.values(data.query?.pages ?? {})[0] as {
          title?: string;
          extract?: string;
          fullurl?: string;
          thumbnail?: { source?: string };
        };
        return {
          id: `site-${site.id}`,
          title: site.name,
          image: page?.thumbnail?.source,
          source: "Wikimedia / Wikipedia",
          culture: page?.extract?.slice(0, 160),
          url: page?.fullurl || `https://en.wikipedia.org/wiki/${encodeURIComponent(site.searchTerms[0])}`,
          kind: "site" as const,
          siteId: site.id,
        };
      } catch {
        return {
          id: `site-${site.id}`,
          title: site.name,
          source: "Field notes",
          culture: site.summary,
          url: `/relics?site=${site.id}`,
          kind: "site" as const,
          siteId: site.id,
        };
      }
    }),
  );
  return pages;
}

export async function getRelics(query = "ancient israel", siteId?: string) {
  const [met, cleveland, sites] = await Promise.all([
    metRelics(query),
    clevelandRelics(query),
    wikiSites(siteId),
  ]);
  return { objects: [...met, ...cleveland], sites, query };
}
