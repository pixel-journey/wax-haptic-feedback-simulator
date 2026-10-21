"use client";

import { useState } from "react";
import { onTime, pattern, type Kind } from "./haptic";

const KINDS: Kind[] = ["confirm", "warn", "fail"];

export function Demo() {
  const [kind, setKind] = useState<Kind>("confirm");
  const [enabled, setEnabled] = useState(true);
  const pulses = pattern(kind, enabled);
  return (
    <main className="wrap">
      <p className="kicker">Educational reference</p>
      <h1>A pulse list, not a vibration</h1>
      <p className="lede">The browser is not asked to vibrate. Turning the pattern off returns an empty list. The timings stay under 200 ms of on-time.</p>
      <div className="actions">
        {KINDS.map((item) => (
          <button key={item} type="button" aria-pressed={kind === item} onClick={() => setKind(item)}>
            {item}
          </button>
        ))}
        <button type="button" aria-pressed={enabled} onClick={() => setEnabled((value) => !value)}>
          {enabled ? "on" : "off"}
        </button>
      </div>
      <p>
        {pulses.length} pulse{pulses.length === 1 ? "" : "s"}. On-time {onTime(pulses)} ms.
      </p>
    </main>
  );
}
