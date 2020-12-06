import numbers from "./data/haystack.ts";
import { findPair, findTriplet } from "./accountingElves.ts";

export const DEFAULT_TARGET = 2020;

console.log(
  findPair(DEFAULT_TARGET, numbers),
  findTriplet(DEFAULT_TARGET, numbers),
);
