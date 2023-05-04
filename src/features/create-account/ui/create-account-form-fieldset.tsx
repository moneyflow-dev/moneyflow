import { Controller, useFormContext } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

import { AccountIcon, AccountIconPicker } from "@entities/account";
import {
  CurrencyID,
  CurrencyPicker,
  CurrencyRadioButtonCurrency,
} from "@entities/currency";

import { decimalRegex } from "@shared/lib/regex";
import { ColorPicker, ColorPickerColor } from "@shared/ui/color-pickers";
import { Input } from "@shared/ui/inputs";

interface CreateAccountFormFieldsetProps {
  currencies: {
    order: CurrencyID[];
    currencies: Record<CurrencyID, CurrencyRadioButtonCurrency>;
  };
  className?: string;
}

export interface CreateAccountFormFieldsetData {
  title: string;
  currencyId: string | null;
  color: ColorPickerColor;
  icon: AccountIcon;
  initialBalance: string;
}

export const createAccountFormFieldsetSchema = z.object({
  title: z.string().nonempty(),
  currencyId: z.string(),
  color: z.nativeEnum(ColorPickerColor),
  icon: z.nativeEnum(AccountIcon),
  initialBalance: z.string().regex(decimalRegex),
});

export const CreateAccountFormFieldset = ({
  currencies,
  className,
}: CreateAccountFormFieldsetProps) => {
  const { register, control, watch } =
    useFormContext<CreateAccountFormFieldsetData>();
  const [color, currencyId] = watch(["color", "currencyId"]);
  const currencySymbol =
    currencyId === null ? "" : currencies.currencies[currencyId].symbol;

  return (
    <div className={twMerge("flex flex-col gap-6", className)}>
      <Input
        label="Title"
        required
        placeholder="e.g. Cash, Card, Savings, ..."
        {...register("title")}
      />
      <Controller
        control={control}
        name="currencyId"
        render={({ field: { value, onChange } }) => (
          <CurrencyPicker
            currencies={currencies.order.map(
              (currencyId) => currencies.currencies[currencyId],
            )}
            value={value}
            onChange={onChange}
            required
          />
        )}
      />
      <Controller
        control={control}
        name="color"
        render={({ field: { value, onChange } }) => (
          <ColorPicker label="Choose color" value={value} onChange={onChange} />
        )}
      />
      <Controller
        control={control}
        name="icon"
        render={({ field: { value, onChange } }) => (
          <AccountIconPicker
            label="Choose icon"
            value={value}
            onChange={onChange}
            selectedColor={color}
          />
        )}
      />
      <Input
        label="Initial balance"
        required
        placeholder="0"
        leftAddon={currencySymbol}
        type="number"
        {...register("initialBalance")}
      />
    </div>
  );
};
