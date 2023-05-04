import { ReactNode } from "react";

import {
  BitcoinIcon,
  CardIcon,
  CashIcon,
  CoinsIcon,
  LandmarkIcon,
  PigIcon,
  SackDollarIcon,
} from "@shared/ui/icons";
import { RadioButton, RadioButtonProps } from "@shared/ui/radio-buttons";

import { AccountIcon } from "../model/models";

export const iconToComponent: Record<AccountIcon, ReactNode> = {
  cash: <CashIcon size="md" />,
  card: <CardIcon size="md" />,
  pig: <PigIcon size="md" />,
  coins: <CoinsIcon size="md" />,
  sackDollar: <SackDollarIcon size="md" />,
  landmark: <LandmarkIcon size="md" />,
  bitcoin: <BitcoinIcon size="md" />,
};

export const AccountIconRadioButton = ({
  value,
  ...props
}: RadioButtonProps<AccountIcon>) => {
  return (
    <RadioButton value={value} {...props}>
      {iconToComponent[value]}
    </RadioButton>
  );
};
