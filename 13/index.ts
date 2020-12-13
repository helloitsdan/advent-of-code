import schedule from "./data/schedule.ts";
import {
  findEarliestService,
  findTimestampOfAdjacentDepartures,
} from "./timetableTime.ts";

console.log("no fun today only hard maths");

const earliestService = findEarliestService(schedule);
console.log("Part 1:", earliestService.service * earliestService.timeToWait);

const timestamp = findTimestampOfAdjacentDepartures(schedule);
console.log("Part 2:", timestamp);
