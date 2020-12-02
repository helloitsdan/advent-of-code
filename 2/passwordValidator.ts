import passwords from "./passwords.ts";

const PASSWORD_ROW_REGEX = /^(\d+)-(\d+) ([a-z]+): (.*)+$/;

interface PasswordRow {
  min: number;
  max: number;
  character: string;
  password: string;
}

type ValidatedPasswordRow = PasswordRow & {
  isValid: boolean;
};

const parsePasswordRow = (passwordRow: string): PasswordRow | null => {
  const match = passwordRow.match(PASSWORD_ROW_REGEX);

  if (!match) {
    return null;
  }

  const [, min, max, character, password] = match;

  return {
    min: parseInt(min),
    max: parseInt(max),
    character,
    password,
  };
};

const validateSledPassword = (row: PasswordRow): ValidatedPasswordRow => {
  const validPasswordRegex = new RegExp(row.character, "g");

  const characterInstances = (row.password.match(validPasswordRegex) || [])
    .length;
  const isValid =
    characterInstances >= row.min && characterInstances <= row.max;

  return {
    ...row,
    isValid,
  };
};

const validateTobogganPassword = (row: PasswordRow): ValidatedPasswordRow => {
  const firstCharacterValid = row.password[row.min - 1] === row.character;
  const secondCharacterValid = row.password[row.max - 1] === row.character;

  return {
    ...row,
    isValid: firstCharacterValid != secondCharacterValid,
  };
};

const parsedPasswords: PasswordRow[] = passwords
  .map(parsePasswordRow)
  .filter((row): row is PasswordRow => !!row);

const validPasswordsForTheSledRentaPlaceDownTheStreet = parsedPasswords
  .map(validateSledPassword)
  .filter((row) => row.isValid);

const validPasswordsForTheOfficialTobogganCorporation = parsedPasswords
  .map(validateTobogganPassword)
  .filter((row) => row.isValid);

console.log(validPasswordsForTheSledRentaPlaceDownTheStreet.length);
console.log(validPasswordsForTheOfficialTobogganCorporation.length);
