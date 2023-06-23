import {
  RadioLikeCheckbox,
  RadioLikeCheckboxProps,
} from "@shared/ui/checkboxes";
import { ColorPickerColor } from "@shared/ui/color-pickers";

import { CurrencyID } from "../model/models";

export interface CurrencyRadioButtonCurrency {
  id: CurrencyID;
  symbol: string;
  color: ColorPickerColor;
}

interface CurrencyCheckboxProps
  extends Omit<RadioLikeCheckboxProps, "selectedColor"> {
  currency: CurrencyRadioButtonCurrency;
}

export const CurrencyCheckbox = ({
  currency,
  ...props
}: CurrencyCheckboxProps) => {
  return (
    <RadioLikeCheckbox
      className="px-5"
      selectedColor={currency.color}
      {...props}
    >
      {currency.symbol}
    </RadioLikeCheckbox>
  );
};
