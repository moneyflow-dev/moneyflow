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
  type?: TransactionType;
  accountId?: AccountID;
  currencyId?: CurrencyID;
  expenseCategoryId?: ExpenseCategoryID;
  incomeCategoryId?: IncomeCategoryID;
}

const isSpecificTransactionType = (
  transaction: Transaction,
  type?: TransactionType,
): boolean => {
  if (typeof type === "undefined") {
    return true;
  }
  return transaction.type === type;
};

const isSpecificTransactionAccountId = (
  transaction: Transaction,
  accountId?: AccountID,
): boolean => {
  if (typeof accountId === "undefined") {
    return true;
  }
  switch (transaction.type) {
    case TransactionType.expense:
      return transaction.accountId === accountId;
    case TransactionType.income:
      return transaction.accountId === accountId;
    case TransactionType.transfer:
      return (
        transaction.fromAccount.accountId === accountId ||
        transaction.toAccount.accountId === accountId
      );
    default:
      throw new Error("Impossible transaction type on transactions filter");
  }
};

const isSpecificTransactionCurrencyId = (
  transaction: Transaction,
  accounts: AccountsMap,
  currencyId?: CurrencyID,
): boolean => {
  if (typeof currencyId === "undefined") {
    return true;
  }
  switch (transaction.type) {
    case TransactionType.expense: {
      const account = accounts[transaction.accountId];
      return currencyId === account.currencyId;
    }
    case TransactionType.income: {
      const account = accounts[transaction.accountId];
      return currencyId === account.currencyId;
    }
    case TransactionType.transfer: {
      const fromAccount = accounts[transaction.fromAccount.accountId];
      const toAccount = accounts[transaction.toAccount.accountId];
      return (
        currencyId === fromAccount.currencyId ||
        currencyId === toAccount.currencyId
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
      ),
  );
};
