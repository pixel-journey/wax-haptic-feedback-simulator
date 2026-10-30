# Policy — haptic feedback simulator

**Trust label:** `educational-reference`  
**Updated:** 2026-10-31

## In scope

- Pure `pattern(kind, enabled)` → pulse list
- `onTime` sum of onMs
- Offline demo; unsent usecase shapes

## Out of scope

- Calling `navigator.vibrate`
- Live oracle / feed product
- Auto-broadcast of sample transfers

## Accessibility note

Respect user reduced-motion / no-haptics preferences in host apps. This demo only models timings.
