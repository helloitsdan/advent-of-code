import boardingPasses from "./data/boardingPasses.ts";
import {
  findMySeatID,
  findSeatIDRange,
  getBoardingPass,
} from "./boardingPassChaos.ts";

const passes = boardingPasses.map(getBoardingPass);
const { min, max } = findSeatIDRange(passes);
const mySeat = findMySeatID(passes);

console.log("Welcome to the flight! Thank you for choosing AoC Airways!");

console.log(
  `The seats onboard today range from the luxurious seat ${min.seatID}, to the frankly abhorrent seat ${max.seatID}.`,
);

console.log(
  `Please make your way to Seat ${mySeat}. Please. You are holding up the plane`,
);
