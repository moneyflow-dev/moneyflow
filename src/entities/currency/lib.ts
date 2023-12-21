import { Decimal } from "decimal.js";

import { numbersGroupingRegex } from "@shared/lib/regex";

import { CurrencySymbolPosition } from "./model/models";

interface CreateCurrencyBalanceStringParams {
  currency: {
    symbol: string;
    symbolPosition: CurrencySymbolPosition;
    hasSpaceBetweenAmountAndSymbol: boolean;
    hasGroupingNumbers: boolean;
  };
  amount: string;
}

export class InvalidPrecisionError extends Error {}

export const createCurrencyAmountString = ({
  currency: {
    symbol,
    symbolPosition,
    hasSpaceBetweenAmountAndSymbol,
    hasGroupingNumbers,
  },
  amount,
}: CreateCurrencyBalanceStringParams): string => {
  const number = new Decimal(amount);
  const isNegative = number.lt("0");

  const parts = [symbol, number.abs().toString()];
  if (symbolPosition === "right") {
    parts.reverse();
  }
  const currencyString = parts
    .join(hasSpaceBetweenAmountAndSymbol ? " " : "")
    .replace(numbersGroupingRegex, hasGroupingNumbers ? "," : "");
  return `${isNegative ? "-" : ""}${currencyString}`;
};

export const formatAmountPrecision = (
  amount: string,
  precision: number,
): string => {
  if (precision < 0 || !Number.isInteger(precision)) {
    throw new InvalidPrecisionError(
      "precision must be greater than or equal to 0",
    );
  }
  return new Decimal(amount)
    .toDecimalPlaces(precision, Decimal.ROUND_DOWN)
    .toString();
};
