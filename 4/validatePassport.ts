import {
  Passport,
  Range,
  PASSPORT_VALIDATION_RULES,
  HEIGHT_PATTERN_REGEX,
} from "./constants.ts";

const isInRange = (toTest: number, { min, max }: Range) => {
  return toTest >= min && toTest <= max;
};

const validatePassport = (passport: Passport) => {
  const { byr, iyr, eyr, hgt, hcl, ecl, pid } = passport;

  if (!isInRange(parseInt(byr), PASSPORT_VALIDATION_RULES.byr)) {
    return false;
  }

  if (!isInRange(parseInt(iyr), PASSPORT_VALIDATION_RULES.iyr)) {
    return false;
  }

  if (!isInRange(parseInt(eyr), PASSPORT_VALIDATION_RULES.eyr)) {
    return false;
  }

  const [, height, unit] = hgt.match(HEIGHT_PATTERN_REGEX) || [];
  const heightRange = PASSPORT_VALIDATION_RULES.hgt[unit];

  if (!heightRange || !isInRange(parseInt(height), heightRange)) {
    return false;
  }

  if (!hcl.match(PASSPORT_VALIDATION_RULES.hcl)) {
    return false;
  }

  if (!PASSPORT_VALIDATION_RULES.ecl.includes(ecl)) {
    return false;
  }

  if (!pid.match(PASSPORT_VALIDATION_RULES.pid)) {
    return false;
  }

  return true;
};

export default validatePassport;
