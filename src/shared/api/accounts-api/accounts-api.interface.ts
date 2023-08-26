import { CurrencyID } from "../currencies-api/dtos";

import {
  CreateAccountDTO,
  AccountsDTO,
  AccountDTO,
  AccountID,
  UpdateAccountDTO,
} from "./dtos";

export interface AccountsAPI {
  getAccounts(): Promise<AccountsDTO>;
  setAccounts(accounts: AccountsDTO): Promise<void>;
  createAccount(account: CreateAccountDTO): Promise<AccountDTO>;
  updateAccount(id: AccountID, currency: UpdateAccountDTO): Promise<AccountDTO>;
  deleteAccount(id: AccountID): Promise<void>;
  deleteAccountsByCurrency(currencyId: CurrencyID): Promise<AccountID[]>;
}
