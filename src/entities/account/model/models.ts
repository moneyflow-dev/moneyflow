import { DateTime } from "luxon";

import { ColorPickerColor } from "@shared/ui/color-pickers";

export type AccountID = string;

export const AccountIcon = {
  cash: "cash",
  card: "card",
  pig: "pig",
  coins: "coins",
  sackDollar: "sackDollar",
  landmark: "landmark",
  bitcoin: "bitcoin",
} as const;
export type AccountIcon = (typeof AccountIcon)[keyof typeof AccountIcon];

export interface CreateAccount {
  title: string;
  color: ColorPickerColor;
  icon: AccountIcon;
  initialBalance: string;
  currencyId: string;
}

export type UpdateAccount = CreateAccount;

export interface Account extends CreateAccount {
  id: AccountID;
  createdAt: DateTime;
}

export type AccountsMap = Record<AccountID, Account>;

export interface Accounts {
  order: AccountID[];
  accounts: AccountsMap;
}
