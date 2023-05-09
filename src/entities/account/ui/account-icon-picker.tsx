import { ColorPickerColor } from "@shared/ui/color-pickers";
import {
  RadioButtonGroup,
  RadioButtonGroupProps,
} from "@shared/ui/radio-buttons";

import { AccountIcon } from "../model/models";

import { AccountIconRadioButton } from "./account-icon-radio-button";

interface AccountIconPickerProps extends RadioButtonGroupProps<AccountIcon> {
  selectedColor: ColorPickerColor;
}

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
