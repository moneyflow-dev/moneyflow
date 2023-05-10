import { DateTime } from "luxon";

import { TransactionListTransaction } from "../model/models";

export interface TransactionGroup {
  datetime: DateTime;
  transactions: TransactionListTransaction[];
}

export const groupTransactionsByDay = (
  transactions: TransactionListTransaction[],
): TransactionGroup[] => {
  const groupedTransactions = transactions.reduce<
    Record<string, TransactionListTransaction[]>
  >((group, transaction) => {
    const key = transaction.datetime.toFormat("yyyy-LL-dd");
    if (key in group) {
      group[key].push(transaction);
    } else {
      group[key] = [transaction];
    }
    return group;
  }, {});
  const keys = Object.keys(groupedTransactions).sort(
    (a, b) => DateTime.fromISO(b).toMillis() - DateTime.fromISO(a).toMillis(),
  );
  return keys.map((key) => ({
    datetime: DateTime.fromISO(key),
    transactions: groupedTransactions[key],
  }));
};
