import { zodResolver } from "@hookform/resolvers/zod";
import { DateTime } from "luxon";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";

import { useAccountsStore } from "@entities/account";
import { useIncomeCategoriesStore } from "@entities/category";
import { useCurrenciesStore } from "@entities/currency";
import { useIncomesStore } from "@entities/transaction";

import { getNowLocalDatetime } from "@shared/lib/date";
import { Button } from "@shared/ui/buttons";

import { useCreateIncomeFormStore } from "../model/store";

import {
  CreateIncomeFormData,
  CreateIncomeFormFieldset,
  createIncomeFormSchema,
} from "./create-income-form-fieldset";

interface CreateIncomeFormProps {
  className?: string;
}

export const CreateIncomeForm = ({ className }: CreateIncomeFormProps) => {
  const navigate = useNavigate();
  const { createIncome } = useIncomesStore((state) => ({
    createIncome: state.createIncome,
  }));
  const { incomeCategories } = useIncomeCategoriesStore();
  const { order: accountsOrder, accounts } = useAccountsStore();
  const {
    currencies: { currencies },
  } = useCurrenciesStore();
  const {
    getCreateIncomeFormState,
    setCreateIncomeFormState,
    setAccountId,
    setCategoryId,
    resetCreateIncomeFormState,
  } = useCreateIncomeFormStore();

  const defaultValues = getCreateIncomeFormState();
  const methods = useForm<CreateIncomeFormData>({
    defaultValues: {
      ...defaultValues,
      datetime: defaultValues.datetime
        ? defaultValues.datetime
        : getNowLocalDatetime(),
    },
    resolver: zodResolver(createIncomeFormSchema),
  });
  const { handleSubmit, formState, watch } = methods;

  const { title, categoryId, accountId, amount, datetime } = watch();

  useEffect(() => {
    const category =
      categoryId === null ? categoryId : incomeCategories[categoryId] ?? null;
    if (category === null) {
      setCategoryId(null);
    }
  }, [categoryId, incomeCategories, setCategoryId]);

  useEffect(() => {
    const account =
      accountId === null ? accountId : accounts[accountId] ?? null;
    if (account === null) {
      setAccountId(null);
    }
  }, [accountId, accounts, setAccountId]);

  useEffect(() => {
    setCreateIncomeFormState({
      title,
      categoryId,
      accountId,
      amount,
      datetime,
    });
  }, [
    title,
    categoryId,
    accountId,
    amount,
    datetime,
    setCreateIncomeFormState,
  ]);

  const onCreateIncome = async (income: CreateIncomeFormData) => {
    if (income.accountId === null) {
      throw new Error("Impossible accountId on income creation");
    }
    if (income.categoryId === null) {
      throw new Error("Impossible categoryId on income creation");
    }

    await createIncome({
      ...income,
      accountId: income.accountId,
      categoryId: income.categoryId,
      datetime: DateTime.fromISO(income.datetime),
    });
    resetCreateIncomeFormState();
    navigate(-1);
  };

  return (
    <FormProvider {...methods}>
      <form
        className={twMerge(
          "flex flex-col justify-between gap-8 pb-7",
          className,
        )}
      >
        <CreateIncomeFormFieldset
          categories={incomeCategories}
          accounts={{ order: accountsOrder, accounts }}
          currencies={currencies}
        />
        <Button
          onClick={handleSubmit(onCreateIncome)}
          className="w-[75%] self-center"
          disabled={!formState.isValid}
        >
          Confirm
        </Button>
      </form>
    </FormProvider>
  );
};
