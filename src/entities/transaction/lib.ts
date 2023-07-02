import { DateTime } from "luxon";

interface SortableTransaction {
  datetime: DateTime;
}

export const sortTransactionsByDateTime = <T extends SortableTransaction>(
  transactions: T[],
): T[] => {
  return transactions.sort(
    (a, b) => b.datetime.valueOf() - a.datetime.valueOf(),
  );
};

export const createExpenseAmountString = (formattedAmount: string) => {
  return `-${formattedAmount}`;
};

export const createIncomeAmountString = (formattedAmount: string) => {
  return `+${formattedAmount}`;
};

export const createTransferAmountString = ({
  fromAmount,
  toAmount,
  sameCurrencies,
}: {
  fromAmount: string;
  toAmount: string;
  sameCurrencies: boolean;
}) => {
  return fromAmount === toAmount && sameCurrencies
    ? fromAmount
    : `${fromAmount} -> ${toAmount}`;
};
