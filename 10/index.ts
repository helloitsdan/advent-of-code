import joltages from "./data/joltages.ts";
import { getAdapterJoltageInfo } from "./onePointTwoOneJoltyWolts.ts";

const info = getAdapterJoltageInfo(joltages);

console.log(info.differences.get(1)! * info.differences.get(3)!);
console.log(info.permutations);
