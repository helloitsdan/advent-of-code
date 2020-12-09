import { NumberStream } from "./data/numberstream.ts";

const hasTwoSum = (target: number, haystack: number[]) => {
  const numbers = new Map<number, number>();

  for (let i = 0; i < haystack.length; i++) {
    const number = haystack[i];
    const diff = target - number;

    if (numbers.has(diff)) {
      return true;
    }

    numbers.set(number, i);
  }

  return false;
};

export const findXMASDataOutlier = (
  stream: NumberStream,
  preambleSize = 25,
) => {
  const preamble: number[] = [];
  let next;

  while ((next = stream.next().value) !== null) {
    const isOutlier =
      !(preamble.length < preambleSize || hasTwoSum(next, preamble));

    if (isOutlier) {
      return next;
    }

    if (preamble.length >= preambleSize) {
      preamble.shift();
    }

    preamble.push(next);
  }

  return null;
};

export const exploitXMASWeakness = (
  stream: NumberStream,
  target: number,
) => {
  const seen: number[] = [];
  let next;

  while ((next = stream.next().value) !== null) {
    let total = 0;
    let used = 0;

    while (seen[used] && total < target) {
      total += seen[used];
      used++;
    }

    if (total === target) {
      const vulnerableNumbers = seen.slice(0, used);
      const low = Math.min(...vulnerableNumbers);
      const high = Math.max(...vulnerableNumbers);

      return low + high;
    }

    seen.unshift(next);
  }

  return null;
};
