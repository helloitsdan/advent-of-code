/**
 * Let's play a little elven memory game!
 * 
 * @param startingNumbers The array of numbers used to start the game
 * @param targetIdx The number of the turn to end the game at
 * @returns the nth seen number in the game, where n is `targetIdx`
 */
export const playMemoryGame = (
  startingNumbers: number[],
  targetIdx: number,
) => {
  const turns: number[] = [];

  // using a fixed lengoth array instead of a map for
  // caching numbers we know about this makes this
  // run much, much faster. takes a lot more memory
  // initially but i think the map would eventually
  // take up the same amount...
  const seen = new Array(targetIdx);

  startingNumbers.forEach((turn, turnIdx) => {
    turns.push(turn);
    seen[turn] = turnIdx + 1;
  });

  // this is the last spoken number; to determine the
  // next number in the game we need to look back at this
  let number = turns[turns.length - 1];

  // loop until the game has gone for targetIdx turns
  for (let turnIdx = turns.length; turnIdx < targetIdx; turnIdx++) {
    const previousIndex = seen[number];
    const nextNumber = previousIndex ? turnIdx - previousIndex : 0;

    seen[number] = turnIdx;
    number = nextNumber;
  }

  return number;
};
