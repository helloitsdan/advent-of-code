import { AdapterBag } from "./data/joltages.ts";

interface AdapterJoltageInfo {
  device: number;
  differences: Map<number, number>;
  joltages: Set<number>;
  permutations: number;
}

export const getAdapterJoltageInfo = (adapters: AdapterBag) => {
  const info: AdapterJoltageInfo = {
    device: adapters[adapters.length - 1],
    joltages: new Set(adapters),
    differences: new Map<number, number>([[1, 0], [2, 0], [3, 0]]),
    permutations: countAdapterPermutations(adapters),
  };

  adapters.forEach((adapter, idx) => {
    const previousAdapter = adapters[idx - 1] || 0;

    for (let i = 1; i <= 3; i++) {
      if (!(previousAdapter + i === adapter)) {
        continue;
      }

      const counter = info.differences.get(i)!;
      info.differences.set(i, counter + 1);

      return;
    }

    throw new TypeError(
      `Couldn't compute adapter joltage diff! [${previousAdapter}, ${adapter}]`,
    );
  });

  return info;
};

export const countAdapterPermutations = (adapters: number[]) => {
  // There is always one instance of a socket
  const instances = new Map<number, number>([[0, 1]]);

  adapters.forEach((adapter) => {
    const one = instances.get(adapter - 1) || 0;
    const two = instances.get(adapter - 2) || 0;
    const three = instances.get(adapter - 3) || 0;

    // this problem is a tribonacci sequence! i hadn't heard of
    // them before! that's cool!
    instances.set(adapter, one + two + three);
  });

  return instances.get(adapters[adapters.length - 1])!;
};
