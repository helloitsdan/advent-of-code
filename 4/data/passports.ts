const passports = Deno.readTextFileSync("./data/passports.txt");
export default passports.split(/\n\n/);
