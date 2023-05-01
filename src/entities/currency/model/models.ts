import { ColorPickerColor } from "@shared/ui/color-pickers";

export type CurrencyID = string;

export const CurrencySymbolPosition = {
  left: "left",
  right: "right",
} as const;
export type CurrencySymbolPosition =
  (typeof CurrencySymbolPosition)[keyof typeof CurrencySymbolPosition];

export interface CreateCurrency {
  symbol: string;
  symbolPosition: CurrencySymbolPosition;
  color: ColorPickerColor;
  hasSpaceBetweenAmountAndSymbol: boolean;
}

export type UpdateCurrency = CreateCurrency;

export interface Currency extends CreateCurrency {
  id: CurrencyID;
}

export interface DeleteCurrencyDTO {
  id: CurrencyID;
}

export interface Currencies {
  order: CurrencyID[];
  currencies: Record<string, Currency>;
}
