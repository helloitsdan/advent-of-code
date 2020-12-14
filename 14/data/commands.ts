const LINE_REGEX = /(mask|mem)(\[([\d]+)\])? = ([\dX]+)/gm;

import { CommandList, CommandType } from "../types.ts";

export const readCommands = (file: string) => {
  const raw = Deno.readTextFileSync(file);
  const commands: CommandList = [];

  for (const [, type, , address, value] of raw.matchAll(LINE_REGEX)) {
    if (type === CommandType.mask) {
      commands.push({
        type: CommandType.mask,
        mask: value,
      });
    } else {
      commands.push({
        type: CommandType.mem,
        address: parseInt(address),
        value: parseInt(value),
      });
    }
  }

  return commands;
};

export default readCommands("./data/commands.txt");
