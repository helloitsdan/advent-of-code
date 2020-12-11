import { SeatingArrangement, Space } from "../seabus.ts";

export const readSeatingArrangement = (file: string): SeatingArrangement => {
  const raw = Deno.readTextFileSync(file);
  return raw.split(/\n/).map((row) => row.split("")) as Space[][];
};

export default readSeatingArrangement("./data/seating.txt");
