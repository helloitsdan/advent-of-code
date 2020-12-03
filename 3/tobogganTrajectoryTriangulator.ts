import map from "./map.ts";

const MAP_ROWS = map.split(/\n/);
const TREE = "#";

interface MapTraversal {
  trees: number;
  spaces: number;
}

interface NavigationMethod {
  horizontalHop: number;
  verticalHop: number;
}

const DEFAULT_NAVIGATION_METHOD: NavigationMethod = {
  horizontalHop: 3,
  verticalHop: 1,
};

const traverseMap = (
  mapToTraverse: string[] = MAP_ROWS,
  navigationMethod: NavigationMethod = DEFAULT_NAVIGATION_METHOD
) => {
  const mapWidth = mapToTraverse[0].length;

  return mapToTraverse.reduce(
    (mapInfo, mapRow, mapRowIndex) => {
      if (mapRowIndex % navigationMethod.verticalHop !== 0) {
        return mapInfo;
      }

      const currentMapSquare =
        mapRow[(mapRowIndex * navigationMethod.horizontalHop) % mapWidth];
      const isTree = currentMapSquare === TREE;

      return {
        trees: mapInfo.trees + (isTree ? 1 : 0),
        spaces: mapInfo.spaces + (!isTree ? 1 : 0),
      };
    },
    {
      trees: 0,
      spaces: 0,
    } as MapTraversal
  );
};

const traverseMapWithMultipleNavigationMethods = (
  mapToTraverse: string[] = MAP_ROWS,
  navigationMethods: NavigationMethod[] = []
) =>
  navigationMethods.reduce(
    (results, navigationMethod) => {
      const currentTraversal = traverseMap(mapToTraverse, navigationMethod);

      return {
        trees: currentTraversal.trees * results.trees,
        spaces: currentTraversal.spaces * results.spaces,
      };
    },
    {
      trees: 1,
      spaces: 1,
    } as MapTraversal
  );

console.log(traverseMap(MAP_ROWS));

console.log(
  traverseMapWithMultipleNavigationMethods(MAP_ROWS, [
    { horizontalHop: 1, verticalHop: 1 },
    { horizontalHop: 3, verticalHop: 1 },
    { horizontalHop: 5, verticalHop: 1 },
    { horizontalHop: 7, verticalHop: 1 },
    { horizontalHop: 1, verticalHop: 2 },
  ])
);
