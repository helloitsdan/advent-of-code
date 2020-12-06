const haystack = Deno.readTextFileSync("./data/haystack.txt");

export default haystack.split(/\n/).map((line) => parseInt(line, 10));
