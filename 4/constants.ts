export const PASSPORT_GROUP_REGEX = /([a-z]{3}:\S+)\s{0,1}/g;
export const REQUIRED_PASSPORT_FIELDS = [
  "byr",
  "iyr",
  "eyr",
  "hgt",
  "hcl",
  "ecl",
  "pid",
] as const;
export const OPTIONAL_PASSPORT_FIELDS = ["cid"] as const;

export type RequiredPassportField = typeof REQUIRED_PASSPORT_FIELDS[number];
export type OptionalPasswordField = typeof OPTIONAL_PASSPORT_FIELDS[number];
export type PassportField = RequiredPassportField | OptionalPasswordField;

export type Passport = Record<RequiredPassportField, string> &
  Partial<Record<OptionalPasswordField, string>>;

export interface Range {
  min: number;
  max: number;
}

export const HEIGHT_PATTERN_REGEX = /^(\d+)(\D+)$/;
export const PASSPORT_VALIDATION_RULES: {
  byr: Range;
  iyr: Range;
  eyr: Range;
  hgt: Record<string, Range>;
  hcl: RegExp;
  pid: RegExp;
  ecl: string[];
} = {
  byr: {
    min: 1920,
    max: 2002,
  },
  iyr: {
    min: 2010,
    max: 2020,
  },
  eyr: {
    min: 2020,
    max: 2030,
  },
  hgt: {
    cm: {
      min: 150,
      max: 193,
    },
    in: {
      min: 59,
      max: 76,
    },
  },
  hcl: /^#(\w{6})$/,
  pid: /^([0-9]{9})$/,
  ecl: ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"],
};
