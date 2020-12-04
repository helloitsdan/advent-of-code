export const PASSWORD_ROW_REGEX = /^(\d+)-(\d+) ([a-z]+): (.*)+$/;

export interface PasswordRow {
  min: number;
  max: number;
  character: string;
  password: string;
}

export type ValidatedPasswordRow = PasswordRow & {
  isValid: boolean;
};
