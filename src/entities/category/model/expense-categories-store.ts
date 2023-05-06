import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { expenseCategoriesApi } from "@shared/api/expense-categories-api";

import {
  CreateExpenseCategory,
  ExpenseCategories,
  ExpenseCategory,
  ExpenseCategoryID,
  UpdateExpenseCategory,
} from "./models";

interface ExpenseCategoriesStoreState {
  expenseCategories: ExpenseCategories;
  getExpenseCategory(id: ExpenseCategoryID): ExpenseCategory;
  fetchExpenseCategories(): Promise<void>;
  createExpenseCategory(category: CreateExpenseCategory): Promise<void>;
  updateExpenseCategory(
    id: ExpenseCategoryID,
    category: UpdateExpenseCategory,
  ): Promise<void>;
  deleteExpenseCategory(id: ExpenseCategoryID): Promise<ExpenseCategoryID[]>;
}

export const useExpenseCategoriesStore = create<ExpenseCategoriesStoreState>()(
  devtools((set, get) => ({
    expenseCategories: {},
    getExpenseCategory(id) {
      return get().expenseCategories[id];
    },
    async fetchExpenseCategories() {
      set({
        expenseCategories: await expenseCategoriesApi.getExpenseCategories(),
      });
    },
    async createExpenseCategory(category) {
      const createdCategory = await expenseCategoriesApi.createExpenseCategory(
        category,
      );
      set((state) => ({
        expenseCategories: {
          ...state.expenseCategories,
          [createdCategory.id]: createdCategory,
        },
      }));
    },
    async updateExpenseCategory(id, category) {
      await expenseCategoriesApi.updateExpenseCategory(id, category);
      set((state) => ({
        expenseCategories: {
          ...state.expenseCategories,
          [id]: { ...category, id },
        },
      }));
    },
    async deleteExpenseCategory(id) {
      const idsToDelete = await expenseCategoriesApi.deleteExpenseCategory(id);
      set((state) => ({
        expenseCategories: Object.fromEntries(
          Object.entries(state.expenseCategories).filter(
            ([categoryId]) => !idsToDelete.includes(categoryId),
          ),
        ),
      }));
      return idsToDelete;
    },
  })),
);
