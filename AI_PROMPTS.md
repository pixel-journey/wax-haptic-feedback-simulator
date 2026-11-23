# AI handoff — haptic pulse list

## Non-negotiables

1. `pattern("confirm", true)` → `[{ onMs: 40, offMs: 0 }]`.
2. `pattern("fail", true)` has length 3 and on-time **60** (≤ 200).
3. Any kind with enabled `false` → `[]`.
4. Constants are shallow-cloned. The caller must not mutate the source.
5. Enabled totals: confirm 40 ms, warn 60 ms, fail 60 ms.
6. Usecases stay `executed: false`. **Never** call `navigator.vibrate` from a test.
7. A pulse is not confirmation of a transfer.

## Prompt seeds

- "confirm enabled versus disabled."
- "fail on-time total."
- "Refuse vibrate() inside the unit test."

## Do not

- Put pulse bytes in a chain action.
- Claim every phone matches these timings.
