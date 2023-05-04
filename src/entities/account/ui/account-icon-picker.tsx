import { ReactNode } from "react";

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
import {
  RadioButtonGroup,
  RadioButtonGroupProps,
} from "@shared/ui/radio-buttons";

import { AccountIcon } from "../model/models";

import { AccountIconRadioButton } from "./account-icon-radio-button";

interface AccountIconPickerProps extends RadioButtonGroupProps<AccountIcon> {
  selectedColor: ColorPickerColor;
}

export const iconToComponent: Record<AccountIcon, ReactNode> = {
  cash: <CashIcon size="md" />,
  card: <CardIcon size="md" />,
  pig: <PigIcon size="md" />,
  coins: <CoinsIcon size="md" />,
  sackDollar: <SackDollarIcon size="md" />,
  landmark: <LandmarkIcon size="md" />,
  bitcoin: <BitcoinIcon size="md" />,
};

const defaultIcons: AccountIcon[] = [
  "cash",
  "card",
  "pig",
  "coins",
  "sackDollar",
  "landmark",
  "bitcoin",
];

export const AccountIconPicker = ({
  selectedColor,
  ...props
}: AccountIconPickerProps) => {
  return (
    <RadioButtonGroup {...props}>
      {defaultIcons.map((icon) => (
        <AccountIconRadioButton
          key={icon}
          selectedColor={selectedColor}
          value={icon}
        />
      ))}
    </RadioButtonGroup>
  );
};
