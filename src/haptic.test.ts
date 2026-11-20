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
});
