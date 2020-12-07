import { countGraphOccurences, Graph, isInGraph } from "./utils/graph.ts";

export const countContainingBags = (bag: string, graph: Graph) =>
  Array.from(graph.values()).reduce(
    (total, { id }) => {
      if (id === bag) {
        /*
         * a bag does not contain itself. this is the bag law of the universe.
         * as such, we do not have to count a bag when it is itself.
         */
        return total;
      }

      return total + Number(isInGraph(bag, graph, id));
    },
    0,
  );

export const countContainedBags = (bag: string, graph: Graph) => (
  /*
   * a bag does not contain itself. this is the bag law of the universe.
   * as such, we have to subtract one from the graph occurences, so as to not
   * count the original bag.
   */
  countGraphOccurences(bag, graph) - 1
);
