export interface ScheduleSlot {
  service?: number;
  index: number;
}

export interface Schedule {
  earliestDeparture: number;
  slots: ScheduleSlot[];
}

export interface NextAvailableService {
  service: number;
  departure: number;
  timeToWait: number;
}
