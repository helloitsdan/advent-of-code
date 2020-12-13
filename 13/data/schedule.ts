import { Schedule } from "../types.ts";

export const readSchedule = (file: string): Schedule => {
  const raw = Deno.readTextFileSync(file);
  const [departure, serviceString] = raw.split(/\n/);
  const slots = serviceString.split(",")
    .map((service, index) => ({
      service: (service !== "x") ? parseInt(service) : undefined,
      index: index,
    }));

  return {
    earliestDeparture: parseInt(departure),
    slots,
  };
};

export default readSchedule("./data/schedule.txt");
