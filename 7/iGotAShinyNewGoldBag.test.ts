import { assertEquals } from "https://deno.land/std@0.79.0/testing/asserts.ts";

import { parseBagRulesGraph } from "./data/rules.ts";
import {
  countContainedBags,
  countContainingBags,
} from "./iGotANewShinyGoldBag.ts";

Deno.test("countContainingBags", () => {
  const raw = Deno.readTextFileSync("./data/test-part1.txt");
  const graph = parseBagRulesGraph(raw);

  const bag = "shiny gold";
  const expected = 4;

  assertEquals(countContainingBags(bag, graph), expected);
});

Deno.test("countContainedBags", () => {
  const raw = Deno.readTextFileSync("./data/test-part2.txt");
  const graph = parseBagRulesGraph(raw);

  const bag = "shiny gold";
  const expected = 126;

  assertEquals(countContainedBags(bag, graph), expected);
});
