import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { TransactionFilters } from "@features/filter-transactions";

interface TransactionFiltersStoreState {
  filters: TransactionFilters;
  searchTerm: string;
  setSearchTerm(searchTerm: string): void;
  setTransactionFilters(filters: TransactionFilters): void;
}

export const useTransactionFiltersStore =
  create<TransactionFiltersStoreState>()(
    devtools((set) => ({
      filters: {},
      searchTerm: "",
      setSearchTerm(searchTerm) {
        set({ searchTerm });
      },
      setTransactionFilters(filters) {
        set({ filters });
      },
    })),
  );
