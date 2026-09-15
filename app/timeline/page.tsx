"use client";

import { TimelineRail } from "@/components/TimelineRail";
import { ToolGate } from "@/components/ToolGate";

export default function TimelinePage() {
  return (
    <ToolGate tool="timeline" teaser="Dates stay sealed until chronology is the problem in front of you.">
      <TimelineRail />
    </ToolGate>
  );
}
