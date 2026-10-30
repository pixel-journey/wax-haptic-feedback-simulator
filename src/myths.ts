export const HAPTIC_MYTHS = [
  {
    myth: "This page vibrates the phone",
    reality:
      "It only computes pulse timings. navigator.vibrate is never called here.",
  },
  {
    myth: "Patterns are long enough to feel dramatic",
    reality:
      "On-time stays short (tens of ms). Product code can map them to Vibration API carefully.",
  },
  {
    myth: "This is a live chain feedback feed",
    reality:
      "Offline educational patterns for confirm / warn / fail. Unsent transfer shapes are separate.",
  },
] as const;
