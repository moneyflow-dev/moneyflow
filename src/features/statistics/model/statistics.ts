import { Decimal } from "decimal.js";

import { Account, AccountID } from "@entities/account";
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
  accounts: Account[],
  transactions: Transaction[],
): string => {
  let balance = new Decimal("0");
  for (const account of accounts) {
    if (account.currencyId === currencyId) {
      balance = balance.plus(
        getAccountBalance(account.id, account.initialBalance, transactions),
      );
    }
  }
  return balance.toString();
};

export const getCurrencyIncome = (
  currencyId: CurrencyID,
  accounts: Account[],
  transactions: Transaction[],
): Decimal => {
  let income = new Decimal("0");
  for (const account of accounts) {
    const accountId = account.id;
    if (account.currencyId === currencyId) {
      for (const transaction of transactions) {
        switch (transaction.type) {
          case TransactionType.income: {
            income = income.plus(transaction.amount);
            break;
          }
          case TransactionType.transfer: {
            if (transaction.toAccount.accountId === accountId) {
              income = income.plus(transaction.toAccount.amount);
            }
            break;
          }
        }
      }
    }
  }
  return income;
};

export const getCurrencyExpense = (
  currencyId: CurrencyID,
  accounts: Account[],
  transactions: Transaction[],
): Decimal => {
  let expense = new Decimal("0");
  for (const account of accounts) {
    const accountId = account.id;
    if (account.currencyId === currencyId) {
      for (const transaction of transactions) {
        switch (transaction.type) {
          case TransactionType.expense: {
            expense = expense.minus(transaction.amount);
            break;
          }
          case TransactionType.transfer: {
            if (transaction.fromAccount.accountId === accountId) {
              expense = expense.minus(transaction.fromAccount.amount);
            }
            break;
          }
        }
      }
    }
  }
  return expense;
};
