import commands from "./data/commands.ts";
import {
  executeCommands,
  sumMemoryValues,
  v2Interpreter,
} from "./noOneCaredWhereIDocked.ts";

const memory = executeCommands(commands);
console.log("Part 1:", sumMemoryValues(memory));

const memory2 = executeCommands(commands, v2Interpreter);
console.log("Part 2:", sumMemoryValues(memory2));
