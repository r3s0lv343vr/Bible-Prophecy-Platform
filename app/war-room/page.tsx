"use client";

import { ToolGate } from "@/components/ToolGate";
import { WarRoom } from "@/components/WarRoom";

export default function WarRoomPage() {
  return (
    <ToolGate tool="war-room" teaser="The war room waits until the woman, the dragon, and the conflict over worship are on the table.">
      <WarRoom />
    </ToolGate>
  );
}
