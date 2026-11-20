# Education — local pulse timings, not a vibration API

> **Rung:** `npm test` passes. The lab returns pulse lists for confirm / warn / fail. It never calls `navigator.vibrate`.  
> **The test is the rule.**

## What you should be able to do

| Level | After this file |
| --- | --- |
| Beginner | Call `pattern("confirm", true)` and get a single 40 ms on pulse |
| Intermediate | Explain why any disabled kind returns `[]`, and why fail is three pulses of 20 ms (`60`), not "under 200" |
| Masterclass | Say why a timing list is not a device vibration, and what is still missing |

---

## Beginner — one scene

```ts
pattern("confirm", true)
// [{ onMs: 40, offMs: 0 }]

onTime(pattern("confirm", true)) // 40
pattern("confirm", false) // []
```

| Kind | Enabled pulses | Total onMs |
| --- | --- | --- |
| confirm | 1 × 40 ms | 40 |
| warn | 2 × 30 ms (with 40 ms gap) | 60 |
| fail | 3 × 20 ms (with 30 ms gaps) | 60 |
| any, disabled | empty array | 0 |

The patterns are fixed. Nothing reads the chain, a wallet, or the device.

### Words

| Word | Meaning here |
| --- | --- |
| Pulse | `{ onMs, offMs }` pair. On-time is the vibration duration if a host later used it |
| Kind | `"confirm"` / `"warn"` / `"fail"` |
| Enabled | Boolean flag. False always yields `[]` |
| onTime | Sum of `onMs` only. Gaps are not counted |

### Predict, then run

```bash
npm test
```

1. `pattern("fail", true)` has length 3 and `onTime` ≤ 200.
2. `pattern("confirm", false)` is empty.
3. `onTime(pattern("confirm", true))` is 40.

---

## Intermediate — the list is the whole product

`pattern` clones the constant array so callers cannot mutate the source. `onTime` reduces only the `onMs` fields.

The usecases pair a confirm pulse with an unsent `get_currency_balance` request and an unsigned transfer sketch. Neither is executed. The pulse is not part of any action data.

### Attack → test

| Attack | Naive code | This lab | Test |
| --- | --- | --- | --- |
| Call `navigator.vibrate` | Device side-effect in a unit test | never called; pure return | haptic.test.ts |
| Mutate the pattern constant | Later calls change | shallow clone on each call | pattern returns new objects |
| Treat the pulse as part of the transfer | Wrong mental model | usecase note says the pulse is not in the action | usecases.test.ts |
| Long continuous vibration | Accessibility risk | fail is three short pulses, total on-time 60 ms | onTime ≤ 200 |

---

## Masterclass — a timing list is not a vibration

The Vibration API is optional, requires a user gesture on many browsers, and can be blocked by the host OS or by reduced-motion preferences. This lab never touches it.

What is still not here:

- Any call to `navigator.vibrate` or a polyfill.
- A reduced-motion or no-haptics preference reader. Hosts must add that themselves.
- Persistence, intensity curves, or device-specific mapping.
- A claim that these timings feel good on any particular phone.

### Exercise

1. What does `pattern("warn", true)` return? (Two pulses of 30 ms on, first with 40 ms off. Tested.)
2. Why does disabled return `[]` instead of a zero-length pulse? (Explicit empty so a host can skip the API call entirely.)
3. Is the sample transfer broadcast? (No. `executed: false` and no signatures field.)

---

## What this course will not teach

- A working vibration on a real device
- How to request the Vibration API permission
- A haptic design system for a production wallet
