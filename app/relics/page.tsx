"use client";

import { Suspense } from "react";
import { RelicGallery } from "@/components/RelicGallery";
import { ToolGate } from "@/components/ToolGate";

export default function RelicsPage() {
  return (
    <ToolGate tool="relics" teaser="Relics are finds from the trail, not a second expedition. Walk the seven cities first.">
      <Suspense fallback={<p className="text-signal">Aligning map coordinates…</p>}>
        <RelicGallery />
      </Suspense>
    </ToolGate>
  );
}
