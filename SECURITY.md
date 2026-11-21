# Security — local pulse timings

## Closed in tests

| Issue | Behavior |
| --- | --- |
| `pattern("confirm", true)` | `[{ onMs: 40, offMs: 0 }]` |
| `pattern("fail", true)` | length 3, on-time **60** (≤ 200) |
| any kind + `false` | `[]` |
| Pattern constants | shallow-cloned (caller cannot mutate source) |
| Usecases | requests stay `executed: false`; no signatures |

| Kind | Enabled pulses | Total onMs |
| --- | --- |
| confirm | 1 × 40 ms | 40 |
| warn | 2 × 30 ms | 60 |
| fail | 3 × 20 ms | 60 |

## Not closed (production)

| Concern | Guidance |
| --- | --- |
| Device Vibration API | Host must call `navigator.vibrate` after a user gesture |
| Reduced motion / no-haptics | Host preference; pair with [reduced-motion](https://github.com/pixel-journey/wax-reduced-motion-dashboard) |
| Intensity / device mapping | Not modeled |

## Attack angles

1. Calling `navigator.vibrate` from a unit test or teaching demo.  
2. Putting pulse data inside a chain action.  
3. Long continuous vibration (lab uses short multi-pulse fail).  
4. Treating the pulse as required confirmation of a transfer.  
5. Claiming timings work on every phone.

## Honesty limits

Never calls vibrate. Timing list is not a device vibration.

| Sibling | Distinction |
| --- | --- |
| [reduced-motion](https://github.com/pixel-journey/wax-reduced-motion-dashboard) | frames → 1, duration → 0 |
| [seizure-safe](https://github.com/pixel-journey/wax-seizure-safe-animations) | Flash clamp-to-3 |

[docs.wax.io](https://docs.wax.io/).
