import { SeatingArrangement, Space } from "../seabus.ts";

const countOccupiedChairs = (grid: SeatingArrangement) => (
  grid.reduce(
    (total, row) =>
      total + row.filter((seat) => seat === Space.OCCUPIED).length,
    0,
  )
);

export default countOccupiedChairs;
