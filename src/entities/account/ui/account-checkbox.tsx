import { ReactNode } from "react";

import {
  RadioLikeCheckbox,
  RadioLikeCheckboxProps,
} from "@shared/ui/checkboxes";
import { ColorPickerColor } from "@shared/ui/color-pickers";
import {
  BitcoinIcon,
  CardIcon,
  CashIcon,
  CoinsIcon,
  LandmarkIcon,
  PigIcon,
  SackDollarIcon,
} from "@shared/ui/icons";

import { AccountIcon } from "../model/models";

const iconToComponent: Record<AccountIcon, ReactNode> = {
  cash: <CashIcon size="sm" />,
  card: <CardIcon size="sm" />,
  pig: <PigIcon size="sm" />,
  coins: <CoinsIcon size="sm" />,
  sackDollar: <SackDollarIcon size="sm" />,
  landmark: <LandmarkIcon size="sm" />,
  bitcoin: <BitcoinIcon size="sm" />,
};

interface AccountCheckboxAccount {
  id: string;
  title: string;
  currencySymbol: string;
  icon: AccountIcon;
  color: ColorPickerColor;
}

interface AccountCheckboxProps
  extends Omit<RadioLikeCheckboxProps, "selectedColor"> {
  account: AccountCheckboxAccount;
}

export const AccountCheckbox = ({
  account,
  ...props
}: AccountCheckboxProps) => {
  return (
    <RadioLikeCheckbox
      {...props}
      value={account.id}
      selectedColor={account.color}
    >
      {iconToComponent[account.icon]}
      {`${account.title} (${account.currencySymbol})`}
    </RadioLikeCheckbox>
  );
};
