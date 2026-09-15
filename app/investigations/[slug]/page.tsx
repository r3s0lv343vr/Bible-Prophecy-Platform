import Link from "next/link";
import { notFound } from "next/navigation";
import { LayerChip, SignalFrame } from "@/components/SignalFrame";
import { INVESTIGATIONS, getInvestigation } from "@/content/investigations";

export function generateStaticParams() {
  return INVESTIGATIONS.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getInvestigation(slug);
  return { title: item?.title ?? "Brief", description: item?.question };
}

export default async function InvestigationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getInvestigation(slug);
  if (!item) notFound();
  return (
    <div className="space-y-5">
      <p className="neon-title text-[11px]">Interactive brief · {item.minutes} min</p>
      <h1 className="font-display text-4xl text-white">{item.title}</h1>
      <p className="text-xl text-signal">{item.question}</p>
      <p className="max-w-2xl text-sm leading-7 text-parchment/80">{item.summary}</p>
      {item.steps.map((step, index) => (
        <SignalFrame key={step.title} className="p-5">
          <p className="text-[10px] uppercase tracking-[0.18em] text-plasma">
            Step {index + 1}
          </p>
          <h2 className="mt-1 font-display text-2xl text-white">{step.title}</h2>
          {step.scripture ? <p className="text-xs text-gold">{step.scripture}</p> : null}
          <p className="mt-3 text-sm leading-7 text-parchment/85">{step.body}</p>
        </SignalFrame>
      ))}
      <div className="grid gap-4 md:grid-cols-2">
        <SignalFrame className="p-5">
          <div className="mb-2">
            <LayerChip layer="sda" />
          </div>
          <p className="text-sm leading-7 text-parchment/85">{item.sdaConclusion}</p>
        </SignalFrame>
        <SignalFrame className="p-5">
          <div className="mb-2">
            <LayerChip layer="alternative" />
          </div>
          {item.otherViews.map((view) => (
            <p key={view.school} className="mb-3 text-sm leading-6 text-parchment/80">
              <span className="text-gold">{view.school}: </span>
              {view.summary}
            </p>
          ))}
        </SignalFrame>
      </div>
      <Link
        href={`/expedition/${item.expeditionId}`}
        className="inline-block rounded-full bg-signal px-5 py-2 text-xs uppercase tracking-[0.18em] text-black"
      >
        Continue into the full chamber
      </Link>
    </div>
  );
}
