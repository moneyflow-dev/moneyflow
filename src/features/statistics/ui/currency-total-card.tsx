import { twMerge } from "tailwind-merge";

import {
  Currency,
  createCurrencyAmountString,
  formatAmountPrecision,
} from "@entities/currency";

import { TrendDownIcon, TrendUpIcon } from "@shared/ui/icons";

type CurrencyTotalType = "expense" | "income";

interface CurrencyTotalCardProps {
  type: CurrencyTotalType;
  currency: Currency;
  amount: string;
  className?: string;
}

const typeToClassName: Record<CurrencyTotalType, string> = {
  expense: "bg-red",
  income: "bg-green",
};

const categoryTypeToAmountPrefix: Record<CurrencyTotalType, string> = {
  expense: "-",
  income: "+",
};

export function CurrencyTotalCard({
  type,
  currency,
  amount,
  className,
}: CurrencyTotalCardProps) {
  const formattedAmount = `${
    categoryTypeToAmountPrefix[type]
  }${createCurrencyAmountString({
    currency,
    amount: formatAmountPrecision(amount, currency.precision),
  })}`;

  return (
    <div
      className={twMerge(
        "flex p-5 rounded justify-center",
        typeToClassName[type],
        className,
      )}
    >
      <div className="flex items-center gap-3 whitespace-nowrap text-crust overflow-x-auto">
        {type === "expense" ? (
          <TrendDownIcon className="min-w-max" size="md" />
        ) : (
          <TrendUpIcon className="min-w-max" size="md" />
        )}
        <span className="text-xl font-extrabold">{formattedAmount}</span>
      </div>
    </div>
  );
}
