export const TREE = "#";

export interface MapTraversal {
  trees: number;
  spaces: number;
}

export interface NavigationMethod {
  horizontalHop: number;
  verticalHop: number;
}

export const DEFAULT_NAVIGATION_METHOD: NavigationMethod = {
  horizontalHop: 3,
  verticalHop: 1,
};
