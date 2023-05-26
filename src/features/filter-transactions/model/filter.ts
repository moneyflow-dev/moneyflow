import { DateTime } from "luxon";

import { AccountID, AccountsMap } from "@entities/account";
import {
  ExpenseCategories,
  ExpenseCategoryID,
  IncomeCategories,
  IncomeCategoryID,
} from "@entities/category";
import { CurrencyID } from "@entities/currency";
import { Transaction, TransactionType } from "@entities/transaction";

export interface TransactionFilters {
  type?: TransactionType | TransactionType[];
  accountId?: AccountID | AccountID[];
  currencyId?: CurrencyID | CurrencyID[];
  expenseCategoryId?: ExpenseCategoryID;
  incomeCategoryId?: IncomeCategoryID;
  fromDateTimeRange?: DateTime;
  toDateTimeRange?: DateTime;
}

const isSpecificTransactionType = (
  transaction: Transaction,
  type?: TransactionType | TransactionType[],
): boolean => {
  if (typeof type === "undefined") {
    return true;
  }
  if (typeof type === "string") {
    type = [type];
  }

  return type.includes(transaction.type);
};

const isSpecificTransactionAccountId = (
  transaction: Transaction,
  accountId?: AccountID | AccountID[],
): boolean => {
  if (typeof accountId === "undefined") {
    return true;
  }
  if (typeof accountId === "string") {
    accountId = [accountId];
  }

  switch (transaction.type) {
    case TransactionType.expense:
      return accountId.includes(transaction.accountId);
    case TransactionType.income:
      return accountId.includes(transaction.accountId);
    case TransactionType.transfer:
      return (
        accountId.includes(transaction.fromAccount.accountId) ||
        accountId.includes(transaction.toAccount.accountId)
      );
    default:
      throw new Error("Impossible transaction type on transactions filter");
  }
};

const isSpecificTransactionCurrencyId = (
  transaction: Transaction,
  accounts: AccountsMap,
  currencyId?: CurrencyID | CurrencyID[],
): boolean => {
  if (typeof currencyId === "undefined") {
    return true;
  }
  if (typeof currencyId === "string") {
    currencyId = [currencyId];
  }

  switch (transaction.type) {
    case TransactionType.expense: {
      const account = accounts[transaction.accountId];
      return currencyId.includes(account.currencyId);
    }
    case TransactionType.income: {
      const account = accounts[transaction.accountId];
      return currencyId.includes(account.currencyId);
    }
    case TransactionType.transfer: {
      const fromAccount = accounts[transaction.fromAccount.accountId];
      const toAccount = accounts[transaction.toAccount.accountId];
      return (
        currencyId.includes(fromAccount.currencyId) ||
        currencyId.includes(toAccount.currencyId)
      );
    }
    default:
      throw new Error("Impossible transaction type on transactions filter");
  }
};

const isSpecificTransactionExpenseCategoryId = (
  transaction: Transaction,
  categories: ExpenseCategories,
  categoryId?: ExpenseCategoryID,
): boolean => {
  if (typeof categoryId === "undefined") {
    return true;
  }
  if (transaction.type !== TransactionType.expense) {
    return false;
  }
  if (transaction.categoryId === categoryId) {
    return true;
  }

  for (const category of Object.values(categories)) {
    if (
      category.parentId === categoryId &&
      isSpecificTransactionExpenseCategoryId(
        transaction,
        categories,
        category.id,
      )
    ) {
      return true;
    }
  }
  return false;
};

const isSpecificTransactionIncomeCategoryId = (
  transaction: Transaction,
  categories: IncomeCategories,
  categoryId?: IncomeCategoryID,
): boolean => {
  if (typeof categoryId === "undefined") {
    return true;
  }
  if (transaction.type !== TransactionType.income) {
    return false;
  }
  if (transaction.categoryId === categoryId) {
    return true;
  }

  for (const category of Object.values(categories)) {
    if (
      category.parentId === categoryId &&
      isSpecificTransactionIncomeCategoryId(
        transaction,
        categories,
        category.id,
      )
    ) {
      return true;
    }
  }
  return false;
};

const isSpecificFromDateTimeRange = (
  transaction: Transaction,
  fromDateTimeRange?: DateTime,
): boolean => {
  if (typeof fromDateTimeRange === "undefined") {
    return true;
  }

  return transaction.datetime.toMillis() >= fromDateTimeRange.toMillis();
};

const isSpecificToDateTimeRange = (
  transaction: Transaction,
  toDateTimeRange?: DateTime,
): boolean => {
  if (typeof toDateTimeRange === "undefined") {
    return true;
  }

  return transaction.datetime.toMillis() <= toDateTimeRange.toMillis();
};

export const filterTransactions = (
  transactions: Transaction[],
  filters: TransactionFilters,
  accounts: AccountsMap,
  expenseCategories: ExpenseCategories,
  incomeCategories: IncomeCategories,
): Transaction[] => {
  return transactions.filter(
    (transaction) =>
      isSpecificTransactionType(transaction, filters.type) &&
      isSpecificTransactionAccountId(transaction, filters.accountId) &&
      isSpecificTransactionCurrencyId(
        transaction,
        accounts,
        filters.currencyId,
      ) &&
      isSpecificTransactionExpenseCategoryId(
        transaction,
        expenseCategories,
        filters.expenseCategoryId,
      ) &&
      isSpecificTransactionIncomeCategoryId(
        transaction,
        incomeCategories,
        filters.incomeCategoryId,
      ) &&
      isSpecificFromDateTimeRange(transaction, filters.fromDateTimeRange) &&
      isSpecificToDateTimeRange(transaction, filters.toDateTimeRange),
  );
};
