"use client";

import { LabBench } from "@/components/LabBench";
import { ToolGate } from "@/components/ToolGate";

export default function LabPage() {
  return (
    <ToolGate tool="lab" teaser="The lab opens after you have enough tools to build an argument rather than guess.">
      <LabBench />
    </ToolGate>
  );
}
