import { useFormContext } from "react-hook-form";
import { z } from "zod";

import { Input } from "@shared/ui/inputs";

export interface CreateExpenseCategoryFormData {
  title: string;
}

export const createExpenseCategoryFormSchema = z.object({
  title: z.string().nonempty(),
});

export const CreateExpenseCategoryFormFieldset = () => {
  const { register } = useFormContext<CreateExpenseCategoryFormData>();
  return (
    <Input
      label="Title"
      placeholder="e.g. Food & Drinks, Health, ..."
      required
      {...register("title")}
    />
  );
};
