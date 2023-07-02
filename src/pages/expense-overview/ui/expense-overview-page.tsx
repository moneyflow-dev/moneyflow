import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

import { Header } from "@widgets/header";

import {
  CreateExpenseFormFieldset,
  createExpenseFormSchema,
  CreateExpenseFormData,
  UpdateExpenseButton,
} from "@features/create-expense";
import { DeleteExpenseButton } from "@features/delete-expense";
import { searchTransactionsByTitle } from "@features/search-transactions";

import { useAccountsStore } from "@entities/account";
import { useExpenseCategoriesStore } from "@entities/category";
import { useCurrenciesStore } from "@entities/currency";
import { useExpensesStore } from "@entities/transaction";

import { toLocalDatetime } from "@shared/lib/date";
import { PageLayout } from "@shared/ui/layouts";

export const ExpenseOverviewPage = () => {
  const { id } = useParams();
  if (typeof id === "undefined") {
    throw new Error("Impossible expense id");
  }

  const { expenseCategories } = useExpenseCategoriesStore();
  const { accounts, order: accountsOrder } = useAccountsStore();
  const { currencies } = useCurrenciesStore();
  const { getExpense, expenses } = useExpensesStore((state) => ({
    expenses: state.expenses,
    getExpense: state.getExpense,
  }));

  const expense = getExpense(id);

  const methods = useForm<CreateExpenseFormData>({
    defaultValues: expense && {
      ...expense,
      datetime: toLocalDatetime(expense.datetime),
    },
    resolver: zodResolver(createExpenseFormSchema),
  });

  return (
    <PageLayout>
      <FormProvider {...methods}>
        <Header
          title="Expense Overview"
          backButton
          rightActions={
            <>
              <DeleteExpenseButton id={id} />
              <UpdateExpenseButton id={id} />
            </>
          }
        />
        <CreateExpenseFormFieldset
          expenses={expenses}
          categories={expenseCategories}
          accounts={{ accounts, order: accountsOrder }}
          currencies={currencies.currencies}
          searchTransactionsByTitle={searchTransactionsByTitle}
        />
      </FormProvider>
    </PageLayout>
  );
};
