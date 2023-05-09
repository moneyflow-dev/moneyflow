import { ReactNode } from "react";

import { Button } from "@shared/ui/buttons";
import { ColorPickerColor } from "@shared/ui/color-pickers";
import {
  BitcoinIcon,
  CardIcon,
  CashIcon,
  CoinsIcon,
  LandmarkIcon,
  PigIcon,
  PlusIcon,
  SackDollarIcon,
} from "@shared/ui/icons";
import { Link } from "@shared/ui/links";
import {
  RadioButton,
  RadioButtonGroup,
  RadioButtonGroupProps,
} from "@shared/ui/radio-buttons";

import { AccountID, AccountIcon } from "../model/models";

interface AccountPickerAccount {
  id: string;
  title: string;
  currencySymbol: string;
  icon: AccountIcon;
  color: ColorPickerColor;
}

interface AccountPickerProps extends RadioButtonGroupProps<AccountID | null> {
  accounts: AccountPickerAccount[];
}

const iconToComponent: Record<AccountIcon, ReactNode> = {
  cash: <CashIcon size="sm" />,
  card: <CardIcon size="sm" />,
  pig: <PigIcon size="sm" />,
  coins: <CoinsIcon size="sm" />,
  sackDollar: <SackDollarIcon size="sm" />,
  landmark: <LandmarkIcon size="sm" />,
  bitcoin: <BitcoinIcon size="sm" />,
};

export const AccountPicker = ({ accounts, ...props }: AccountPickerProps) => {
  return (
    <RadioButtonGroup {...props}>
      {accounts.map((account) => (
        <RadioButton
          key={account.id}
          value={account.id}
          selectedColor={account.color}
        >
          {iconToComponent[account.icon]}
          {`${account.title} (${account.currencySymbol})`}
        </RadioButton>
      ))}
      <Link to="/accounts/create">
        <Button
          size="md"
          variant="outlinedOverlay1"
          className="gap-2.5 min-w-max"
        >
          <PlusIcon size="xs" />
          Add account
        </Button>
      </Link>
    </RadioButtonGroup>
  );
};
