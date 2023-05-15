import { twMerge } from "tailwind-merge";

import { ColorPickerColor } from "@shared/ui/color-pickers";
import { Link } from "@shared/ui/links";

import { AccountID, AccountIcon } from "../model/models";

import { iconToComponent } from "./account-icon-radio-button";

export interface AccountCardAccount {
  id: AccountID;
  title: string;
  icon: AccountIcon;
  color: ColorPickerColor;
}

interface AccountCardProps {
  account: AccountCardAccount;
  formattedBalance: string;
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

export const AccountCard = ({
  account,
  formattedBalance,
  className,
}: AccountCardProps) => {
  return (
    <Link
      to={`/accounts/${account.id}`}
      className={twMerge(
        "flex justify-between items-center p-4 rounded text-xl",
        "text-crust font-extrabold transition-colors",
        colorToClassName[account.color],
        className,
      )}
    >
      <div className="flex gap-3 items-center text-base font-bold">
        {iconToComponent[account.icon]}
        {account.title}
      </div>
      <span className="text-xl font-extrabold">{formattedBalance}</span>
    </Link>
  );
};
