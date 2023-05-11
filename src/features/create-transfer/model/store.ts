import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { AccountID } from "@entities/account";

import { CreateTransferFormData } from "../ui/create-transfer-form-fieldset";

interface CreateTransferFormStoreState extends CreateTransferFormData {
  getCreateTransferFormState(): CreateTransferFormData;
  setCreateTransferFormState(value: CreateTransferFormData): void;
  setFromAccountId(accountId: AccountID | null): void;
  setToAccountId(accountId: AccountID | null): void;
  resetCreateTransferFormState(): void;
}

export const useCreateTransferFormStore =
  create<CreateTransferFormStoreState>()(
    devtools((set, get) => ({
      title: "",
      fromAccountId: null,
      fromAccountAmount: "",
      toAccountId: null,
      toAccountAmount: "",
      datetime: "",
      getCreateTransferFormState() {
        const {
          title,
          fromAccountId,
          fromAccountAmount,
          toAccountId,
          toAccountAmount,
          datetime,
        } = get();
        return {
          title,
          fromAccountId,
          fromAccountAmount,
          toAccountId,
          toAccountAmount,
          datetime,
        };
      },
      setCreateTransferFormState(value) {
        set({ ...value });
      },
      setFromAccountId(accountId) {
        set({ fromAccountId: accountId });
      },
      setToAccountId(accountId) {
        set({ toAccountId: accountId });
      },
      resetCreateTransferFormState() {
        set({
          title: "",
          fromAccountId: null,
          fromAccountAmount: "",
          toAccountId: null,
          toAccountAmount: "",
          datetime: "",
        });
      },
    })),
  );
