import map from "./data/map.ts";
import traverseMap, {
  traverseMapWithMultipleNavigationMethods,
} from "./tobogganTrajectoryTriangulator.ts";

console.log(traverseMap(map));

console.log(
  traverseMapWithMultipleNavigationMethods(map, [
    { horizontalHop: 1, verticalHop: 1 },
    { horizontalHop: 3, verticalHop: 1 },
    { horizontalHop: 5, verticalHop: 1 },
    { horizontalHop: 7, verticalHop: 1 },
    { horizontalHop: 1, verticalHop: 2 },
  ]),
);
