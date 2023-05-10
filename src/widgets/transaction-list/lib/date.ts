import { DateTime } from "luxon";

import { isToday, isYesterday } from "@shared/lib/date";

export const createTransactionGroupDateString = (
  datetime: DateTime,
): string => {
  const localeString = datetime.toLocaleString({
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  switch (true) {
    case isToday(datetime):
      return `Today - ${localeString}`;
    case isYesterday(datetime):
      return `Yesterday - ${localeString}`;
    default:
      return localeString;
  }
};
