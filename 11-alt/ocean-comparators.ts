import {
  ADJACENT_OFFSETS,
  getSeat,
  isSeatOccupied,
  SeatingArrangement,
  SeatPosition,
  Space,
} from "./seabus.ts";

export type SeatCounterFn = (
  grid: SeatingArrangement,
  position: SeatPosition,
) => number;

export const countAdjacentSeats: SeatCounterFn = (grid, position) =>
  ADJACENT_OFFSETS.reduce((total, offset) => {
    const adjacentPosition = {
      row: position.row + offset.row,
      seat: position.seat + offset.seat,
    };

    return isSeatOccupied(grid, adjacentPosition) ? total + 1 : total;
  }, 0);

export const countVisibleOccupiedSeats: SeatCounterFn = (
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
