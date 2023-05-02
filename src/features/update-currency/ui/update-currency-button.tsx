import { useFormContext } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";

import {
  CurrencyID,
  UpdateCurrency,
  useCurrenciesStore,
} from "@entities/currency";

import { CheckIcon } from "@shared/ui/icons";

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
  const { handleSubmit, formState } = useFormContext<UpdateCurrency>();

  const onUpdate = async (currency: UpdateCurrency) => {
    await updateCurrency(id, currency);
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
