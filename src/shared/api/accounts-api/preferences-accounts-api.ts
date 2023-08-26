import { Preferences } from "@capacitor/preferences";
import { v4 as uuidv4 } from "uuid";

import { CurrencyID } from "../currencies-api";

import { AccountsAPI } from "./accounts-api.interface";
import {
  AccountDTO,
  AccountID,
  AccountsDTO,
  CreateAccountDTO,
  UpdateAccountDTO,
} from "./dtos";

export class PreferencesAccountsAPI implements AccountsAPI {
  private async getState(): Promise<AccountsDTO> {
    const { value } = await Preferences.get({ key: "accounts" });
    if (value === null) {
      const state: AccountsDTO = {
        order: [],
        accounts: {},
      };
      await this.setState(state);
      return state;
    }
    return JSON.parse(value);
  }

  private async setState(state: AccountsDTO) {
    await Preferences.set({
      key: "accounts",
      value: JSON.stringify(state),
    });
  }

  async getAccounts(): Promise<AccountsDTO> {
    return await this.getState();
  }

  async setAccounts(accounts: AccountsDTO) {
    await this.setState(accounts);
  }

  async createAccount(account: CreateAccountDTO): Promise<AccountDTO> {
    const state = await this.getState();
    const { order, accounts } = state;

    const id = uuidv4();
    const createdAccount: AccountDTO = {
      ...account,
      id,
      createdAt: Date.now(),
    };

    order.push(id);
    accounts[id] = createdAccount;

    await this.setState(state);
    return createdAccount;
  }

  async updateAccount(id: AccountID, account: UpdateAccountDTO) {
    const state = await this.getState();
    const { accounts } = state;

    const prevCurrency = accounts[id];
    const updatedAccount: AccountDTO = {
      ...prevCurrency,
      ...account,
    };

    accounts[id] = updatedAccount;

    await this.setState(state);

    return accounts[id];
  }

  async deleteAccount(id: AccountID) {
    const state = await this.getState();
    const { order, accounts } = state;

    state.order = order.filter((accountId) => accountId !== id);
    delete accounts[id];

    await this.setState(state);
  }

  async deleteAccountsByCurrency(currencyId: CurrencyID) {
    const state = await this.getState();
    const { order, accounts } = state;

    const idsToDelete: AccountID[] = [];
    for (const [id, account] of Object.entries(accounts)) {
      if (account.currencyId === currencyId) {
        idsToDelete.push(id);
        delete accounts[id];
      }
    }
    state.order = order.filter((accountId) => !idsToDelete.includes(accountId));

    await this.setState(state);
    return idsToDelete;
  }
}
