import { Captain, Command } from "../types.ts";

const LINE_REGEX = /(\w)(\d+)\n?/gm;

export const readCaptainsOrders = (file: string) => {
  const raw = Deno.readTextFileSync(file);
  const orders: Captain = [];

  for (const [, command, scale] of raw.matchAll(LINE_REGEX)) {
    orders.push({
      command: command as Command,
      scale: parseInt(scale),
    });
  }

  return orders;
};

export default readCaptainsOrders("./data/captains-orders.txt");
