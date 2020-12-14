import {
  Command,
  CommandList,
  CommandType,
  Intepreter,
  MaskCommand,
  Memory,
} from "./types.ts";

const NOOP = "X";
const COMMAND_SIZE = 36;
const DEFAULT_MASK = new Array(COMMAND_SIZE).fill("0").join("");

const isMaskCommand = (command: Command): command is MaskCommand => (
  command.type === CommandType.mask
);

/**
 * Returns the binary string representation of the provided value,
 * in the current command size. For example, a value of 1 would
 * return 00000000000000000000000001.
 */
const valueToBinaryString = (value: number) => (
  value.toString(2).padStart(COMMAND_SIZE, "0")
);

/**
 * Returns a binary array representation of a provided number.
 * This is the binary string representation, as returned by
 * `valueToBinaryString`, but split into an array of numbers.
 */
const valueToBinaryArray = (value: number) => (
  valueToBinaryString(value).split("").map((value) => parseInt(value))
);

/**
 * The V1 interpretor writes to memory with the integer value from the
 * provided command, with the specified mask applied.
 * 
 * @param memory The memory where the resulting value should be written
 * @param mask The bitmask to apply to the current command value
 * @param command The current command pair of a memory address and value
 */
export const v1Interpreter: Intepreter = (memory, mask, command) => {
  const newBinaryString = valueToBinaryArray(command.value)
    .map((bit, idx) => (
      // overwrites the current bit with mask's bit, if it is set
      mask[idx] !== NOOP ? mask[idx] : bit
    ))
    .join("");

  memory.set(command.address, parseInt(newBinaryString, 2));
};

/**
 * Returns all the possible addresses that a mask could refer
 * to, where floating bits (X) can be either 0 or 1.
 * 
 * @mask The mask to find permutations for
*/
const resolveFloatingBits = (mask: string): number[] => {
  if (!mask.includes(NOOP)) {
    return [parseInt(mask, 2)];
  }

  // replace will only replace the first instance by default;
  // this means we can recursively replace the floating bits
  // with both possible permutations, bit-by-bit
  return [
    ...resolveFloatingBits(mask.replace(NOOP, "0")),
    ...resolveFloatingBits(mask.replace(NOOP, "1")),
  ];
};

/**
 * The V2 intepreter writes the current command value to memory, after 
 * applying the provided mask to the command's address. This intepreter
 * will write the value to every possible permutation of the address,
 * where "X" values in the provided mask could be either 0 or 1.
 * 
 * @param memory The memory where the resulting value should be written
 * @param mask The bitmask to apply to the current command value
 * @param command The current command pair of a memory address and value
 */
export const v2Interpreter: Intepreter = (memory, mask, command) => {
  const addressMask = valueToBinaryArray(command.address)
    .map((bit, idx) => (
      // if the bitmask bit is 0 in v2, the original bit is unchanged
      // otherwise either it is overwritten with a 1, or becomes floating
      mask[idx] === "0" ? bit : mask[idx]
    ))
    .join("");

  for (const address of resolveFloatingBits(addressMask)) {
    memory.set(address, command.value);
  }
};

export const executeCommands = (
  commands: CommandList,
  interpreter = v1Interpreter,
) => {
  const memory: Memory = new Map();
  let mask = DEFAULT_MASK;

  for (const command of commands) {
    if (isMaskCommand(command)) {
      mask = command.mask;
      continue;
    }

    interpreter(memory, mask, command);
  }

  return memory;
};

export const sumMemoryValues = (memory: Map<number, number>): number => (
  [...memory.values()].reduce(
    (total, next) => total + next,
  )
);
