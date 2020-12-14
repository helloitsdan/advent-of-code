export enum CommandType {
  mask = "mask",
  mem = "mem",
}

export interface Command {
  type: CommandType;
}

export interface MaskCommand extends Command {
  mask: string;
}

export interface MemCommand extends Command {
  address: number;
  value: number;
}

export type CommandList = (MaskCommand | MemCommand)[];
export type Memory = Map<number, number>;
export type Intepreter = (
  memory: Memory,
  mask: string,
  command: MemCommand,
) => void;
