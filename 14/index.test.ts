import { assertEquals } from "https://deno.land/std@0.79.0/testing/asserts.ts";

import { readCommands } from "./data/commands.ts";
import {
  executeCommands,
  sumMemoryValues,
  v2Interpreter,
} from "./noOneCaredWhereIDocked.ts";

Deno.test("V1", () => {
  const commands = readCommands("./data/commands.test.txt");
  const memory = executeCommands(commands);

  assertEquals(sumMemoryValues(memory), 165);
});

Deno.test("V2", () => {
  const commands = readCommands("./data/commands.test-2.txt");
  const memory = executeCommands(commands, v2Interpreter);

  assertEquals(sumMemoryValues(memory), 208);
});
