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

export interface CreateAccountDTO {
  title: string;
  color: ColorPickerColor;
  icon: AccountIcon;
  initialBalance: string;
  currencyId: string;
}

export type UpdateAccountDTO = CreateAccountDTO;

export interface AccountDTO extends CreateAccountDTO {
  id: AccountID;
  createdAt: number;
}

export interface AccountsDTO {
  order: AccountID[];
  accounts: Record<AccountID, AccountDTO>;
}
