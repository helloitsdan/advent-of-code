import ticketData from "./data/tickets.ts";
import { findFieldNames, validateTickets } from "./ticketsPlease.ts";

const { rules, ticket, nearbyTickets } = ticketData;

const { valid, invalid } = validateTickets(rules, nearbyTickets);
const fieldNames = findFieldNames(rules, [...valid, ticket]);

console.log(
  "Part 1:",
  invalid.reduce(
    (total, ticket) => (
      total + ticket.invalid.reduce(
        (total, field) => total + field,
        0,
      )
    ),
    0,
  ),
);

console.log(
  "Part 2:",
  [...fieldNames.entries()].reduce(
    (total, [field, index]) =>
      field.includes("departure") ? total *= ticket[index] : total,
    1,
  ),
);
