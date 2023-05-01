import { Controller, useFormContext } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

import { CurrencySymbolPosition, CreateCurrency } from "@entities/currency";

import { Checkbox } from "@shared/ui/checkboxes";
import { ColorPicker, ColorPickerColor } from "@shared/ui/color-pickers";
import { Input } from "@shared/ui/inputs";
import {
  TabLikeRadioButton,
  TabLikeRadioButtonGroup,
} from "@shared/ui/radio-buttons";

interface CreateCurrencyFormFieldsetProps {
  className?: string;
}

export const createCurrencyFormFieldsetSchema = z.object({
  symbol: z.string().nonempty(),
  symbolPosition: z.nativeEnum(CurrencySymbolPosition),
  color: z.nativeEnum(ColorPickerColor),
  hasSpaceBetweenAmountAndSymbol: z.boolean(),
});

export const CreateCurrencyFormFieldset = ({
  className,
}: CreateCurrencyFormFieldsetProps) => {
  const { register, control } = useFormContext<CreateCurrency>();

  return (
    <div className={twMerge("flex flex-col gap-6", className)}>
      <Input
        label="Symbol"
        required
        placeholder="e.g. $, USD, ..."
        {...register("symbol")}
      />
      <Controller
        control={control}
        name="symbolPosition"
        render={({ field: { value, onChange } }) => (
          <TabLikeRadioButtonGroup
            label="Symbol position"
            value={value}
            onChange={onChange}
          >
            <TabLikeRadioButton value={CurrencySymbolPosition.left}>
              Left
            </TabLikeRadioButton>
            <TabLikeRadioButton value={CurrencySymbolPosition.right}>
              Right
            </TabLikeRadioButton>
          </TabLikeRadioButtonGroup>
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
        name="hasSpaceBetweenAmountAndSymbol"
        render={({ field: { value: checked, onChange } }) => (
          <Checkbox
            label="Add space between amount and symbol"
            checked={checked}
            onChange={onChange}
            containerClassName="mt-3"
          />
        )}
      />
    </div>
  );
};
