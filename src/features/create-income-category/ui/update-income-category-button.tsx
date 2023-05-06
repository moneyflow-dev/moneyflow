import { useFormContext } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";

import { IncomeCategoryID, useIncomeCategoriesStore } from "@entities/category";

import { CheckIcon } from "@shared/ui/icons";

import { CreateIncomeCategoryFormData } from "./create-income-category-form-fieldset";

interface UpdateIncomeCategoryButtonProps {
  id: IncomeCategoryID;
  parentId: IncomeCategoryID | null;
  className?: string;
}

export const UpdateIncomeCategoryButton = ({
  id,
  parentId,
  className,
}: UpdateIncomeCategoryButtonProps) => {
  const { updateIncomeCategory } = useIncomeCategoriesStore((state) => ({
    updateIncomeCategory: state.updateIncomeCategory,
  }));
  const navigate = useNavigate();
  const { handleSubmit, formState } =
    useFormContext<CreateIncomeCategoryFormData>();

  const onUpdate = async (category: CreateIncomeCategoryFormData) => {
    await updateIncomeCategory(id, { ...category, parentId });
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
