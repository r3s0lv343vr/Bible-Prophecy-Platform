"use client";

import Link from "next/link";
import type { ToolId } from "@/lib/tools";
import { SignalFrame } from "./SignalFrame";
import { useProgress } from "./ProgressProvider";

export function ToolGate({
  tool,
  teaser,
  children,
}: {
  tool: ToolId;
  teaser: string;
  children: React.ReactNode;
}) {
  const { progress } = useProgress();
  if (!(progress.unlockedTools ?? []).includes(tool)) {
    return (
      <SignalFrame className="p-8">
        <p className="text-[10px] uppercase tracking-[0.24em] text-gold">Not yet</p>
        <p className="mt-4 max-w-xl text-base leading-8 text-parchment/80">{teaser}</p>
        <Link href="/" className="mt-6 inline-block text-gold">
          Return to the expedition
        </Link>
      </SignalFrame>
    );
  }
  return children;
}
