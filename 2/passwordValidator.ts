import {
  PASSWORD_ROW_REGEX,
  PasswordRow,
  ValidatedPasswordRow,
} from "./constants.ts";

export const parsePasswordRow = (passwordRow: string): PasswordRow | null => {
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

export const validateSledPassword = (
  row: PasswordRow,
): ValidatedPasswordRow => {
  const validPasswordRegex = new RegExp(row.character, "g");

  const characterInstances = (row.password.match(validPasswordRegex) || [])
    .length;
  const isValid = characterInstances >= row.min &&
    characterInstances <= row.max;

  return {
    ...row,
    isValid,
  };
};

export const validateTobogganPassword = (
  row: PasswordRow,
): ValidatedPasswordRow => {
  const firstCharacterValid = row.password[row.min - 1] === row.character;
  const secondCharacterValid = row.password[row.max - 1] === row.character;

  return {
    ...row,
    isValid: firstCharacterValid != secondCharacterValid,
  };
};
