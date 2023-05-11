import { Button } from "@shared/ui/buttons";
import { PlusIcon } from "@shared/ui/icons";
import { Link } from "@shared/ui/links";
import {
  RadioButtonGroup,
  RadioButtonGroupProps,
} from "@shared/ui/radio-buttons";

import { CurrencyID } from "../model/models";

import {
  CurrencyRadioButton,
  CurrencyRadioButtonCurrency,
} from "./currency-radio-button";

interface CurrencyPickerProps extends RadioButtonGroupProps<CurrencyID | null> {
  currencies: CurrencyRadioButtonCurrency[];
}

export const CurrencyPicker = ({
  currencies,
  ...props
}: CurrencyPickerProps) => {
  return (
    <RadioButtonGroup label="Choose currency" {...props}>
      {currencies.map((currency) => (
        <CurrencyRadioButton key={currency.id} currency={currency} />
      ))}
      <Link to="/currencies/create">
        <Button
          type="button"
          size="md"
          variant="outlinedOverlay1"
          className="gap-2.5 min-w-max"
        >
          <PlusIcon size="xs" />
          Add currency
        </Button>
      </Link>
    </RadioButtonGroup>
  );
};
