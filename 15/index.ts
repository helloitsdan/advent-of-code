import { playMemoryGame } from "./elfMemories.ts";

const PUZZLE_INPUT = [2, 0, 1, 9, 5, 19];

console.log(playMemoryGame(PUZZLE_INPUT, 2020));
console.log(playMemoryGame(PUZZLE_INPUT, 30000000));
