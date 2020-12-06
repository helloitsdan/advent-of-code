const questions = Deno.readTextFileSync("./data/questions.txt");
export default questions.split(/\n\n/);
