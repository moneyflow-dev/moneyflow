import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";

import { IncomeCategoryID, useIncomeCategoriesStore } from "@entities/category";

import { Button } from "@shared/ui/buttons";

import {
  CreateIncomeCategoryFormData,
  CreateIncomeCategoryFormFieldset,
  createIncomeCategoryFormSchema,
} from "./create-income-category-form-fieldset";

interface CreateIncomeCategoryFormProps {
  parentId: IncomeCategoryID | null;
  className?: string;
}

export const CreateIncomeCategoryForm = ({
  parentId,
  className,
}: CreateIncomeCategoryFormProps) => {
  const navigate = useNavigate();
  const methods = useForm<CreateIncomeCategoryFormData>({
    defaultValues: { title: "" },
    resolver: zodResolver(createIncomeCategoryFormSchema),
  });
  const { handleSubmit, formState } = methods;

  const { createIncomeCategory } = useIncomeCategoriesStore((state) => ({
    createIncomeCategory: state.createIncomeCategory,
  }));

  const onCreateCategory = async (category: CreateIncomeCategoryFormData) => {
    await createIncomeCategory({ ...category, parentId });
    navigate(-1);
  };

  return (
    <FormProvider {...methods}>
      <form
        className={twMerge("flex flex-col justify-between pb-7", className)}
      >
        <CreateIncomeCategoryFormFieldset />
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
