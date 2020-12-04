import {
  OPTIONAL_PASSPORT_FIELDS,
  Passport,
  PASSPORT_GROUP_REGEX,
  PassportField,
  REQUIRED_PASSPORT_FIELDS,
} from "./constants.ts";

import validatePassport from "./utils/validatePassport.ts";

const isPassportField = (value: string): value is PassportField =>
  //@ts-ignore Coerce string into union field to check type
  REQUIRED_PASSPORT_FIELDS.indexOf(value) > -1 ||
  //@ts-ignore Coerce string into union field to check type
  OPTIONAL_PASSPORT_FIELDS.indexOf(value) > 1;

const parsePassport = (passportRow: string) => {
  const fields = passportRow.matchAll(PASSPORT_GROUP_REGEX);

  return [...fields].reduce((record, field) => {
    const [key, value] = field[1].split(":");

    return {
      ...record,
      [key]: value,
    };
  }, {} as Record<PassportField, string>);
};

const isPassportShaped = (
  passport: Partial<Record<PassportField, string>>,
): passport is Passport => {
  const providedKeys = Object.keys(passport);
  return REQUIRED_PASSPORT_FIELDS.every((key) => providedKeys.includes(key));
};

const getValidPassports = (passportRows: string) => {
  const passports: Passport[] = passportRows
    .split(/\n\n/)
    .map(parsePassport)
    .filter(isPassportShaped);
  return passports.filter(validatePassport);
};

export default getValidPassports;
