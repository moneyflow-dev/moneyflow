import { DateTime } from "luxon";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { incomeCategoriesApi } from "@shared/api/income-categories-api";

import {
  CreateIncomeCategory,
  IncomeCategories,
  IncomeCategory,
  IncomeCategoryID,
  UpdateIncomeCategory,
} from "./models";

interface IncomeCategoriesStoreState {
  incomeCategories: IncomeCategories;
  getIncomeCategory(id: IncomeCategoryID): IncomeCategory;
  fetchIncomeCategories(): Promise<void>;
  createIncomeCategory(category: CreateIncomeCategory): Promise<void>;
  updateIncomeCategory(
    id: IncomeCategoryID,
    category: UpdateIncomeCategory,
  ): Promise<void>;
  deleteIncomeCategory(id: IncomeCategoryID): Promise<IncomeCategoryID[]>;
}

export const useIncomeCategoriesStore = create<IncomeCategoriesStoreState>()(
  devtools((set, get) => ({
    incomeCategories: {},
    getIncomeCategory(id) {
      return get().incomeCategories[id];
    },
    async fetchIncomeCategories() {
      const incomeCategories = await incomeCategoriesApi.getIncomeCategories();
      const formattedIncomeCategories = Object.fromEntries(
        Object.entries(incomeCategories).map(
          ([incomeCategoryId, incomeCategory]) => [
            incomeCategoryId,
            {
              ...incomeCategory,
              createdAt: DateTime.fromMillis(incomeCategory.createdAt),
            },
          ],
        ),
      );
      set({
        incomeCategories: formattedIncomeCategories,
      });
    },
    async createIncomeCategory(category) {
      const createdCategory = await incomeCategoriesApi.createIncomeCategory(
        category,
      );
      set((state) => ({
        incomeCategories: {
          ...state.incomeCategories,
          [createdCategory.id]: {
            ...createdCategory,
            createdAt: DateTime.fromMillis(createdCategory.createdAt),
          },
        },
      }));
    },
    async updateIncomeCategory(id, category) {
      const updatedIncomeCategory =
        await incomeCategoriesApi.updateIncomeCategory(id, category);
      set((state) => ({
        incomeCategories: {
          ...state.incomeCategories,
          [id]: {
            ...updatedIncomeCategory,
            createdAt: DateTime.fromMillis(updatedIncomeCategory.createdAt),
          },
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
