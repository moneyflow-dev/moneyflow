import { useFormContext } from "react-hook-form";
import { z } from "zod";

import { Input } from "@shared/ui/inputs";

export interface CreateIncomeCategoryFormData {
  title: string;
}

export const createIncomeCategoryFormSchema = z.object({
  title: z.string().nonempty(),
});

export const CreateIncomeCategoryFormFieldset = () => {
  const { register } = useFormContext<CreateIncomeCategoryFormData>();
  return (
    <Input
      label="Title"
      placeholder="e.g. Salary, Stipend, ..."
      required
      {...register("title")}
    />
  );
};
