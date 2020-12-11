export enum Space {
  FLOOR = ".",
  UNOCCUPIED = "L",
  OCCUPIED = "#",
}

export type SeatingArrangement = Space[][];

export interface SeatPosition {
  row: number;
  seat: number;
}

export type ComparatorFn = (
  grid: SeatingArrangement,
  position: SeatPosition,
) => number;

const ADJACENT_OFFSETS = [
  { row: -1, seat: 0 },
  { row: -1, seat: 1 },
  { row: 0, seat: 1 },
  { row: 1, seat: 1 },
  { row: 1, seat: 0 },
  { row: 1, seat: -1 },
  { row: 0, seat: -1 },
  { row: -1, seat: -1 },
];

const getSeat = (grid: SeatingArrangement, position: SeatPosition) => {
  const row = grid[position.row];
  return row ? row[position.seat] : undefined;
};

const isSeatOccupied = (grid: SeatingArrangement, position: SeatPosition) => (
  getSeat(grid, position) === Space.OCCUPIED
);

export const countAdjacentSeats: ComparatorFn = (grid, position) =>
  ADJACENT_OFFSETS.reduce((total, offset) => {
    const adjacentPosition = {
      row: position.row + offset.row,
      seat: position.seat + offset.seat,
    };

    return isSeatOccupied(grid, adjacentPosition) ? total + 1 : total;
  }, 0);

export const countVisibleOccupiedSeats: ComparatorFn = (
  grid,
  position,
) =>
  ADJACENT_OFFSETS.reduce((total, offset) => {
    let adjacentPosition = { ...position };

    do {
      adjacentPosition = {
        row: adjacentPosition.row + offset.row,
        seat: adjacentPosition.seat + offset.seat,
      };
    } while (getSeat(grid, adjacentPosition) === Space.FLOOR);

    return isSeatOccupied(grid, adjacentPosition) ? total + 1 : total;
  }, 0);

export const findSeatingArrangement = (
  grid: SeatingArrangement,
  {
    MIN_ADJACENT_SEATS = 0,
    MAX_ADJACENT_SEATS = 4,
  } = {},
  comparator: typeof countAdjacentSeats = countAdjacentSeats,
) => {
  const currentGrid: SeatingArrangement = [];
  const nextGrid: SeatingArrangement = [];
  let gridUpdated;

  grid.forEach((row) => {
    currentGrid.push(row.slice(0));
    nextGrid.push(row.slice(0));
  });

  do {
    gridUpdated = false;

    currentGrid.forEach((row, rowIdx) => {
      row.forEach((seat, seatIdx) => {
        const adjacentSeats = comparator(
          currentGrid,
          { row: rowIdx, seat: seatIdx },
        );

        if (seat == Space.OCCUPIED && adjacentSeats >= MAX_ADJACENT_SEATS) {
          nextGrid[rowIdx][seatIdx] = Space.UNOCCUPIED;
          gridUpdated = true;
          return;
        }

        if (seat == Space.UNOCCUPIED && adjacentSeats == MIN_ADJACENT_SEATS) {
          nextGrid[rowIdx][seatIdx] = Space.OCCUPIED;
          gridUpdated = true;
          return;
        }
      });
    });

    nextGrid.forEach((row, i) => {
      /* slicing is more performant than spreading for cloning arrays currently */
      currentGrid[i] = row.slice(0);
    });
  } while (gridUpdated);

  return currentGrid;
};

export const countOccupiedChairs = (grid: SeatingArrangement) => (
  grid.reduce(
    (total, row) =>
      total + row.filter((seat) => seat === Space.OCCUPIED).length,
    0,
  )
);
