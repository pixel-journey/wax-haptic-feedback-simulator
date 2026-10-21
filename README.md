# Pulse timings, not a vibration

**Trust label:** `educational-reference`  
**Catalog:** [wax-ecosystem-blueprint-catalog](https://github.com/pixel-journey/wax-ecosystem-blueprint-catalog)

Confirm, warn, and fail patterns. The browser is not asked to vibrate. The sample transfer is unsigned.

The August 2026 README described a live feed, an oracle, or a device vibration. This tree does not do those things.

## What is actually in the repo

| Piece | Role |
| --- | --- |
| `src/haptic.ts` | The pure rules |
| `src/haptic.test.ts` | The claims in the verification log |
| `src/usecases.ts` | HTTP requests, built and not sent |
| `src/Demo.tsx` | Offline page |

`npm test` runs the rules. `npm run dev` opens the page.

## Queries and unsigned transactions

`src/api.ts` builds nodeos, Hyperion, and Atomic requests. `executed` is false. This repo did not call any host. The confirm case includes one unsigned eosio.token transfer. It is not broadcast.

## Related

See the catalog. Do not describe this page as a live Alcor position, a translated NFT, or a device vibration.
