export type Graph = Map<string, Node>;

export interface Node {
  id: string;
  contains: {
    id: string;
    amount: number;
  }[];
}

export const isInGraph = (
  target: string,
  graph: Graph,
  currentNode: string,
  cache?: Map<string, boolean>,
): boolean => {
  if (!cache) {
    return isInGraph(target, graph, currentNode, new Map<string, boolean>());
  }

  if (cache.has(currentNode)) {
    return cache.get(currentNode)!;
  }

  if (currentNode === target) {
    return true;
  }

  let isFound = false;
  const nodeDetails = graph.get(currentNode)!;

  for (const node in nodeDetails.contains) {
    const containedNode = nodeDetails.contains[node];

    if (isInGraph(target, graph, containedNode.id, cache)) {
      isFound = true;
      break;
    }
  }

  cache.set(currentNode, isFound);
  return isFound;
};

export const countGraphOccurences = (
  currentNode: string,
  graph: Graph,
  cache?: Map<string, number>,
): number => {
  if (!cache) {
    return countGraphOccurences(currentNode, graph, new Map<string, number>());
  }

  if (cache.has(currentNode)) {
    return cache.get(currentNode)!;
  }

  const nodeDetails = graph.get(currentNode)!;

  const count: number = nodeDetails.contains.reduce(
    (total, { amount, id }) => (
      total + (amount * countGraphOccurences(id, graph, cache))
    ),
    1,
  );

  cache.set(currentNode, count);
  return count;
};
