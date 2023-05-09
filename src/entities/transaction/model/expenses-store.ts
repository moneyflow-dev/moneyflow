import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { expensesApi } from "@shared/api/expenses-api";

import {
  CreateExpense,
  Expense,
  ExpenseID,
  Expenses,
  UpdateExpense,
} from "./models";

interface ExpensesStoreState {
  expenses: Expenses;
  fetchExpenses(): Promise<void>;
  getExpense(id: ExpenseID): Promise<Expense>;
  createExpense(expense: CreateExpense): Promise<void>;
  updateExpense(id: ExpenseID, expense: UpdateExpense): Promise<void>;
  deleteExpense(id: ExpenseID): Promise<void>;
  deleteExpensesByAccounts(accountIds: string[]): Promise<void>;
  deleteExpensesByCategories(categoryIds: string[]): Promise<void>;
}

export const useExpensesStore = create<ExpensesStoreState>()(
  devtools((set, get) => ({
    expenses: {},
    async fetchExpenses() {
      set(await expensesApi.getExpenses());
    },
    async getExpense(id) {
      return get().expenses[id];
    },
    async createExpense(expense) {
      const createdExpense = await expensesApi.createExpense(expense);
      set((state) => ({
        expenses: { ...state.expenses, [createdExpense.id]: createdExpense },
      }));
    },
    async updateExpense(id, expense) {
      await expensesApi.updateExpense(id, expense);
      set((state) => ({
        expenses: { ...state.expenses, [id]: { ...expense, id } },
      }));
    },
    async deleteExpense(id) {
      await expensesApi.deleteExpense(id);
      set((state) => ({
        expenses: Object.fromEntries(
          Object.entries(state.expenses).filter(
            ([expenseId]) => expenseId !== id,
          ),
        ),
      }));
    },
    async deleteExpensesByAccounts(accountIds) {
      await expensesApi.deleteExpensesByAccounts(accountIds);
      set((state) => ({
        expenses: Object.fromEntries(
          Object.entries(state.expenses).filter(
            ([_, expense]) => !accountIds.includes(expense.accountId),
          ),
        ),
      }));
    },
    async deleteExpensesByCategories(categoryIds) {
      await expensesApi.deleteExpensesByCategories(categoryIds);
      set((state) => ({
        expenses: Object.fromEntries(
          Object.entries(state.expenses).filter(
            ([_, expense]) => !categoryIds.includes(expense.categoryId),
          ),
        ),
      }));
    },
  })),
);
