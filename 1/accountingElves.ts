import { DEFAULT_TARGET, POSSIBLE_NUMBERS } from "./data/haystack.ts";

const getArrayProduct = (array: number[]) => array.reduce((a, b) => a * b);

const findPair = (target = DEFAULT_TARGET, haystack = POSSIBLE_NUMBERS) => {
  const splitAt = Math.round(haystack.length / 2);
  const upper = haystack.slice(splitAt);
  const lower = haystack.slice(0, splitAt);

  let tuple: [number, number] | null = null;

  for (const candidate of upper) {
    const partner = target - candidate;
    const hasPartner = lower.includes(partner);

    if (hasPartner) {
      tuple = [partner, candidate];
      break;
    }
  }

  return tuple ? ([...tuple, getArrayProduct(tuple)] as const) : null;
};

const findTriplet = (target = DEFAULT_TARGET, haystack = POSSIBLE_NUMBERS) => {
  let tuple: [number, number, number] | null = null;

  for (let idx = 0; idx < haystack.length; idx++) {
    const candidate = haystack[idx];
    const adjustedTarget = target - candidate;
    const foundPair = findPair(adjustedTarget, haystack);

    if (foundPair) {
      tuple = [candidate, foundPair[0], foundPair[1]];
      break;
    }
  }

  return tuple ? [...tuple, getArrayProduct(tuple)] : null;
};

console.log(findPair(), findTriplet());
