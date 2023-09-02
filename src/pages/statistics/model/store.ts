import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { TransactionFilters } from "@features/filter-transactions";

interface StatisticsFiltersStoreState {
  filters: TransactionFilters;
  setStatisticsFilters(filters: TransactionFilters): void;
}

export const useStatisticsFiltersStore = create<StatisticsFiltersStoreState>()(
  devtools((set) => ({
    filters: {},
    setStatisticsFilters(filters) {
      set({ filters });
    },
  })),
);
