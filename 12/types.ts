export enum Command {
  N = "N",
  S = "S",
  E = "E",
  W = "W",
  L = "L",
  R = "R",
  F = "F",
}

export enum Heading {
  E = 0,
  S = 1,
  W = 2,
  N = 3,
}

export interface Location {
  x: number;
  y: number;
}

export interface Ship {
  heading: Heading;
  location: Location;
  waypoint: Location;
  distance: number;
}

export interface Order {
  command: Command;
  scale: number;
}

// A captain is basically just a list of orders, right?
export type Captain = Order[];
// A helmsman interprets the captain's orders and moves the ship
export type Helmsman = (ship: Ship, order: Order) => Ship;
