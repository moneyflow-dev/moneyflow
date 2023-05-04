import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { AccountIcon } from "@entities/account";
import { CurrencyID } from "@entities/currency";

import { ColorPickerColor } from "@shared/ui/color-pickers";

import { CreateAccountFormFieldsetData } from "../ui/create-account-form-fieldset";

interface CreateAccountStoreState extends CreateAccountFormFieldsetData {
  getAccountFormState(): CreateAccountFormFieldsetData;
  setAccountFormState(value: CreateAccountFormFieldsetData): void;
  setCurrencyId(currencyId: CurrencyID | null): void;
  resetAccountFormState(): void;
}

export const useCreateAccountStore = create<CreateAccountStoreState>()(
  devtools((set, get) => ({
    title: "",
    currencyId: null,
    color: ColorPickerColor.peach,
    icon: AccountIcon.cash,
    initialBalance: "0",
    getAccountFormState() {
      const state = get();
      return {
        title: state.title,
        currencyId: state.currencyId,
        color: state.color,
        icon: state.icon,
        initialBalance: state.initialBalance,
      };
    },
    setAccountFormState(value) {
      set({ ...value });
    },
    setCurrencyId(currencyId) {
      set({ currencyId });
    },
    resetAccountFormState() {
      set({
        title: "",
        currencyId: null,
        color: ColorPickerColor.peach,
        icon: AccountIcon.cash,
        initialBalance: "0",
      });
    },
  })),
);
