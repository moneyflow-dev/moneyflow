import { ColorPickerColor } from "@shared/ui/color-pickers";

export type CurrencyID = string;
export type CurrencySymbolPosition = "left" | "right";

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
