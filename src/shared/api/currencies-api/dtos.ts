import { ColorPickerColor } from "@shared/ui/color-pickers";

export type CurrencyID = string;
export type CurrencySymbolPosition = "left" | "right";

export interface CreateCurrencyDTO {
  symbol: string;
  symbolPosition: CurrencySymbolPosition;
  color: ColorPickerColor;
  hasSpaceBetweenAmountAndSymbol: boolean;
  hasGroupingNumbers: boolean;
  precision: number;
}

export type UpdateCurrencyDTO = CreateCurrencyDTO;

export interface CurrencyDTO extends CreateCurrencyDTO {
  id: CurrencyID;
  createdAt: number;
}

export interface DeleteCurrencyDTO {
  id: CurrencyID;
}

export interface CurrenciesDTO {
  order: CurrencyID[];
  currencies: Record<string, CurrencyDTO>;
}
