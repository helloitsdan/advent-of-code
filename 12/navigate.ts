import { Captain, Heading, Ship } from "./types.ts";
import { directDrake } from "./helmsmen.ts";

export const THE_DEFAULT_PEARL: Ship = {
  heading: Heading.E,
  location: {
    x: 0,
    y: 0,
  },
  waypoint: {
    x: 10,
    y: 1,
  },
  distance: 0,
};

export const getManhattanDistance = (ship: Ship) => (
  Math.abs(ship.location.x) +
  Math.abs(ship.location.y)
);

const navigate = (
  orders: Captain,
  helmsman = directDrake,
  ship = THE_DEFAULT_PEARL,
): Ship => {
  const newShipState = orders.reduce(
    helmsman,
    ship,
  );

  return {
    ...newShipState,
    distance: getManhattanDistance(newShipState),
  };
};

export default navigate;
