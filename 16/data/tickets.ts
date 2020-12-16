import { TicketData } from "../types.ts";

const RULES_REGEX = /^([a-z ]+): (\d+)-(\d+) or (\d+)-(\d+)$/gm;

const parseTickets = (raw: string) => {
  const [, ...tickets] = raw.split(/\n/);
  return tickets.map((ticket) => ticket.split(",").map(Number));
};

const parseRules = (raw: string) => {
  const rules = [];

  for (
    const [, name, firstLow, firstHigh, secondLow, secondHigh] of raw.matchAll(
      RULES_REGEX,
    )
  ) {
    rules.push({
      name,
      ranges: [
        { min: Number(firstLow), max: Number(firstHigh) },
        { min: Number(secondLow), max: Number(secondHigh) },
      ],
    });
  }

  return rules;
};

const readTicketData = (file: string): TicketData => {
  const raw = Deno.readTextFileSync(file);
  const [rules, ticket, nearbyTickets] = raw.split(/\n\n/);

  return {
    rules: parseRules(rules),
    ticket: parseTickets(ticket)[0],
    nearbyTickets: parseTickets(nearbyTickets),
  };
};

export default readTicketData("./data/tickets.txt");
