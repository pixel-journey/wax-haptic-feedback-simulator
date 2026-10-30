"use client";

import { useState } from "react";
import { onTime, pattern, type Kind } from "./haptic";
import { HAPTIC_MYTHS } from "./myths";

const KINDS: Kind[] = ["confirm", "warn", "fail"];

export function Demo() {
  const [kind, setKind] = useState<Kind>("confirm");
  const [enabled, setEnabled] = useState(true);
  const pulses = pattern(kind, enabled);
  return (
    <main className="wrap">
      <p className="kicker">Educational reference · Pixel Journey</p>
      <h1>A pulse list, not a vibration</h1>
      <p className="lede">
        The browser is not asked to vibrate. Turning the pattern off returns an empty
        list. The timings stay under 200 ms of on-time.
      </p>

      <section
        style={{
          marginBottom: "1.5rem",
          padding: "1rem",
          border: "1px solid #a855f744",
          borderRadius: "12px",
        }}
      >
        <h2 style={{ fontSize: "1rem", marginTop: 0 }}>Myths vs reality</h2>
        {HAPTIC_MYTHS.map((m) => (
          <div key={m.myth} style={{ marginBottom: "0.75rem", fontSize: "0.9rem" }}>
            <p style={{ margin: 0 }}>
              <strong>Myth:</strong> {m.myth}
            </p>
            <p style={{ margin: "0.25rem 0 0" }}>
              <strong>Reality:</strong> {m.reality}
            </p>
          </div>
        ))}
      </section>

      <div className="actions">
        {KINDS.map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={kind === item}
            onClick={() => setKind(item)}
          >
            {item}
          </button>
        ))}
        <button
          type="button"
          aria-pressed={enabled}
          onClick={() => setEnabled((value) => !value)}
        >
          {enabled ? "on" : "off"}
        </button>
      </div>
      <p>
        {pulses.length} pulse{pulses.length === 1 ? "" : "s"}. On-time {onTime(pulses)}{" "}
        ms.
      </p>
      {pulses.length > 0 && (
        <ul style={{ fontFamily: "ui-monospace, monospace", fontSize: "0.85rem" }}>
          {pulses.map((p, i) => (
            <li key={i}>
              on {p.onMs} ms · off {p.offMs} ms
            </li>
          ))}
        </ul>
      )}

      <p style={{ marginTop: "2rem", fontSize: "0.85rem", opacity: 0.75 }}>
        See POLICY.md · companions: reduced-motion-dashboard, seizure-safe-animations.
      </p>
    </main>
  );
}
