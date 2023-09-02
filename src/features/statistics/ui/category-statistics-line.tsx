import { CategoryType } from "@entities/category";
import {
  Currency,
  createCurrencyAmountString,
  formatAmountPrecision,
} from "@entities/currency";

import { ProgressBar } from "./progress-bar";

interface CategoryStatisticsLineProps {
  category: { title: string; amount: string; percentage: string };
  categoryType: CategoryType;
  currency: Currency;
}

const categoryTypeToClassName: Record<CategoryType, string> = {
  expense: "text-red",
  income: "text-green",
};

const categoryTypeToAmountPrefix: Record<CategoryType, string> = {
  expense: "-",
  income: "+",
};

export function CategoryStatisticsLine({
  category: { title, amount, percentage },
  categoryType,
  currency,
}: CategoryStatisticsLineProps) {
  const formattedPercentage =
    percentage.length < 5 ? `0${percentage}%` : `${percentage}%`;
  const amountPrefix = categoryTypeToAmountPrefix[categoryType];
  const formattedAmount = `${amountPrefix}${createCurrencyAmountString({
    currency,
    amount: formatAmountPrecision(amount, currency.precision),
  })}`;

  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex justify-between items-center gap-4 text-sm font-bold">
        <span className="text-subtext0">{title}</span>
        <span className={categoryTypeToClassName[categoryType]}>
          {formattedAmount}
        </span>
      </div>
      <div className="flex items-center gap-4">
        <ProgressBar progress={percentage} />
        <span className="text-xs text-subtext0 font-medium">
          {formattedPercentage}
        </span>
      </div>
    </div>
  );
}
