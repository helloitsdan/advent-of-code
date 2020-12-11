import { SeatCounterFn } from "./ocean-comparators.ts";

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

export const ADJACENT_OFFSETS = [
  { row: -1, seat: 0 },
  { row: -1, seat: 1 },
  { row: 0, seat: 1 },
  { row: 1, seat: 1 },
  { row: 1, seat: 0 },
  { row: 1, seat: -1 },
  { row: 0, seat: -1 },
  { row: -1, seat: -1 },
];

export const getSeat = (grid: SeatingArrangement, position: SeatPosition) => {
  const row = grid[position.row];
  return row ? row[position.seat] : undefined;
};

export const seatExists = (grid: SeatingArrangement, position: SeatPosition) =>
  !!getSeat(grid, position);

export const isSeatOccupied = (
  grid: SeatingArrangement,
  position: SeatPosition,
) => (
  getSeat(grid, position) === Space.OCCUPIED
);

export const findSeatingArrangement = (
  grid: SeatingArrangement,
  countAdjacentSeats: SeatCounterFn,
  {
    MIN_ADJACENT_SEATS = 0,
    MAX_ADJACENT_SEATS = 4,
  } = {},
) => {
  // The state of the grid at the start of this loop
  const currentGrid: SeatingArrangement = [];
  // The grid that is being changed as part of this loop
  const newGrid: SeatingArrangement = [];
  // The cells which are changing in the current loop
  const changesGrid: boolean[][] = new Array(grid.length).fill(
    new Array(grid[0].length).fill(false),
  );

  // The list of positions which changed in the previous loop
  let changes: SeatPosition[] = [];
  // The list of positions which have changed in the current loop
  const newChanges: SeatPosition[] = [];

  // Set the initial state of currentGrid and newGrid to equal the provided grid
  // and issue a change for every cell
  grid.forEach((row, rowIdx) => {
    // slice is currently quicker at cloning arrays than spreads/etc
    currentGrid.push(row.slice(0));
    newGrid.push(row.slice(0));

    for (let i = 0; i < row.length; i++) {
      changes.push({ row: rowIdx, seat: i });
    }
  });

  const pushChangedCell = (change: SeatPosition) => {
    changesGrid[change.row][change.seat] = true;
    newChanges.push(change);

    ADJACENT_OFFSETS.forEach((offset: SeatPosition) => {
      const adjacentPosition = {
        row: change.row + offset.row,
        seat: change.seat + offset.seat,
      };

      if (!seatExists(grid, adjacentPosition)) {
        return;
      }

      if (changesGrid[change.row][change.seat] === true) {
        return;
      }

      changesGrid[change.row][change.seat] = true;
      newChanges.push(change);
    });
  };

  do {
    newChanges.splice(0);
    changesGrid.forEach((row) => row.fill(false));

    // iterate over the cells that changed in the previous loop
    // this ends up being much quicker than iterating over every cell every loop
    changes.forEach((position) => {
      const seat = getSeat(currentGrid, position);
      const adjacentSeats = countAdjacentSeats(
        currentGrid,
        position,
      );

      if (seat == Space.OCCUPIED && adjacentSeats >= MAX_ADJACENT_SEATS) {
        newGrid[position.row][position.seat] = Space.UNOCCUPIED;
        pushChangedCell(position);
      }

      if (seat == Space.UNOCCUPIED && adjacentSeats == MIN_ADJACENT_SEATS) {
        newGrid[position.row][position.seat] = Space.OCCUPIED;
        pushChangedCell(position);
      }
    });

    // Mirror the finalised state of this loop into the
    // previous loop variables, ready to be re-run
    changes = newChanges.slice(0);
    newGrid.forEach((row, rowIdx) => {
      currentGrid[rowIdx] = row.slice(0);
    });
  } while (changes.length);

  return currentGrid;
};
