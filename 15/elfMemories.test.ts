import { assertEquals } from "https://deno.land/std@0.79.0/testing/asserts.ts";

import { playMemoryGame } from "./elfMemories.ts";

const TEST_NUMBERS = [0, 3, 6];

Deno.test("a nice normal game", () => {
  assertEquals(playMemoryGame(TEST_NUMBERS, 2020), 436);
});

Deno.test("a rude challenging game", () => {
  assertEquals(playMemoryGame(TEST_NUMBERS, 30000000), 175594);
});
