import getBSPValue, { POSITION } from "./utils/bsp.ts";

const BINARY_SPACE_PARTITIONS: {
  [key: string]: POSITION;
} = {
  F: POSITION.LOWER,
  B: POSITION.HIGHER,
  L: POSITION.LOWER,
  R: POSITION.HIGHER,
};

interface BoardingPass {
  boardingPass: string;
  row: number;
  column: number;
  seatID: number;
}

const convertBoardingPassToBinaryString = (boardingPass: string) => (
  boardingPass.split("").map(
    (char) => BINARY_SPACE_PARTITIONS[char],
  ).join("")
);

export const getBoardingPass = (pass: string): BoardingPass => {
  const rowPass = pass.substring(0, 7);
  const columnPass = pass.substring(7);

  const row = getBSPValue(convertBoardingPassToBinaryString(rowPass));
  const column = getBSPValue(convertBoardingPassToBinaryString(columnPass));
  const seatID = (row * 8) + column;

  return {
    boardingPass: pass,
    row,
    column,
    seatID,
  };
};

export const findSeatIDRange = (passes: BoardingPass[]) => (
  passes.reduce(
    (previousPass, pass) => ({
      min: pass.seatID < previousPass.min.seatID ? pass : previousPass.min,
      max: pass.seatID > previousPass.max.seatID ? pass : previousPass.max,
    }),
    {
      min: passes[0],
      max: passes[0],
    } as {
      min: BoardingPass;
      max: BoardingPass;
    },
  )
);

export const findMySeatID = (passes: BoardingPass[]) => {
  const seatIDs = new Set();
  const { min, max } = findSeatIDRange(passes);
  let mySeatID;

  passes.forEach((pass) => {
    seatIDs.add(pass.seatID);
  });

  for (let i = min.seatID; i < max.seatID; i++) {
    const seatIsUnoccupied = !seatIDs.has(i);
    const hasPreviousSeat = seatIDs.has(i - 1);
    const hasNextSeat = seatIDs.has(i + 1);

    if (seatIsUnoccupied && hasPreviousSeat && hasNextSeat) {
      mySeatID = i;
      break;
    }
  }

  return mySeatID;
};
