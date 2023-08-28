import { Directory, Encoding, Filesystem } from "@capacitor/filesystem";
import { Share } from "@capacitor/share";
import { DateTime } from "luxon";

import { accountsApi } from "@shared/api/accounts-api";
import { currenciesApi } from "@shared/api/currencies-api";
import { expenseCategoriesApi } from "@shared/api/expense-categories-api";
import { expensesApi } from "@shared/api/expenses-api";
import { incomeCategoriesApi } from "@shared/api/income-categories-api";
import { incomesApi } from "@shared/api/incomes-api";
import { settingsApi } from "@shared/api/settings-api";
import { transfersApi } from "@shared/api/transfers-api";
import { versionApi } from "@shared/api/version-api";

import { Backup } from "./types";

const createBackup = async (): Promise<Backup> => {
  const [
    version,
    currencies,
    accounts,
    expenseCategories,
    incomeCategories,
    expenses,
    incomes,
    transfers,
    settings,
  ] = await Promise.all([
    versionApi.getVersion(),
    currenciesApi.getCurrencies(),
    accountsApi.getAccounts(),
    expenseCategoriesApi.getExpenseCategories(),
    incomeCategoriesApi.getIncomeCategories(),
    expensesApi.getExpenses(),
    incomesApi.getIncomes(),
    transfersApi.getTransfers(),
    settingsApi.getSettings(),
  ]);
  return {
    version: version as 2,
    expenses,
    incomes,
    transfers,
    currencies,
    accounts,
    expenseCategories,
    incomeCategories,
    settings,
  };
};

export const exportBackup = async () => {
  const backup = await createBackup();

  const timestamp = DateTime.now().toMillis();
  const filename = `moneyflow-backup-v${backup.version}-${timestamp}.json`;
  const data = JSON.stringify(backup);
  const writeResult = await Filesystem.writeFile({
    path: filename,
    directory: Directory.Cache,
    data,
    encoding: Encoding.UTF8,
  });
  try {
    await Share.share({
      files: [writeResult.uri],
    });
  } catch (err) {
    console.log("Share canceled");
  }
  await Filesystem.deleteFile({
    path: filename,
    directory: Directory.Cache,
  });
};
