import { ColorPickerColor } from "@shared/ui/color-pickers";
import { RadioButton } from "@shared/ui/radio-buttons";

import { CurrencyID } from "../model/models";

export interface CurrencyRadioButtonCurrency {
  id: CurrencyID;
  symbol: string;
  color: ColorPickerColor;
}

interface CurrencyRadioButtonProps {
  currency: CurrencyRadioButtonCurrency;
}

export const CurrencyRadioButton = ({ currency }: CurrencyRadioButtonProps) => {
  return (
    <RadioButton
      value={currency.id}
      selectedColor={currency.color}
      className="px-5"
    >
      {currency.symbol}
    </RadioButton>
  );
};
