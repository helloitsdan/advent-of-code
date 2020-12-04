import { DEFAULT_TARGET, POSSIBLE_NUMBERS } from "./data/haystack.ts";
import { findPair, findTriplet } from "./accountingElves.ts";

console.log(
  findPair(DEFAULT_TARGET, POSSIBLE_NUMBERS),
  findTriplet(DEFAULT_TARGET, POSSIBLE_NUMBERS),
);
