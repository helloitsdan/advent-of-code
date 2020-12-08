export enum Instructions {
  NOP = "nop",
  ACC = "acc",
  JMP = "jmp",
}

export enum Operators {
  ADDITION = "+",
  SUBTRACTIONS = "-",
}

export interface Instruction {
  instruction: Instructions;
  operator: Operators;
  value: number;
}

export type InstructionSet = Array<Instruction>;

const LINE_REGEX = /^([a-z]{3}) ([+-]{1})([\d]+)$/gm;

export const parseInstructionsFromFile = (file: string): InstructionSet => {
  const raw = Deno.readTextFileSync(file);
  const instructions = new Array<Instruction>();

  for (const [, instruction, operator, value] of raw.matchAll(LINE_REGEX)) {
    instructions.push({
      instruction: instruction as Instructions,
      operator: operator as Operators,
      value: parseInt(value),
    });
  }

  return instructions;
};

export default parseInstructionsFromFile("./data/instructions.txt");
