import { Rule, Ticket, ValidatedTicket, ValidatedTickets } from "./types.ts";

const isFieldValid = (rule: Rule, field: number) => (
  rule.ranges.some((range) => range.min <= field && field <= range.max)
);

const validateTicket = (rules: Rule[], ticket: Ticket) => (
  ticket.reduce(
    (validatedFields, field) => {
      const isValid = rules.some((rule) => isFieldValid(rule, field));

      return isValid
        ? {
          ...validatedFields,
          valid: [
            ...validatedFields.valid,
            field,
          ],
        }
        : {
          ...validatedFields,
          invalid: [
            ...validatedFields.invalid,
            field,
          ],
        };
    },
    {
      valid: [],
      invalid: [],
    } as ValidatedTicket,
  )
);

export const validateTickets = (
  rules: Rule[],
  tickets: Ticket[],
) => (
  tickets.reduce(
    (validatedTickets, ticket) => {
      const validatedTicket = validateTicket(rules, ticket);
      const isValid = validatedTicket.invalid.length === 0;

      return isValid
        ? {
          ...validatedTickets,
          valid: [
            ...validatedTickets.valid,
            ticket,
          ],
        }
        : {
          ...validatedTickets,
          invalid: [
            ...validatedTickets.invalid,
            validatedTicket,
          ],
        };
    },
    {
      valid: [],
      invalid: [],
    } as ValidatedTickets,
  )
);

export const findFieldNames = (rules: Rule[], tickets: Ticket[]) => {
  const fieldsToFind = [...rules];
  const fields = new Map<string, number>();

  while (fieldsToFind.length > 0) {
    for (let idx = 0; idx < tickets[0].length; idx++) {
      const valueFromAllTickets = tickets.map((ticket) => ticket[idx]);

      const possibleFields = fieldsToFind.filter((field) =>
        valueFromAllTickets.every((value) => isFieldValid(field, value))
      );

      if (possibleFields.length === 1) {
        fields.set(possibleFields[0].name, idx);
        fieldsToFind.splice(fieldsToFind.indexOf(possibleFields[0]), 1);
      }
    }
  }

  return fields;
};
