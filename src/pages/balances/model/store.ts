import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface BalancesPageStoreState {
  tab: number;
  onChangeTab(tab: number): void;
}

export const useBalancesPageStore = create<BalancesPageStoreState>()(
  devtools((set) => ({
    tab: 0,
    onChangeTab(tab) {
      set({ tab });
    },
  })),
);
