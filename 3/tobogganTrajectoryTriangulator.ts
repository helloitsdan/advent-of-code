import {
  DEFAULT_NAVIGATION_METHOD,
  MapTraversal,
  NavigationMethod,
  TREE,
} from "./constants.ts";

const traverseMap = (
  map: string,
  navigationMethod: NavigationMethod = DEFAULT_NAVIGATION_METHOD,
) => {
  const mapRows = map.split(/\n/);
  const mapWidth = mapRows[0].length;

  return mapRows.reduce(
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
    } as MapTraversal,
  );
};

export const traverseMapWithMultipleNavigationMethods = (
  map: string,
  navigationMethods: NavigationMethod[] = [],
) =>
  navigationMethods.reduce(
    (results, navigationMethod) => {
      const currentTraversal = traverseMap(map, navigationMethod);

      return {
        trees: currentTraversal.trees * results.trees,
        spaces: currentTraversal.spaces * results.spaces,
      };
    },
    {
      trees: 1,
      spaces: 1,
    } as MapTraversal,
  );

export default traverseMap;
