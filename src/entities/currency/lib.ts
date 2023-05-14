import { Decimal } from "decimal.js";

import { CurrencySymbolPosition } from "./model/models";

interface CreateCurrencyBalanceStringParams {
  currency: {
    symbol: string;
    symbolPosition: CurrencySymbolPosition;
    hasSpaceBetweenAmountAndSymbol: boolean;
  };
  amount: string;
}

export const createCurrencyAmountString = ({
  currency: { symbol, symbolPosition, hasSpaceBetweenAmountAndSymbol },
  amount,
}: CreateCurrencyBalanceStringParams): string => {
  const number = new Decimal(amount);
  const isNegative = number.lt("0");

  const parts = [symbol, number.abs().toString()];
  if (symbolPosition === "right") {
    parts.reverse();
  }
  const currencyString = parts.join(hasSpaceBetweenAmountAndSymbol ? " " : "");
  return `${isNegative ? "-" : ""}${currencyString}`;
};
