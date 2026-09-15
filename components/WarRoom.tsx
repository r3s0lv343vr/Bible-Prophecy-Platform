import { SignalFrame } from "./SignalFrame";

const LEFT = ["God", "Christ", "Holy Spirit", "Gospel", "Seal", "Commandments", "Creator worship", "Kingdom"];
const RIGHT = ["Dragon", "Sea beast", "Earth beast / false prophet", "Deception", "Mark", "Coerced worship", "Babylon", "Human empire"];

export function WarRoom() {
  return (
    <div className="space-y-5">
      <div>
        <p className="neon-title text-[11px]">Great Controversy war room</p>
        <h1 className="mt-2 font-display text-3xl text-white">A synthesis, not a team-select screen.</h1>
        <p className="mt-2 max-w-2xl text-sm leading-7 text-parchment/75">
          This board becomes honest after Revelation 12–14. It compares governments of loyalty, not
          cartoon mascots. People are not the pieces.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <SignalFrame className="p-5">
          <p className="text-[10px] uppercase tracking-[0.2em] text-gold">The Lamb&apos;s government</p>
          <ul className="mt-4 space-y-3">
            {LEFT.map((item) => (
              <li key={item} className="rounded-xl border border-gold/30 bg-gold/5 px-3 py-2">
                {item}
              </li>
            ))}
          </ul>
        </SignalFrame>
        <SignalFrame className="p-5">
          <p className="text-[10px] uppercase tracking-[0.2em] text-plasma">The dragon&apos;s counterfeit</p>
          <ul className="mt-4 space-y-3">
            {RIGHT.map((item) => (
              <li key={item} className="rounded-xl border border-plasma/30 bg-plasma/5 px-3 py-2">
                {item}
              </li>
            ))}
          </ul>
        </SignalFrame>
      </div>
    </div>
  );
}
