import { assertEquals } from "https://deno.land/std@0.79.0/testing/asserts.ts";

import { readSeatingArrangement } from "./data/seating.ts";
import { findSeatingArrangement, SeatingArrangement } from "./seabus.ts";
import {
  countAdjacentSeats,
  countVisibleOccupiedSeats,
} from "./ocean-comparators.ts";
import countOccupiedChairs from "./utils/countOccupiedChairs.ts";

const printMap = (seats: SeatingArrangement) => {
  console.log();
  console.log(seats.map((row) => row.join("")).join("\n"));
  console.log();
};

Deno.test("findSeatingArrangement evolves with adjacent seat rules", () => {
  const seats = readSeatingArrangement("./data/seating.test.txt");
  const evolvedMap = findSeatingArrangement(
    seats,
    countAdjacentSeats,
    { MAX_ADJACENT_SEATS: 4 },
  );

  printMap(evolvedMap);

  assertEquals(
    countOccupiedChairs(evolvedMap),
    37,
  );
});

Deno.test("findSeatingArrangement evolves with visible seat rules", () => {
  const seats = readSeatingArrangement("./data/seating.test.txt");
  const evolvedMap = findSeatingArrangement(
    seats,
    countVisibleOccupiedSeats,
    { MAX_ADJACENT_SEATS: 5 },
  );

  printMap(evolvedMap);

  assertEquals(
    countOccupiedChairs(evolvedMap),
    26,
  );
});
