import { assertEquals } from "https://deno.land/std@0.79.0/testing/asserts.ts";

import { readCaptainsOrders } from "./data/captains-orders.ts";
import navigate from "./navigate.ts";
import { directDrake, waypointWilliam } from "./helmsmen.ts";

Deno.test("Direct Drake", () => {
  const orders = readCaptainsOrders("./data/captains-orders.test.txt");
  const ship = navigate(orders, directDrake);

  assertEquals(ship.distance, 25);
});

Deno.test("Waypoint William", () => {
  const orders = readCaptainsOrders("./data/captains-orders.test.txt");
  const ship = navigate(orders, waypointWilliam);

  assertEquals(ship.distance, 286);
});
