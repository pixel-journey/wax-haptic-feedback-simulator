import { describe, expect, it } from "vitest";
import { onTime, pattern } from "./haptic";

describe("haptic pattern", () => {
  it("is empty when disabled and stays under a short on-time", () => {
    expect(pattern("fail", false)).toEqual([]);
    expect(pattern("confirm", false)).toEqual([]);
    const pulses = pattern("fail", true);
    expect(pulses).toHaveLength(3);
    expect(onTime(pulses)).toBe(60);
    expect(onTime(pattern("confirm", true))).toBe(40);
  });

  it("locks warn as two 30 ms pulses with a 40 ms gap", () => {
    const warn = pattern("warn", true);
    expect(warn).toEqual([
      { onMs: 30, offMs: 40 },
      { onMs: 30, offMs: 0 },
    ]);
    expect(onTime(warn)).toBe(60);
  });

  it("returns a shallow clone so callers cannot mutate the source", () => {
    const a = pattern("confirm", true);
    a[0]!.onMs = 999;
    expect(pattern("confirm", true)[0]!.onMs).toBe(40);
  });
});
