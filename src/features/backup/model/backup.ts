import { AccountsDTO, accountsApi } from "@shared/api/accounts-api";
import { CurrenciesDTO, currenciesApi } from "@shared/api/currencies-api";
import {
  ExpenseCategoriesDTO,
  expenseCategoriesApi,
} from "@shared/api/expense-categories-api";
import { ExpensesDTO, expensesApi } from "@shared/api/expenses-api";
import {
  IncomeCategoriesDTO,
  incomeCategoriesApi,
} from "@shared/api/income-categories-api";
import { IncomesDTO, incomesApi } from "@shared/api/incomes-api";
import { TransfersDTO, transfersApi } from "@shared/api/transfers-api";

export interface Backup {
  version: string;
  expenses: ExpensesDTO;
  incomes: IncomesDTO;
  transfers: TransfersDTO;
  currencies: CurrenciesDTO;
  accounts: AccountsDTO;
  expenseCategories: ExpenseCategoriesDTO;
  incomeCategories: IncomeCategoriesDTO;
}

export const createBackup = async (): Promise<Backup> => {
  const [
    expenses,
    incomes,
    transfers,
    currencies,
    accounts,
    expenseCategories,
    incomeCategories,
  ] = await Promise.all([
    expensesApi.getExpenses(),
    incomesApi.getIncomes(),
    transfersApi.getTransfers(),
    currenciesApi.getCurrencies(),
    accountsApi.getAccounts(),
    expenseCategoriesApi.getExpenseCategories(),
    incomeCategoriesApi.getIncomeCategories(),
  ]);
  return {
    version: "1",
    expenses,
    incomes,
    transfers,
    currencies,
    accounts,
    expenseCategories,
    incomeCategories,
  };
};
