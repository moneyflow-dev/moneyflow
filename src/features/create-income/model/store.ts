import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { AccountID } from "@entities/account";
import { IncomeCategoryID } from "@entities/category";

import { CreateIncomeFormData } from "../ui/create-income-form-fieldset";

interface CreateIncomeFormStoreState extends CreateIncomeFormData {
  getCreateIncomeFormState(): CreateIncomeFormData;
  setCreateIncomeFormState(value: CreateIncomeFormData): void;
  setAccountId(accountId: AccountID | null): void;
  setCategoryId(categoryId: IncomeCategoryID | null): void;
  resetCreateIncomeFormState(): void;
}

export const useCreateIncomeFormStore = create<CreateIncomeFormStoreState>()(
  devtools((set, get) => ({
    title: "",
    categoryId: null,
    accountId: null,
    amount: "",
    datetime: "",
    getCreateIncomeFormState() {
      const { title, categoryId, accountId, amount, datetime } = get();
      return { title, categoryId, accountId, amount, datetime };
    },
    setCreateIncomeFormState(value) {
      set({ ...value });
    },
    setAccountId(accountId) {
      set({ accountId });
    },
    setCategoryId(categoryId) {
      set({ categoryId });
    },
    resetCreateIncomeFormState() {
      set({
        title: "",
        categoryId: null,
        accountId: null,
        amount: "",
        datetime: "",
      });
    },
  })),
);
