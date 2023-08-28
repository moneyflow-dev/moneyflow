import { useFormContext } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";

import { CurrencyID, useCurrenciesStore } from "@entities/currency";

import { CheckIcon } from "@shared/ui/icons";

import { CreateCurrencyFormFieldsetSchema } from "./create-currency-form-fieldset";

interface UpdateCurrencyButtonProps {
  id: CurrencyID;
  className?: string;
}

export const UpdateCurrencyButton = ({
  id,
  className,
}: UpdateCurrencyButtonProps) => {
  const { updateCurrency } = useCurrenciesStore((state) => ({
    updateCurrency: state.updateCurrency,
  }));
  const navigate = useNavigate();
  const { handleSubmit, formState } =
    useFormContext<CreateCurrencyFormFieldsetSchema>();

  const onUpdate = async (currency: CreateCurrencyFormFieldsetSchema) => {
    await updateCurrency(id, {
      ...currency,
      precision: Number(currency.precision),
    });
    navigate(-1);
  };

  const disabled = !formState.isValid;

  return (
    <button onClick={handleSubmit(onUpdate)} disabled={disabled}>
      <CheckIcon
        size="sm"
        className={twMerge(
          `text-overlay1 ${
            disabled ? "opacity-50" : "active:text-overlay2"
          } transition-colors`,
          className,
        )}
      />
    </button>
  );
};
