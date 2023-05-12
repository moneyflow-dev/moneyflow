import { DateTime } from "luxon";

import { Transaction } from "@entities/transaction";

export interface TransactionGroup {
  datetime: DateTime;
  transactions: Transaction[];
}

export const groupTransactionsByDay = (
  transactions: Transaction[],
): TransactionGroup[] => {
  const groupedTransactions = transactions.reduce<
    Record<string, Transaction[]>
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
