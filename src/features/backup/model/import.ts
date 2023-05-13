import { Buffer } from "buffer";

import { FilePicker } from "@capawesome/capacitor-file-picker";

import { accountsApi } from "@shared/api/accounts-api";
import { currenciesApi } from "@shared/api/currencies-api";
import { expenseCategoriesApi } from "@shared/api/expense-categories-api";
import { expensesApi } from "@shared/api/expenses-api";
import { incomeCategoriesApi } from "@shared/api/income-categories-api";
import { incomesApi } from "@shared/api/incomes-api";
import { transfersApi } from "@shared/api/transfers-api";

import { Backup } from "./backup";

export const importBackup = async () => {
  let result;
  try {
    result = await FilePicker.pickFiles({
      types: ["application/json"],
      readData: true,
    });
  } catch (err) {
    return;
  }
  const data = result.files[0]?.data;

  if (typeof data === "undefined") {
    return;
  }

  const backup: Backup = JSON.parse(Buffer.from(data, "base64").toString());
  expensesApi.setExpenses(backup.expenses);
  incomesApi.setIncomes(backup.incomes);
  transfersApi.setTransfers(backup.transfers);
  currenciesApi.setCurrencies(backup.currencies);
  accountsApi.setAccounts(backup.accounts);
  expenseCategoriesApi.setExpenseCategories(backup.expenseCategories);
  incomeCategoriesApi.setIncomeCategories(backup.incomeCategories);
};
