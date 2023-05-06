import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { incomeCategoriesApi } from "@shared/api/income-categories-api";

import {
  CreateIncomeCategory,
  IncomeCategories,
  IncomeCategoryID,
  UpdateIncomeCategory,
} from "./models";

interface IncomeCategoriesStoreState {
  incomeCategories: IncomeCategories;
  fetchIncomeCategories(): Promise<void>;
  createIncomeCategory(category: CreateIncomeCategory): Promise<void>;
  updateIncomeCategory(
    id: IncomeCategoryID,
    category: UpdateIncomeCategory,
  ): Promise<void>;
  deleteIncomeCategory(id: IncomeCategoryID): Promise<IncomeCategoryID[]>;
}

export const useIncomeCategoriesStore = create<IncomeCategoriesStoreState>()(
  devtools((set) => ({
    incomeCategories: {},
    async fetchIncomeCategories() {
      set({
        incomeCategories: await incomeCategoriesApi.getIncomeCategories(),
      });
    },
    async createIncomeCategory(category) {
      const createdCategory = await incomeCategoriesApi.createIncomeCategory(
        category,
      );
      set((state) => ({
        incomeCategories: {
          ...state.incomeCategories,
          [createdCategory.id]: createdCategory,
        },
      }));
    },
    async updateIncomeCategory(id, category) {
      await incomeCategoriesApi.updateIncomeCategory(id, category);
      set((state) => ({
        incomeCategories: {
          ...state.incomeCategories,
          [id]: { ...category, id },
        },
      }));
    },
    async deleteIncomeCategory(id) {
      const idsToDelete = await incomeCategoriesApi.deleteIncomeCategory(id);
      set((state) => ({
        incomeCategories: Object.fromEntries(
          Object.entries(state.incomeCategories).filter(
            ([categoryId]) => !idsToDelete.includes(categoryId),
          ),
        ),
      }));
      return idsToDelete;
    },
  })),
);
