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
  const parts = [symbol, amount];
  if (symbolPosition === "right") {
    parts.reverse();
  }
  return parts.join(hasSpaceBetweenAmountAndSymbol ? " " : "");
};
