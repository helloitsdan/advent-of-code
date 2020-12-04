import passwords from "./data/passwords.ts";
import { PasswordRow } from "./constants.ts";
import {
  parsePasswordRow,
  validateSledPassword,
  validateTobogganPassword,
} from "./passwordValidator.ts";

const parsedPasswords: PasswordRow[] = passwords
  .map(parsePasswordRow)
  .filter((row): row is PasswordRow => !!row);

const validPasswordsForTheSledRentalPlaceDownTheStreet = parsedPasswords
  .map(validateSledPassword)
  .filter((row) => row.isValid);

const validPasswordsForTheOfficialTobogganCorporation = parsedPasswords
  .map(validateTobogganPassword)
  .filter((row) => row.isValid);

console.log(validPasswordsForTheSledRentalPlaceDownTheStreet.length);
console.log(validPasswordsForTheOfficialTobogganCorporation.length);
