import { DateTime } from "luxon";
import { useFormContext } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";

import { ExpenseID, useExpensesStore } from "@entities/transaction";

import { CheckIcon } from "@shared/ui/icons";

import { CreateExpenseFormData } from "./create-expense-form-fieldset";

interface UpdateExpenseButtonProps {
  id: ExpenseID;
  className?: string;
}

export const UpdateExpenseButton = ({
  id,
  className,
}: UpdateExpenseButtonProps) => {
  const { updateExpense } = useExpensesStore((state) => ({
    updateExpense: state.updateExpense,
  }));
  const navigate = useNavigate();
  const { handleSubmit, formState } = useFormContext<CreateExpenseFormData>();

  const onUpdate = async (expense: CreateExpenseFormData) => {
    if (expense.accountId === null) {
      throw new Error("Impossible accountId on expense update");
    }
    if (expense.categoryId === null) {
      throw new Error("Impossible categoryId on expense update");
    }

    await updateExpense(id, {
      ...expense,
      accountId: expense.accountId,
      categoryId: expense.categoryId,
      datetime: DateTime.fromISO(expense.datetime),
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
