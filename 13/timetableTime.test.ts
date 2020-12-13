import { assertEquals } from "https://deno.land/std@0.79.0/testing/asserts.ts";

import { readSchedule } from "./data/schedule.ts";
import {
  findEarliestService,
  findTimestampOfAdjacentDepartures,
} from "./timetableTime.ts";

Deno.test("findEarliestService", () => {
  const schedule = readSchedule("./data/schedule.test.txt");
  const earliestService = findEarliestService(schedule);

  assertEquals(earliestService.service * earliestService.timeToWait, 295);
});

Deno.test("findTimestampOfAdjacentDepartures", () => {
  const schedule = readSchedule("./data/schedule.test.txt");

  console.log(findTimestampOfAdjacentDepartures(schedule));
});
