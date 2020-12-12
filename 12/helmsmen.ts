import { Command, Heading, Helmsman, Location, Order } from "./types.ts";

/**
 * Moves the ship in the direction specified by the order. (`order.command`)
 * 
 * @param order The order to follow
 * @param currentLocation The current location of the ship
 * @returns The new location of the ship after the order has been followed
 */
export const hardToThe = (
  order: Order,
  currentLocation: Location,
): Location => {
  const newLocation = { ...currentLocation };

  switch (order.command) {
    case Command.N:
      newLocation.y = newLocation.y + order.scale;
      break;
    case Command.S:
      newLocation.y = newLocation.y - order.scale;
      break;
    case Command.E:
      newLocation.x = newLocation.x + order.scale;
      break;
    case Command.W:
      newLocation.x = newLocation.x - order.scale;
      break;
  }

  return newLocation;
};

/**
 * Rotates the ship in the direction (`order.command`) and degrees
 * (`order.scale`) specified by the order.
 * 
 * @param order The order to follow
 * @param currentHeading The heading of the ship
 * @returns The new heading of the ship after the order has been followed
 */
export const bringHerRound = (
  order: Order,
  currentHeading: Heading,
): Heading => {
  // turns are always right angles in the captain's orders
  const turns = order.scale / 90;

  const headingShift = order.command === Command.R
    ? currentHeading + turns
    : currentHeading - turns;

  // 4 represents the number of possible directions the ship can face
  // this Maths ensures that the value is always in an acceptable range,
  // even when subtracting from 0
  return headingShift - 4 * Math.floor(headingShift * 1 / 4);
};

/**
 * Moves the ship forward in the direction of its current heading,
 * by the amount (`order.scale`) specified by the order.
 * 
 * @param order The order to follow
 * @param currentHeading The heading of the ship, used to determine
 *                       which direction to move in
 * @param currentWaypoint The current location of the ship's waypoint
 * @returns The new location of the ship after the order has been followed
 */
export const openTheSails = (
  order: Order,
  currentHeading: Heading,
  currentLocation: Location,
): Location => {
  // map the current heading to a direction command
  const command = Command[Heading[currentHeading] as keyof typeof Command];
  return hardToThe({ command, scale: order.scale }, currentLocation);
};

/**
 * Rotates the current waypoint around the ship.
 * This will happen the number of times that the captain asked for
 * as part of the current order (`order.scale`).
 * 
 * @param order The order to follow
 * @param currentWaypoint The current location of the ship's waypoint
 * @returns The new location of the waypoint after the order has been followed
 */
export const rotateNorthStar = (
  order: Order,
  currentWaypoint: Location,
): Location => {
  let newWaypoint = { ...currentWaypoint };
  const turns = order.scale / 90;

  for (let i = 0; i < turns; i++) {
    newWaypoint = order.command === Command.R
      ? { x: newWaypoint.y, y: -newWaypoint.x }
      : { x: -newWaypoint.y, y: newWaypoint.x };
  }

  return newWaypoint;
};

/**
 * Moves the ship towards the specified waypoint.
 * This will happen the number of times that the captain asked for
 * as part of the current order (`order.scale`).
 * 
 * @param order The order to follow
 * @param location The current location of the ship
 * @param waypoint The current location of the ship's waypoint
 * @returns The new location of the ship after the order has been followed
 */
export const followNorthStar = (
  order: Order,
  location: Location,
  waypoint: Location,
): Location => ({
  x: location.x + (waypoint.x * order.scale),
  y: location.y + (waypoint.y * order.scale),
});

/**
 * Waypoint William believes that navigation of a ship should be 
 * done exclusively using the waypoint method, where orders are
 * applied to a waypoint out in front of the ship.
 * 
 * Waypoint William thinks this is the North Star, but everyone else
 * isn't sure how that'd only be approximately ten spaces in front of 
 * the ship to start with.
 * 
 * @param ship The ship that the helmsman is navigating
 * @param order The current order from the captain
 * @returns The ship, after the current order has been followed 
 */
export const waypointWilliam: Helmsman = (ship, order) => {
  switch (order.command) {
    case Command.N:
    case Command.S:
    case Command.E:
    case Command.W:
      return {
        ...ship,
        waypoint: hardToThe(order, ship.waypoint),
      };
    case Command.L:
    case Command.R:
      return {
        ...ship,
        waypoint: rotateNorthStar(order, ship.waypoint),
      };
    default:
      return {
        ...ship,
        location: followNorthStar(
          order,
          ship.location,
          ship.waypoint,
        ),
      };
  }
};

/**
 * Direct Drake is a straight forward helmsman, who follows
 * the captain's orders directly using the current position
 * of the ship.
 * 
 * The other helmsman say that Direct Drake is maybe too
 * straight forward, and that sometimes they'd like to
 * sail a little slower and enjoy the journey.
 * 
 * @param ship The ship that the helmsman is navigating
 * @param order The current order from the captain
 * @returns The ship, after the current order has been followed
 */
export const directDrake: Helmsman = (ship, order) => {
  switch (order.command) {
    case Command.N:
    case Command.S:
    case Command.E:
    case Command.W:
      return {
        ...ship,
        location: hardToThe(order, ship.location),
      };
    case Command.L:
    case Command.R:
      return {
        ...ship,
        heading: bringHerRound(order, ship.heading),
      };
    default:
      return {
        ...ship,
        location: openTheSails(
          order,
          ship.heading,
          ship.location,
        ),
      };
  }
};
