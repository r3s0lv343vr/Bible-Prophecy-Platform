"use client";

import { DecoderStudio } from "@/components/DecoderStudio";
import { ToolGate } from "@/components/ToolGate";

export default function DecoderPage() {
  return (
    <ToolGate tool="decoder" teaser="The decoder appears when a symbol needs Scripture to finish its own sentence.">
      <DecoderStudio />
    </ToolGate>
  );
}
