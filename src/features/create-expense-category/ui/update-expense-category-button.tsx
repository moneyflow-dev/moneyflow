import { useFormContext } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";

import {
  ExpenseCategoryID,
  useExpenseCategoriesStore,
} from "@entities/category";

import { CheckIcon } from "@shared/ui/icons";

import { CreateExpenseCategoryFormData } from "./create-expense-category-form-fieldset";

interface UpdateExpenseCategoryButtonProps {
  id: ExpenseCategoryID;
  parentId: ExpenseCategoryID | null;
  className?: string;
}

export const UpdateExpenseCategoryButton = ({
  id,
  parentId,
  className,
}: UpdateExpenseCategoryButtonProps) => {
  const { updateExpenseCategory } = useExpenseCategoriesStore((state) => ({
    updateExpenseCategory: state.updateExpenseCategory,
  }));
  const navigate = useNavigate();
  const { handleSubmit, formState } =
    useFormContext<CreateExpenseCategoryFormData>();

  const onUpdate = async (category: CreateExpenseCategoryFormData) => {
    await updateExpenseCategory(id, { ...category, parentId });
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
