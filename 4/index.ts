import passports from "./data/passports.ts";
import getValidPassports from "./northPolePassportControl.ts";

console.log(getValidPassports(passports).length);
