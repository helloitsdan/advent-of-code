export interface Range {
  min: number;
  max: number;
}

export interface Rule {
  name: string;
  ranges: Range[];
}

export type Ticket = number[];

export interface TicketData {
  rules: Rule[];
  ticket: Ticket;
  nearbyTickets: Ticket[];
}

export interface ValidatedTicket {
  valid: number[];
  invalid: number[];
}

export interface ValidatedTickets {
  valid: Ticket[];
  invalid: ValidatedTicket[];
}
