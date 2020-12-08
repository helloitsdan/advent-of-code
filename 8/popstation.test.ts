import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std@0.79.0/testing/asserts.ts";

import { parseInstructionsFromFile } from "./data/instructions.ts";
import { AccumulationError, executeInstructions } from "./popstation.ts";

Deno.test("Runs instructions correctly", () => {
  const instructions = parseInstructionsFromFile(
    "./data/instructions.test.txt",
  );

  assertThrows(
    () => executeInstructions(instructions, false),
    AccumulationError,
    "Accumulator: 5",
  );
});

Deno.test("Tries to correct corrupt instructions", () => {
  const instructions = parseInstructionsFromFile(
    "./data/instructions.test.txt",
  );

  assertEquals(
    executeInstructions(instructions, true),
    8,
  );
});
