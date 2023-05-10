import { zodResolver } from "@hookform/resolvers/zod";
import { DateTime } from "luxon";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";

import { useAccountsStore } from "@entities/account";
import { useExpenseCategoriesStore } from "@entities/category";
import { useCurrenciesStore } from "@entities/currency";
import { useExpensesStore } from "@entities/transaction";

import { getNowLocalDatetime } from "@shared/lib/date";
import { Button } from "@shared/ui/buttons";

import { useCreateExpenseFormStore } from "../model/store";

import {
  CreateExpenseFormData,
  CreateExpenseFormFieldset,
  createExpenseFormSchema,
} from "./create-expense-form-fieldset";

interface CreateExpenseFormProps {
  className?: string;
}

export const CreateExpenseForm = ({ className }: CreateExpenseFormProps) => {
  const navigate = useNavigate();
  const { createExpense } = useExpensesStore((state) => ({
    createExpense: state.createExpense,
  }));
  const { expenseCategories } = useExpenseCategoriesStore();
  const { order: accountsOrder, accounts } = useAccountsStore();
  const {
    currencies: { currencies },
  } = useCurrenciesStore();
  const {
    getCreateExpenseFormState,
    setCreateExpenseFormState,
    setAccountId,
    setCategoryId,
    resetCreateExpenseFormState,
  } = useCreateExpenseFormStore();

  const defaultValues = getCreateExpenseFormState();
  const methods = useForm<CreateExpenseFormData>({
    defaultValues: {
      ...defaultValues,
      datetime: defaultValues.datetime
        ? defaultValues.datetime
        : getNowLocalDatetime(),
    },
    resolver: zodResolver(createExpenseFormSchema),
  });
  const { handleSubmit, formState, watch } = methods;

  const { title, categoryId, accountId, amount, datetime } = watch();

  useEffect(() => {
    const category =
      categoryId === null ? categoryId : expenseCategories[categoryId] ?? null;
    if (category === null) {
      setCategoryId(null);
    }
  }, [categoryId, expenseCategories, setCategoryId]);

  useEffect(() => {
    const account =
      accountId === null ? accountId : accounts[accountId] ?? null;
    if (account === null) {
      setAccountId(null);
    }
  }, [accountId, accounts, setAccountId]);

  useEffect(() => {
    setCreateExpenseFormState({
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
    setCreateExpenseFormState,
  ]);

  const onCreateExpense = async (expense: CreateExpenseFormData) => {
    if (expense.accountId === null) {
      throw new Error("Impossible accountId on expense creation");
    }
    if (expense.categoryId === null) {
      throw new Error("Impossible categoryId on expense creation");
    }

    await createExpense({
      ...expense,
      accountId: expense.accountId,
      categoryId: expense.categoryId,
      datetime: DateTime.fromISO(expense.datetime),
    });
    resetCreateExpenseFormState();
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
        <CreateExpenseFormFieldset
          categories={expenseCategories}
          accounts={{ order: accountsOrder, accounts }}
          currencies={currencies}
        />
        <Button
          onClick={handleSubmit(onCreateExpense)}
          className="w-[75%] self-center"
          disabled={!formState.isValid}
        >
          Confirm
        </Button>
      </form>
    </FormProvider>
  );
};
