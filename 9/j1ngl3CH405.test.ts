import { assertEquals } from "https://deno.land/std@0.79.0/testing/asserts.ts";

import { readNumberStream } from "./data/numberstream.ts";
import { exploitXMASWeakness, findXMASDataOutlier } from "./j1ngl3CH405.ts";

Deno.test("findXMASDataOutlier spots the odd one out", async () => {
  const stream = readNumberStream("./data/5-feed.txt");
  assertEquals(findXMASDataOutlier(stream, 5), 127);
});

Deno.test("exploitXMASWeakness hacks the jingle-gibson", () => {
  const stream = readNumberStream("./data/5-feed.txt");
  assertEquals(exploitXMASWeakness(stream, 127), 62);
});
