import { assertEquals } from "https://deno.land/std@0.79.0/testing/asserts.ts";

import { readJoltages } from "./data/joltages.ts";
import {
  countAdapterPermutations,
  getAdapterJoltageInfo,
} from "./onePointTwoOneJoltyWolts.ts";

Deno.test("getAdapterJoltageInfo counts instances of differences", () => {
  const joltages = readJoltages("./data/joltages.test-1.txt");
  const info = getAdapterJoltageInfo(joltages);

  assertEquals(info.device, 22);
  assertEquals(info.differences.get(1), 7);
  assertEquals(info.differences.get(2), 0);
  assertEquals(info.differences.get(3), 5);
});

Deno.test("getAdapterJoltageInfo counts correctly for a bigger adapter bag", () => {
  const joltages = readJoltages("./data/joltages.test-2.txt");
  const info = getAdapterJoltageInfo(joltages);

  assertEquals(info.device, 52);
  assertEquals(info.differences.get(1), 22);
  assertEquals(info.differences.get(2), 0);
  assertEquals(info.differences.get(3), 10);
});

Deno.test("countAdapterPermutations computes tribonacci product of adapters", () => {
  const joltages = readJoltages("./data/joltages.test-1.txt");
  assertEquals(countAdapterPermutations(joltages), 8);
});

Deno.test("countAdapterPermutations handles bigger data sets", () => {
  const joltages = readJoltages("./data/joltages.test-2.txt");
  assertEquals(countAdapterPermutations(joltages), 19208);
});
