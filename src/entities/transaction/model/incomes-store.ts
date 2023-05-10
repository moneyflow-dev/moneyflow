import { DateTime } from "luxon";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { incomesApi } from "@shared/api/incomes-api";

import {
  CreateIncome,
  Income,
  IncomeID,
  Incomes,
  UpdateIncome,
} from "./models";

interface IncomesStoreState {
  incomes: Incomes;
  fetchIncomes(): Promise<void>;
  getIncome(id: IncomeID): Income;
  createIncome(income: CreateIncome): Promise<void>;
  updateIncome(id: IncomeID, income: UpdateIncome): Promise<void>;
  deleteIncome(id: IncomeID): Promise<void>;
  deleteIncomesByAccounts(accountIds: string[]): Promise<void>;
  deleteIncomesByCategories(categoryIds: string[]): Promise<void>;
}

export const useIncomesStore = create<IncomesStoreState>()(
  devtools((set, get) => ({
    incomes: {},
    async fetchIncomes() {
      const incomes = await incomesApi.getIncomes();
      const formattedIncomes = Object.fromEntries(
        Object.entries(incomes).map(([incomeId, income]) => [
          incomeId,
          {
            ...income,
            datetime: DateTime.fromMillis(income.datetime),
            createdAt: DateTime.fromMillis(income.createdAt),
          },
        ]),
      );
      set({ incomes: formattedIncomes });
    },
    getIncome(id) {
      return get().incomes[id];
    },
    async createIncome(income) {
      const createdIncome = await incomesApi.createIncome({
        ...income,
        datetime: income.datetime.toMillis(),
      });
      set((state) => ({
        incomes: {
          ...state.incomes,
          [createdIncome.id]: {
            ...createdIncome,
            createdAt: income.datetime,
            datetime: income.datetime,
          },
        },
      }));
    },
    async updateIncome(id, income) {
      const updatedIncome = await incomesApi.updateIncome(id, {
        ...income,
        datetime: income.datetime.toMillis(),
      });
      set((state) => ({
        incomes: {
          ...state.incomes,
          [id]: {
            ...updatedIncome,
            datetime: income.datetime,
            createdAt: DateTime.fromMillis(updatedIncome.createdAt),
          },
        },
      }));
    },
    async deleteIncome(id) {
      await incomesApi.deleteIncome(id);
      set((state) => ({
        incomes: Object.fromEntries(
          Object.entries(state.incomes).filter(([incomeId]) => incomeId !== id),
        ),
      }));
    },
    async deleteIncomesByAccounts(accountIds) {
      await incomesApi.deleteIncomesByAccounts(accountIds);
      set((state) => ({
        incomes: Object.fromEntries(
          Object.entries(state.incomes).filter(
            ([_, income]) => !accountIds.includes(income.accountId),
          ),
        ),
      }));
    },
    async deleteIncomesByCategories(categoryIds) {
      await incomesApi.deleteIncomesByCategories(categoryIds);
      set((state) => ({
        incomes: Object.fromEntries(
          Object.entries(state.incomes).filter(
            ([_, income]) => !categoryIds.includes(income.categoryId),
          ),
        ),
      }));
    },
  })),
);
