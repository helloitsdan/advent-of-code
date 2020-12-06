const boardingPasses = Deno.readTextFileSync("./data/boardingPasses.txt");
export default boardingPasses.split("\n");
