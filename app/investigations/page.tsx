import Link from "next/link";
import { SignalFrame } from "@/components/SignalFrame";
import { INVESTIGATIONS } from "@/content/investigations";

export default function InvestigationsPage() {
  return (
    <div className="space-y-5">
      <div>
        <p className="neon-title text-[11px]">Public briefs</p>
        <h1 className="mt-2 font-display text-3xl text-white">Arrive by a question. Stay for the expedition.</h1>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {INVESTIGATIONS.map((item) => (
          <Link key={item.slug} href={`/investigations/${item.slug}`}>
            <SignalFrame className="h-full p-5 hover:border-signal/60">
              <p className="text-[10px] uppercase tracking-[0.18em] text-gold">{item.minutes} min</p>
              <h2 className="mt-2 font-display text-2xl text-white">{item.title}</h2>
              <p className="mt-2 text-sm text-parchment/75">{item.question}</p>
            </SignalFrame>
          </Link>
        ))}
      </div>
    </div>
  );
}
