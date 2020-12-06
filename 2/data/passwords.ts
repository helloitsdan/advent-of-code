const passwords = Deno.readTextFileSync("./data/passwords.txt");
export default passwords.split(/\n/);
