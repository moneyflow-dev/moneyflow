import { DateTime } from "luxon";
import { useFormContext } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";

import { IncomeID, useIncomesStore } from "@entities/transaction";

import { CheckIcon } from "@shared/ui/icons";

import { CreateIncomeFormData } from "./create-income-form-fieldset";

interface UpdateIncomeButtonProps {
  id: IncomeID;
  className?: string;
}

export const UpdateIncomeButton = ({
  id,
  className,
}: UpdateIncomeButtonProps) => {
  const { updateIncome } = useIncomesStore((state) => ({
    updateIncome: state.updateIncome,
  }));
  const navigate = useNavigate();
  const { handleSubmit, formState } = useFormContext<CreateIncomeFormData>();

  const onUpdate = async (income: CreateIncomeFormData) => {
    if (income.accountId === null) {
      throw new Error("Impossible accountId on income update");
    }
    if (income.categoryId === null) {
      throw new Error("Impossible categoryId on income update");
    }

    await updateIncome(id, {
      ...income,
      accountId: income.accountId,
      categoryId: income.categoryId,
      datetime: DateTime.fromISO(income.datetime),
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
