import { isEqualSet } from "@shared/lib/itertools";

import { BackupValidationError } from "../../errors";

import { V3Backup } from "./v3-backup.schema";

function validateV3BackupCurrenciesConsistency(
  currencies: V3Backup["currencies"],
): Set<string> {
  const currencyOrderIds = new Set(currencies.order);
  const currencyKeyIds = new Set(Object.keys(currencies.currencies));
  if (!isEqualSet(currencyOrderIds, currencyKeyIds)) {
    throw new BackupValidationError();
  }
  for (const [currencyId, currency] of Object.entries(currencies.currencies)) {
    if (currencyId !== currency.id) {
      throw new BackupValidationError();
    }
  }
  return currencyOrderIds;
}

function validateV3BackupAccountsConsistency(
  accounts: V3Backup["accounts"],
  currencyIds: Set<string>,
): Set<string> {
  const accountOrderIds = new Set(accounts.order);
  const accountKeyIds = new Set(Object.keys(accounts.accounts));
  if (!isEqualSet(accountOrderIds, accountKeyIds)) {
    throw new BackupValidationError();
  }
  for (const [accountId, account] of Object.entries(accounts.accounts)) {
    if (accountId !== account.id || !currencyIds.has(account.currencyId)) {
      throw new BackupValidationError();
    }
  }
  return accountOrderIds;
}

function validateV3BackupCategoriesConsistency(
  categories: V3Backup["expenseCategories"] | V3Backup["incomeCategories"],
): Set<string> {
  const categoryIds = new Set(Object.keys(categories));
  for (const [categoryId, category] of Object.entries(categories)) {
    if (
      categoryId !== category.id ||
      (category.parentId !== null && !categoryIds.has(category.parentId))
    ) {
      throw new BackupValidationError();
    }
  }
  return categoryIds;
}

function validateV3BackupExpensesConsistency(
  expenses: V3Backup["expenses"],
  accountIds: Set<string>,
  expenseCategoryIds: Set<string>,
) {
  for (const [expenseId, expense] of Object.entries(expenses)) {
    if (
      expenseId !== expense.id ||
      !expenseCategoryIds.has(expense.categoryId) ||
      !accountIds.has(expense.accountId)
    ) {
      throw new BackupValidationError();
    }
  }
}

function validateV3BackupIncomesConsistency(
  incomes: V3Backup["incomes"],
  accountIds: Set<string>,
  incomeCategoryIds: Set<string>,
) {
  for (const [incomeId, income] of Object.entries(incomes)) {
    if (
      incomeId !== income.id ||
      !incomeCategoryIds.has(income.categoryId) ||
      !accountIds.has(income.accountId)
    ) {
      throw new BackupValidationError();
    }
  }
}

function validateV3BackupTransfersConsistency(
  transfers: V3Backup["transfers"],
  accountIds: Set<string>,
) {
  for (const [transferId, transfer] of Object.entries(transfers)) {
    if (
      transferId !== transfer.id ||
      !accountIds.has(transfer.fromAccount.accountId) ||
      !accountIds.has(transfer.toAccount.accountId)
    ) {
      throw new BackupValidationError();
    }
  }
}

export function validateV3BackupConsistency(backup: V3Backup): boolean {
  try {
    const currencyIds = validateV3BackupCurrenciesConsistency(
      backup.currencies,
    );
    const accountIds = validateV3BackupAccountsConsistency(
      backup.accounts,
      currencyIds,
    );
    const expenseCategoryIds = validateV3BackupCategoriesConsistency(
      backup.expenseCategories,
    );
    const incomeCategoryIds = validateV3BackupCategoriesConsistency(
      backup.incomeCategories,
    );
    validateV3BackupExpensesConsistency(
      backup.expenses,
      accountIds,
      expenseCategoryIds,
    );
    validateV3BackupIncomesConsistency(
      backup.incomes,
      accountIds,
      incomeCategoryIds,
    );
    validateV3BackupTransfersConsistency(backup.transfers, accountIds);
  } catch (err) {
    if (err instanceof BackupValidationError) {
      return false;
    }
    throw err;
  }
  return true;
}
