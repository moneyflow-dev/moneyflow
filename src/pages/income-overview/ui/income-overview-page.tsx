import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

import { Header } from "@widgets/header";

import {
  CreateIncomeFormFieldset,
  createIncomeFormSchema,
  CreateIncomeFormData,
  UpdateIncomeButton,
} from "@features/create-income";
import { DeleteIncomeButton } from "@features/delete-income";

import { useAccountsStore } from "@entities/account";
import { useIncomeCategoriesStore } from "@entities/category";
import { useCurrenciesStore } from "@entities/currency";
import { useIncomesStore } from "@entities/transaction";

import { toLocalDatetime } from "@shared/lib/date";
import { PageLayout } from "@shared/ui/layouts";

export const IncomeOverviewPage = () => {
  const { id } = useParams();
  if (typeof id === "undefined") {
    throw new Error("Impossible income id");
  }

  const { incomeCategories } = useIncomeCategoriesStore();
  const { accounts, order: accountsOrder } = useAccountsStore();
  const { currencies } = useCurrenciesStore();
  const { getIncome } = useIncomesStore((state) => ({
    getIncome: state.getIncome,
  }));

  const income = getIncome(id);

  const methods = useForm<CreateIncomeFormData>({
    defaultValues: income && {
      ...income,
      datetime: toLocalDatetime(income.datetime),
    },
    resolver: zodResolver(createIncomeFormSchema),
  });

  return (
    <PageLayout>
      <FormProvider {...methods}>
        <Header
          title="Income Overview"
          backButton
          rightActions={
            <>
              <DeleteIncomeButton id={id} />
              <UpdateIncomeButton id={id} />
            </>
          }
        />
        <CreateIncomeFormFieldset
          categories={incomeCategories}
          accounts={{ accounts, order: accountsOrder }}
          currencies={currencies.currencies}
        />
      </FormProvider>
    </PageLayout>
  );
};
