import { Graph, Node } from "../utils/graph.ts";

const LINE_REGEX = /^([a-z ]+) bags contain (.*)$/gm;
const BAG_REGEX = /(\d) ([a-z ]+) bags?/g;

const raw = Deno.readTextFileSync("./data/rules.txt");

export const parseBagRulesGraph = (bagRules: string) => {
  const rules: Graph = new Map<string, Node>();
  const lines = bagRules.matchAll(LINE_REGEX);

  for (const [, outerBagColour, bagString] of lines) {
    const foundBags = bagString.matchAll(BAG_REGEX);
    const bags = [];

    for (const [, amount, id] of foundBags) {
      bags.push({ id, amount: parseInt(amount) });
    }

    rules.set(outerBagColour, {
      id: outerBagColour,
      contains: bags,
    });
  }

  return rules;
};

export default parseBagRulesGraph(raw);
