import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface CategoriesPageStoreState {
  tab: number;
  onChangeTab(tab: number): void;
}

export const useCategoriesPageStore = create<CategoriesPageStoreState>()(
  devtools((set) => ({
    tab: 0,
    onChangeTab(tab) {
      set({ tab });
    },
  })),
);
