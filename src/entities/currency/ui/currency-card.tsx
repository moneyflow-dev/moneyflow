import { twMerge } from "tailwind-merge";

import { ColorPickerColor } from "@shared/ui/color-pickers";
import { Link } from "@shared/ui/links";

import { createCurrencyAmountString, formatAmountPrecision } from "../lib";
import { Currency } from "../model/models";

interface CurrencyCardProps {
  currency: Currency;
  balance: string;
  className?: string;
}

const colorToClassName: Record<ColorPickerColor, string> = {
  yellow: "bg-yellow active:bg-yellow-active",
  peach: "bg-peach active:bg-peach-active",
  green: "bg-green active:bg-green-active",
  lavender: "bg-lavender active:bg-lavender-active",
  mauve: "bg-mauve active:bg-mauve-active",
  blue: "bg-blue active:bg-blue-active",
  sapphire: "bg-sapphire active:bg-sapphire-active",
  sky: "bg-sky active:bg-sky-active",
  teal: "bg-teal active:bg-teal-active",
  maroon: "bg-maroon active:bg-maroon-active",
  red: "bg-red active:bg-red-active",
  pink: "bg-pink active:bg-pink-active",
  flamingo: "bg-flamingo active:bg-flamingo-active",
  rosewater: "bg-rosewater active:bg-rosewater-active",
};

export const CurrencyCard = ({
  currency,
  balance,
  className,
}: CurrencyCardProps) => {
  return (
    <Link
      to={`/currencies/${currency.id}`}
      className={twMerge(
        "flex justify-center items-center p-4 rounded text-xl",
        "text-crust font-extrabold transition-colors whitespace-nowrap",
        colorToClassName[currency.color],
        className,
      )}
    >
      <span className="overflow-x-auto">
        {createCurrencyAmountString({
          currency,
          amount: formatAmountPrecision(balance, currency.precision),
        })}
      </span>
    </Link>
  );
};
