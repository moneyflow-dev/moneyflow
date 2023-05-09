import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { AccountID } from "@entities/account";
import { ExpenseCategoryID } from "@entities/category";

import { CreateExpenseFormData } from "../ui/create-expense-form-fieldset";

interface CreateExpenseFormStoreState extends CreateExpenseFormData {
  getCreateExpenseFormState(): CreateExpenseFormData;
  setCreateExpenseFormState(value: CreateExpenseFormData): void;
  setAccountId(accountId: AccountID | null): void;
  setCategoryId(categoryId: ExpenseCategoryID | null): void;
  resetCreateExpenseFormState(): void;
}

export const useCreateExpenseFormStore = create<CreateExpenseFormStoreState>()(
  devtools((set, get) => ({
    title: "",
    categoryId: null,
    accountId: null,
    amount: "",
    datetime: "",
    getCreateExpenseFormState() {
      const { title, categoryId, accountId, amount, datetime } = get();
      return { title, categoryId, accountId, amount, datetime };
    },
    setCreateExpenseFormState(value) {
      set({ ...value });
    },
    setAccountId(accountId) {
      set({ accountId });
    },
    setCategoryId(categoryId) {
      set({ categoryId });
    },
    resetCreateExpenseFormState() {
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
