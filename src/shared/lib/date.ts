import { DateTime } from "luxon";

export const toLocalDatetime = (datetime: DateTime): string => {
  return datetime.toFormat("yyyy-LL-dd'T'T");
};

export const getNowLocalDatetime = (): string => {
  return toLocalDatetime(DateTime.now());
};

export const sameDay = (a: DateTime, b: DateTime): boolean => {
  return a.hasSame(b, "year") && a.hasSame(b, "month") && a.hasSame(b, "day");
};

export const isToday = (datetime: DateTime): boolean => {
  return sameDay(datetime, DateTime.now());
};

export const isYesterday = (datetime: DateTime): boolean => {
  return sameDay(datetime, DateTime.now().minus({ day: 1 }));
};
