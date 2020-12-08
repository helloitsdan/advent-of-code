import {
  Instruction,
  Instructions,
  InstructionSet,
  Operators,
} from "./data/instructions.ts";

export class AccumulationError extends Error {
  index: number;
  accumulator: number;

  constructor(index: number, accumulator: number) {
    super(
      `An instruction was called twice! The accumulation has been stopped at Instruction #${index}. (Accumulator: ${accumulator})`,
    );

    this.index = index;
    this.accumulator = accumulator;
  }
}

const patchInstruction = (instruction: Instruction) => {
  const newInstruction = { ...instruction };

  switch (newInstruction.instruction) {
    case Instructions.JMP:
      newInstruction.instruction = Instructions.NOP;
      break;
    case Instructions.NOP:
      newInstruction.instruction = Instructions.JMP;
      break;
  }

  return newInstruction;
};

const patchInstructionSet = (
  instructionSet: InstructionSet,
  indexToPatch: number,
) => {
  const newInstruction = patchInstruction(instructionSet[indexToPatch]);

  // console.debug(
  //   `[!] Patched ${
  //     instructionSet[indexToPatch].instruction
  //   } for ${newInstruction.instruction} at Instruction #${indexToPatch}`,
  // );

  const newInstructionSet = [...instructionSet];
  newInstructionSet[indexToPatch] = newInstruction;

  return newInstructionSet;
};

const accumulate = (
  value: number,
  operator: Operators,
  toAccumulate: number,
) => (
  operator === Operators.ADDITION ? value + toAccumulate : value - toAccumulate
);

export const executeInstructions = (
  instructions: InstructionSet,
  recoverFromErrors = true,
  value = 0,
  index = 0,
  visited = new Set<number>(),
): number => {
  const nextInstruction = instructions[index];

  if (!nextInstruction) {
    return value;
  }

  if (visited.has(index)) {
    throw new AccumulationError(index, value);
  } else {
    visited.add(index);
  }

  // console.debug(index, value, nextInstruction);

  switch (nextInstruction.instruction) {
    case Instructions.ACC:
      return executeInstructions(
        instructions,
        recoverFromErrors,
        accumulate(
          value,
          nextInstruction.operator,
          nextInstruction.value,
        ),
        index + 1,
        visited,
      );
    case Instructions.JMP:
      try {
        return executeInstructions(
          instructions,
          recoverFromErrors,
          value,
          accumulate(
            index,
            nextInstruction.operator,
            nextInstruction.value,
          ),
          visited,
        );
      } catch (e) {
        if (!recoverFromErrors) {
          throw e;
        }

        visited.delete(index);

        return executeInstructions(
          patchInstructionSet(
            instructions,
            index,
          ),
          false,
          value,
          index,
          visited,
        );
      }
    default:
      try {
        return executeInstructions(
          instructions,
          recoverFromErrors,
          value,
          index + 1,
          visited,
        );
      } catch (e) {
        if (!recoverFromErrors) {
          throw e;
        }

        visited.delete(index);

        return executeInstructions(
          patchInstructionSet(
            instructions,
            index,
          ),
          false,
          value,
          index,
          visited,
        );
      }
  }
};
