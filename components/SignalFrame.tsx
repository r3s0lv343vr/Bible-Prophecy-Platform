export function SignalFrame({
  children,
  className = "",
  accent,
}: {
  children: React.ReactNode;
  className?: string;
  accent?: string;
}) {
  return (
    <div
      className={`signal-border relative overflow-hidden rounded-2xl ${className}`}
      style={accent ? { borderColor: `${accent}66` } : undefined}
    >
      <div className="pointer-events-none absolute left-3 top-3 h-3 w-3 border-l border-t border-signal/70" />
      <div className="pointer-events-none absolute right-3 top-3 h-3 w-3 border-r border-t border-plasma/70" />
      <div className="pointer-events-none absolute bottom-3 left-3 h-3 w-3 border-b border-l border-gold/60" />
      <div className="pointer-events-none absolute bottom-3 right-3 h-3 w-3 border-b border-r border-signal/50" />
      {children}
    </div>
  );
}

export function LayerChip({ layer }: { layer: "text" | "history" | "sda" | "alternative" }) {
  const map = {
    text: { label: "Text", className: "text-signal border-signal/40" },
    history: { label: "History", className: "text-gold border-gold/40" },
    sda: { label: "SDA / historicist", className: "text-plasma border-plasma/40" },
    alternative: { label: "Other views", className: "text-parchment/80 border-white/20" },
  } as const;
  const item = map[layer];
  return (
    <span className={`rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-[0.18em] ${item.className}`}>
      {item.label}
    </span>
  );
}
