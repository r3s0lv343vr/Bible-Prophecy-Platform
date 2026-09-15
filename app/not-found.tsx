import Link from "next/link";

export default function NotFound() {
  return (
    <div className="signal-border rounded-3xl p-10 text-center">
      <p className="neon-title text-[11px]">Broken seal</p>
      <h1 className="mt-3 font-display text-3xl text-white">This chamber is not on the map.</h1>
      <Link href="/" className="mt-6 inline-block text-signal">
        Return to the table
      </Link>
    </div>
  );
}
