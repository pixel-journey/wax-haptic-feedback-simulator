# Local pulse timings for confirm / warn / fail — without calling vibrate

> **Trust:** `educational-reference`  
> **Catalog:** `wax-ecosystem-blueprint-catalog` (private index; not this public course)

**One-sentence goal:** Teach fixed short pulse lists for three event kinds, with a disabled-empty path, without claiming a device vibration or a live feed.

**Real code:** `npm test`. **Does not** call `navigator.vibrate`, sign, or broadcast.

The course is [EDUCATION.md](EDUCATION.md) (beginner, intermediate, masterclass).

## What is true (executed)

| Rule | Result |
| --- | --- |
| `pattern("confirm", true)` | `[{ onMs: 40, offMs: 0 }]` |
| `onTime(...)` for confirm | 40 |
| `pattern("fail", true)` | length 3, on-time ≤ 200 |
| any kind + `false` | `[]` |
| usecases | requests stay `executed: false`; no signatures field |

## What is in the repo

| Piece | Role |
| --- | --- |
| `src/haptic.ts` | `pattern`, `onTime` |
| `src/haptic.test.ts` | the executed timings |
| `src/usecases.ts` | unsent request + unsigned transfer sketches |
| `src/Demo.tsx` | interactive pulse preview (no device call) |
| Docs | EDUCATION · POLICY · SECURITY · ARCHITECTURE · VERIFICATION-LOG |

## Run

```bash
npm install
npm test
npm run dev
```

## Best practice and the opposite

**Do** keep the timings pure so tests never need a device.  
**Do** respect the host’s reduced-motion / no-haptics preference before calling any real API.  
**Do** treat the pulse list as optional feedback, not required confirmation.

**Do not** call `navigator.vibrate` from a unit test or a teaching demo.  
**Do not** put pulse data inside a chain action.  
**Do not** claim these timings work on every phone.

## Related

- `wax-reduced-motion-dashboard`
- `wax-seizure-safe-animations`

MIT — Pixel Journey
