"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SignalFrame } from "./SignalFrame";
import { useProgress } from "./ProgressProvider";

const STEPS = [
  "patmos",
  "fragment",
  "mystery",
  "journal",
  "symbol",
  "decoder",
  "solution",
  "map",
] as const;

export function OpeningPatmos() {
  const router = useRouter();
  const { progress, addJournal, unlockTool, unlockRule, discoverSymbol, completeExpedition } =
    useProgress();
  const alreadyDone = progress.completed.includes("interpreters-chamber");
  const [step, setStep] = useState(alreadyDone ? STEPS.length - 1 : 0);
  const [note, setNote] = useState("");
  const [observed, setObserved] = useState<string | null>(null);
  const [lamp, setLamp] = useState<string | null>(null);
  const current = STEPS[step];

  function next() {
    setStep((n) => Math.min(n + 1, STEPS.length - 1));
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <p className="text-[10px] uppercase tracking-[0.32em] text-gold">Aegean · exile</p>
      <h1 className="font-display text-4xl text-[#f7ecd4] md:text-5xl">Patmos</h1>

      {current === "patmos" ? (
        <Scene
          kicker="The island"
          body="Wind off the water. Stone that holds heat after sunset. John is here because of the word of God and the testimony of Jesus — a prisoner, not a court prophet. No tool menu. Only the sea, and a vision."
          scripture="Rev 1:9"
          action="Stand still and listen"
          onAction={next}
        />
      ) : null}

      {current === "fragment" ? (
        <Scene
          kicker="A recovered fragment"
          scripture="Rev 1:1–3"
          body="“The Revelation of Jesus Christ, which God gave unto him, to shew unto his servants things which must shortly come to pass… Blessed is he that readeth, and they that hear the words of this prophecy, and keep those things which are written therein.”"
          extra="Look before you explain. What is this book claiming to be?"
        >
          <div className="mt-4 space-y-2">
            {[
              { id: "reveal", label: "A revealing of Jesus, given to be read, heard, and kept." },
              { id: "news", label: "A decoder ring for this week’s headlines." },
              { id: "secret", label: "A secret meant only for specialists." },
            ].map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setObserved(opt.id)}
                className={`block w-full rounded-xl border px-4 py-3 text-left text-sm ${
                  observed === opt.id ? "border-gold bg-gold/10 text-white" : "border-white/10 text-parchment/80"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
          <button
            type="button"
            disabled={observed !== "reveal"}
            onClick={next}
            className="mt-5 rounded-full bg-gold px-5 py-2 text-xs uppercase tracking-[0.2em] text-black disabled:opacity-40"
          >
            {observed === "reveal" ? "Keep the fragment" : "Choose what the text actually says"}
          </button>
        </Scene>
      ) : null}

      {current === "mystery" ? (
        <Scene
          kicker="The mystery"
          body="If this is a revealing of Jesus for servants who will keep it, then beasts and marks are not the centre. They are the conflict around the centre. Why send this to seven real churches on a real coast?"
          action="I need somewhere to write"
          onAction={() => {
            unlockTool("journal");
            next();
          }}
        />
      ) : null}

      {current === "journal" ? (
        <Scene kicker="Field journal unlocked" body="The first tool appears because you saw something worth keeping. Not because a menu told you it existed.">
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="What did you notice that you did not expect?"
            className="mt-4 min-h-32 w-full rounded-xl border border-white/10 bg-black/30 p-3 text-sm"
          />
          <button
            type="button"
            disabled={!note.trim()}
            onClick={() => {
              addJournal({
                expeditionId: "interpreters-chamber",
                prompt: "First observation from Patmos",
                body: note.trim(),
              });
              next();
            }}
            className="mt-4 rounded-full bg-gold px-5 py-2 text-xs uppercase tracking-[0.2em] text-black disabled:opacity-40"
          >
            Seal the note
          </button>
        </Scene>
      ) : null}

      {current === "symbol" ? (
        <Scene
          kicker="A first image"
          scripture="Rev 1:12–13, 20"
          body="John turns and sees seven golden lampstands, and one like a son of man walking among them. Do not catalogue every symbol in the book. Handle this one."
          extra="What are the lampstands — according to the same chapter?"
        >
          <div className="mt-4 space-y-2">
            {[
              { id: "churches", label: "The seven churches. Verse 20 says so." },
              { id: "stars", label: "Empires. We will find out later." },
              { id: "menorah", label: "Only the temple furniture, nothing else." },
            ].map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setLamp(opt.id)}
                className={`block w-full rounded-xl border px-4 py-3 text-left text-sm ${
                  lamp === opt.id ? "border-gold bg-gold/10" : "border-white/10 text-parchment/80"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
          <button
            type="button"
            disabled={lamp !== "churches"}
            onClick={() => {
              discoverSymbol("lampstand");
              unlockTool("codex");
              next();
            }}
            className="mt-4 rounded-full bg-gold px-5 py-2 text-xs uppercase tracking-[0.2em] text-black disabled:opacity-40"
          >
            {lamp === "churches" ? "The book named it" : "Let the chapter finish the sentence"}
          </button>
        </Scene>
      ) : null}

      {current === "decoder" ? (
        <Scene
          kicker="Decoder rule 1"
          body="You just used the only rule you need for now: when Scripture explains its own image, do not outrun it. Headlines can wait. Charts can wait."
          action="Keep this rule"
          onAction={() => {
            unlockRule("crossrefs");
            unlockTool("decoder");
            next();
          }}
        />
      ) : null}

      {current === "solution" ? (
        <Scene
          kicker="First discovery"
          body="The lampstands are churches. The Son of Man walks among them. The expedition is not a hunt for villains. It is a walk through a war over worship, beginning with real congregations on a real coast."
          extra="SDA / historicist reading will later trace those churches through history. That claim is not required yet. First: go to them."
          action="Look at the map"
          onAction={next}
        />
      ) : null}

      {current === "map" ? (
        <Scene
          kicker="A route appears"
          body="Patmos is no longer the whole world. A line runs east toward seven ruined cities. Ephesus is first."
        >
          <button
            type="button"
            onClick={() => {
              completeExpedition("interpreters-chamber");
              router.push("/expedition/seven-cities");
            }}
            className="mt-6 inline-flex rounded-full bg-gold px-8 py-3 text-xs uppercase tracking-[0.28em] text-black"
          >
            Continue to Ephesus
          </button>
          <Link href="/map" className="mt-4 block text-sm text-parchment/60 hover:text-signal">
            First look at the chart
          </Link>
        </Scene>
      ) : null}
    </div>
  );
}

function Scene({
  kicker,
  body,
  scripture,
  extra,
  action,
  onAction,
  children,
}: {
  kicker: string;
  body: string;
  scripture?: string;
  extra?: string;
  action?: string;
  onAction?: () => void;
  children?: React.ReactNode;
}) {
  return (
    <SignalFrame className="p-6 md:p-8">
      <p className="text-[10px] uppercase tracking-[0.24em] text-gold">{kicker}</p>
      {scripture ? <p className="mt-3 font-display text-lg text-signal">{scripture}</p> : null}
      <p className="mt-4 text-base leading-8 text-parchment/90">{body}</p>
      {extra ? <p className="mt-4 text-sm leading-7 text-parchment/70">{extra}</p> : null}
      {children}
      {action && onAction ? (
        <button
          type="button"
          onClick={onAction}
          className="mt-6 rounded-full bg-gold px-6 py-3 text-xs uppercase tracking-[0.24em] text-black"
        >
          {action}
        </button>
      ) : null}
    </SignalFrame>
  );
}
