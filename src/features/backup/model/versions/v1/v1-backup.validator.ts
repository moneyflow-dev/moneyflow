import { isEqualSet } from "@shared/lib/itertools";

import { BackupValidationError } from "../../errors";

import { V1Backup } from "./v1-backup.schema";

function validateV1BackupCurrenciesConsistency(
  currencies: V1Backup["currencies"],
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

function validateV1BackupAccountsConsistency(
  accounts: V1Backup["accounts"],
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

function validateV1BackupCategoriesConsistency(
  categories: V1Backup["expenseCategories"] | V1Backup["incomeCategories"],
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

function validateV1BackupExpensesConsistency(
  expenses: V1Backup["expenses"],
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

function validateV1BackupIncomesConsistency(
  incomes: V1Backup["incomes"],
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

function validateV1BackupTransfersConsistency(
  transfers: V1Backup["transfers"],
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

export function validateV1BackupConsistency(backup: V1Backup): boolean {
  try {
    const currencyIds = validateV1BackupCurrenciesConsistency(
      backup.currencies,
    );
    const accountIds = validateV1BackupAccountsConsistency(
      backup.accounts,
      currencyIds,
    );
    const expenseCategoryIds = validateV1BackupCategoriesConsistency(
      backup.expenseCategories,
    );
    const incomeCategoryIds = validateV1BackupCategoriesConsistency(
      backup.incomeCategories,
    );
    validateV1BackupExpensesConsistency(
      backup.expenses,
      accountIds,
      expenseCategoryIds,
    );
    validateV1BackupIncomesConsistency(
      backup.incomes,
      accountIds,
      incomeCategoryIds,
    );
    validateV1BackupTransfersConsistency(backup.transfers, accountIds);
  } catch (err) {
    if (err instanceof BackupValidationError) {
      return false;
    }
    throw err;
  }
  return true;
}
