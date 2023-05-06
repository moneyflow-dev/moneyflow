import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";

import {
  ExpenseCategoryID,
  useExpenseCategoriesStore,
} from "@entities/category";

import { Button } from "@shared/ui/buttons";

import {
  CreateExpenseCategoryFormData,
  CreateExpenseCategoryFormFieldset,
  createExpenseCategoryFormSchema,
} from "./create-expense-category-form-fieldset";

interface CreateExpenseCategoryFormProps {
  parentId: ExpenseCategoryID | null;
  className?: string;
}

export const CreateExpenseCategoryForm = ({
  parentId,
  className,
}: CreateExpenseCategoryFormProps) => {
  const navigate = useNavigate();
  const methods = useForm<CreateExpenseCategoryFormData>({
    defaultValues: { title: "" },
    resolver: zodResolver(createExpenseCategoryFormSchema),
  });
  const { handleSubmit, formState } = methods;

  const { createExpenseCategory } = useExpenseCategoriesStore((state) => ({
    createExpenseCategory: state.createExpenseCategory,
  }));

  const onCreateCategory = async (category: CreateExpenseCategoryFormData) => {
    await createExpenseCategory({ ...category, parentId });
    navigate(-1);
  };

  return (
    <FormProvider {...methods}>
      <form
        className={twMerge("flex flex-col justify-between pb-7", className)}
      >
        <CreateExpenseCategoryFormFieldset />
        <Button
          onClick={handleSubmit(onCreateCategory)}
          className="w-[75%] self-center"
          disabled={!formState.isValid}
        >
          Confirm
        </Button>
      </form>
    </FormProvider>
  );
};
