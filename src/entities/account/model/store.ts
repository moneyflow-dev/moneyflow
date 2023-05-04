import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { accountsApi } from "@shared/api/accounts-api";

import { AccountID, Accounts, CreateAccount, UpdateAccount } from "./models";

interface AccountsStoreState extends Accounts {
  fetchAccounts(): Promise<void>;
  createAccount(account: CreateAccount): Promise<void>;
  updateAccount(id: AccountID, account: UpdateAccount): Promise<void>;
  deleteAccount(id: AccountID): Promise<void>;
  deleteAccountsByCurrency(currencyId: string): Promise<AccountID[]>;
}

export const useAccountsStore = create<AccountsStoreState>()(
  devtools((set) => ({
    order: [],
    accounts: {},
    async fetchAccounts() {
      const accounts = await accountsApi.getAccounts();
      set(() => ({
        order: accounts.order,
        accounts: accounts.accounts,
      }));
    },
    async createAccount(account) {
      const createdAccount = await accountsApi.createAccount(account);
      set((state) => ({
        order: [...state.order, createdAccount.id],
        accounts: {
          ...state.accounts,
          [createdAccount.id]: createdAccount,
        },
      }));
    },
    async updateAccount(id, account) {
      await accountsApi.updateAccount(id, account);
      set((state) => ({
        accounts: {
          ...state.accounts,
          [id]: { id, ...account },
        },
      }));
    },
    async deleteAccount(id) {
      await accountsApi.deleteAccount(id);
      set((state) => ({
        order: state.order.filter((accountId) => accountId !== id),
        accounts: Object.fromEntries(
          Object.entries(state.accounts).filter(
            ([currencyId]) => currencyId !== id,
          ),
        ),
      }));
    },
    async deleteAccountsByCurrency(currencyId) {
      const idsToDelete = await accountsApi.deleteAccountsByCurrency(
        currencyId,
      );
      set(({ order, accounts }) => ({
        order: order.filter((accountId) => !idsToDelete.includes(accountId)),
        accounts: Object.fromEntries(
          Object.entries(accounts).filter(
            ([accountId]) => !idsToDelete.includes(accountId),
          ),
        ),
      }));
      return idsToDelete;
    },
  })),
);
