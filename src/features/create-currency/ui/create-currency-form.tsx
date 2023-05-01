import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import {
  CreateCurrency,
  CurrencySymbolPosition,
  createCurrencyAmountString,
  useCurrenciesStore,
} from "@entities/currency";

import { Button } from "@shared/ui/buttons";
import { ColorPickerColor } from "@shared/ui/color-pickers";

import {
  CreateCurrencyFormFieldset,
  createCurrencyFormFieldsetSchema,
} from "./create-currency-form-fieldset";

export const CreateCurrencyForm = () => {
  const { createCurrency } = useCurrenciesStore((state) => ({
    createCurrency: state.createCurrency,
  }));
  const navigate = useNavigate();

  const methods = useForm<CreateCurrency>({
    defaultValues: {
      symbol: "",
      symbolPosition: CurrencySymbolPosition.left,
      color: ColorPickerColor.peach,
      hasSpaceBetweenAmountAndSymbol: false,
    },
    resolver: zodResolver(createCurrencyFormFieldsetSchema),
  });
  const { formState, watch, handleSubmit } = methods;
  const [symbol, symbolPosition, hasSpaceBetweenAmountAndSymbol] = watch([
    "symbol",
    "symbolPosition",
    "hasSpaceBetweenAmountAndSymbol",
  ]);

  const onCreateCurrency = async (currency: CreateCurrency) => {
    await createCurrency(currency);
    navigate(-1);
  };

  return (
    <FormProvider {...methods}>
      <form className="flex flex-col h-full justify-between pb-12">
        <div className="flex flex-col gap-14">
          <CreateCurrencyFormFieldset />
          {formState.isValid && (
            <div className="flex flex-col items-center gap-3">
              <span className="text-base font-bold text-subtext0">Preview</span>
              <span className="text-xxl font-bold text-text">
                {createCurrencyAmountString({
                  currency: {
                    symbol,
                    symbolPosition,
                    hasSpaceBetweenAmountAndSymbol,
                  },
                  amount: "15.8",
                })}
              </span>
            </div>
          )}
        </div>
        <Button
          onClick={handleSubmit(onCreateCurrency)}
          className="w-[75%] self-center"
          disabled={!formState.isValid}
        >
          Confirm
        </Button>
      </form>
    </FormProvider>
  );
};
