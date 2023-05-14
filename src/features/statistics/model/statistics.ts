import { Decimal } from "decimal.js";

import { AccountID } from "@entities/account";
import { Transaction, TransactionType } from "@entities/transaction";

export const getAccountBalance = (
  accountId: AccountID,
  initialBalance: string,
  transactions: Transaction[],
): string => {
  let balance: Decimal = new Decimal(initialBalance);
  for (const transaction of transactions) {
    switch (transaction.type) {
      case TransactionType.expense: {
        if (transaction.accountId === accountId) {
          balance = balance.minus(transaction.amount);
        }
        break;
      }
      case TransactionType.income: {
        if (transaction.accountId === accountId) {
          balance = balance.plus(transaction.amount);
        }
        break;
      }
      case TransactionType.transfer: {
        if (transaction.fromAccount.accountId === accountId) {
          balance = balance.minus(transaction.fromAccount.amount);
        }
        if (transaction.toAccount.accountId === accountId) {
          balance = balance.plus(transaction.toAccount.amount);
        }
        break;
      }
      default:
        throw new Error("Impossible transaction type");
    }
  }
  return balance.toString();
};
