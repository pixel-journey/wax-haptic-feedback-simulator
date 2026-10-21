/**
 * Pulse timings for a local event. This file does not call navigator.vibrate.
 */

export type Kind = "confirm" | "warn" | "fail";

export type Pulse = { onMs: number; offMs: number };

const PATTERNS: Record<Kind, Pulse[]> = {
  confirm: [{ onMs: 40, offMs: 0 }],
  warn: [
    { onMs: 30, offMs: 40 },
    { onMs: 30, offMs: 0 },
  ],
  fail: [
    { onMs: 20, offMs: 30 },
    { onMs: 20, offMs: 30 },
    { onMs: 20, offMs: 0 },
  ],
};

export function pattern(kind: Kind, enabled: boolean): Pulse[] {
  if (!enabled) return [];
  return PATTERNS[kind].map((pulse) => ({ ...pulse }));
}

export function onTime(pulses: readonly Pulse[]): number {
  return pulses.reduce((sum, pulse) => sum + pulse.onMs, 0);
}
