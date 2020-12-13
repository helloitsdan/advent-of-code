import { NextAvailableService, Schedule, ScheduleSlot } from "./types.ts";

export const findEarliestService = (
  schedule: Schedule,
): NextAvailableService => {
  const firstCatchableServices = schedule.slots.filter(
    (slot) => !!slot.service,
  ).map((slot) => ({
    service: slot.service!,
    departure: schedule.earliestDeparture -
      (schedule.earliestDeparture % slot.service!) + slot.service!,
  }));

  const earliestService = firstCatchableServices.reduce(
    (earliest, service) => {
      return service.departure < earliest.departure ? service : earliest;
    },
  );

  return {
    ...earliestService,
    timeToWait: earliestService.departure - schedule.earliestDeparture,
  };
};

/**
 * this problem can be solved using the Chinese Remainder theorem--i tried
 * reading up on it and using it is a little too hard for me to fully understand
 * right now...
 */
export const findTimestampOfAdjacentDepartures = (
  schedule: Schedule,
) => {
  let timestamp = 0;
  let increment = 1;

  for (const slot of schedule.slots) {
    // if the current slot doesn't have a service, it can be anything
    // therefore we don't need to do anything
    if (!slot.service) {
      continue;
    }

    let nextTimestamp = timestamp;

    // as buses depart every `slot.service` minutes, we can figure out
    // if it would depart at the lastDepartureTimestamp + its index
    // in the schedule
    do {
      nextTimestamp += increment;
    } while ((nextTimestamp + slot.index) % slot.service !== 0);

    // multiply the increment by the current prime to find minimum next gap
    // this would be the lowest common multiple of the current value and the bus,
    // but because they're all prime numbers we don't have to worry about it!
    increment *= slot.service;
    timestamp = nextTimestamp;
  }

  return timestamp;
};
