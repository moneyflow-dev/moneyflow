import { Decimal } from "decimal.js";

import { AccountID, AccountsMap } from "@entities/account";
import { CurrencyID } from "@entities/currency";
import { Transaction, TransactionType } from "@entities/transaction";

export const getAccountBalance = (
  accountId: AccountID,
  initialBalance: string,
  transactions: Transaction[],
): string => {
  let balance = new Decimal(initialBalance);
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

export const getCurrencyBalance = (
  currencyId: CurrencyID,
  accounts: AccountsMap,
  transactions: Transaction[],
): string => {
  let balance = new Decimal("0");

  for (const account of Object.values(accounts)) {
    if (account.currencyId === currencyId) {
      balance = balance.plus(account.initialBalance);
    }
  }
  for (const transaction of transactions) {
    switch (transaction.type) {
      case TransactionType.expense: {
        if (accounts[transaction.accountId].currencyId === currencyId) {
          balance = balance.minus(transaction.amount);
        }
        break;
      }
      case TransactionType.income: {
        if (accounts[transaction.accountId].currencyId === currencyId) {
          balance = balance.plus(transaction.amount);
        }
        break;
      }
      case TransactionType.transfer: {
        const fromAccount = transaction.fromAccount;
        if (accounts[fromAccount.accountId].currencyId === currencyId) {
          balance = balance.minus(fromAccount.amount);
        }
        const toAccount = transaction.toAccount;
        if (accounts[toAccount.accountId].currencyId === currencyId) {
          balance = balance.plus(toAccount.amount);
        }
        break;
      }
    }
  }
  return balance.toString();
};
