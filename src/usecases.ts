import { CHAIN_ORIGIN, active, currencyBalance } from "./api";
import { onTime, pattern } from "./haptic";
import type { ChainAction, HttpRequest } from "./api";

export type UseCase = {
  title: string;
  detail: string;
  request: HttpRequest;
  transaction: { note: string; actions: ChainAction[] } | null;
};

const pulses = pattern("confirm", true);

export const USE_CASES: UseCase[] = [
  {
    title: "The balance beside a confirm pulse",
    detail: "get_currency_balance is one number a confirm screen might show. The pulse is local. Neither the balance nor the vibration is requested.",
    request: currencyBalance(CHAIN_ORIGIN, "alice"),
    transaction: null,
  },
  {
    title: "The unsigned transfer the pulse is about",
    detail: `Confirm is ${onTime(pulses)} ms on. Disabled is an empty list. The transfer is not broadcast and the page does not vibrate.`,
    request: currencyBalance(CHAIN_ORIGIN, "bob"),
    transaction: {
      note: "Not broadcast. The pulse is not part of the action.",
      actions: [
        active("alice", {
          account: "eosio.token",
          name: "transfer",
          data: { from: "alice", to: "bob", quantity: "1.00000000 WAX", memo: "haptic preview" },
        }),
      ],
    },
  },
];

export function assertUseCases(): void {
  if (onTime(pulses) !== 40) throw new Error("pulse");
  if (pattern("confirm", false).length !== 0) throw new Error("disabled");
}
