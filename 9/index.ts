/*
 * i wanted to try using a generator to build a stream to read the puzzle
 * input into our hacking function today, which felt nice for part a of the puzzle
 * 
 * it really came back to bite me for part b ): next time i will just use an array
 */

import getNumberStream from "./data/numberstream.ts";
import { exploitXMASWeakness, findXMASDataOutlier } from "./j1ngl3CH405.ts";

console.log(
  "i'm J1NGL3CR4SH, the most infamous yuletide hacker the north pole's ever known.",
);
console.log(
  "*cracks knuckles* there aint a festive system that i've not been able to force my way into",
);
console.log(
  "\n[Late-90s Cyber EDM Hacktunes start blasting from J1NGL3CR4SH's headphones]\n",
);

const outlier = findXMASDataOutlier(getNumberStream());
const vulnerability = exploitXMASWeakness(getNumberStream(), outlier!);

console.log(`it's ${vulnerability}! the key is ${vulnerability}!!`);
