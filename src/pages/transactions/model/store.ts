import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { TransactionFilters } from "@features/filter-transactions";

interface TransactionFiltersStoreState {
  filters: TransactionFilters;
  setTransactionFilters(filters: TransactionFilters): void;
}

export const useTransactionFiltersStore =
  create<TransactionFiltersStoreState>()(
    devtools((set) => ({
      filters: {},
      setTransactionFilters(filters: TransactionFilters) {
        set({ filters });
      },
    })),
  );
