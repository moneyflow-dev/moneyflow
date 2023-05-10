import { useEffect } from "react";

import { useAccountsStore } from "@entities/account";
import {
  useExpenseCategoriesStore,
  useIncomeCategoriesStore,
} from "@entities/category";
import { useCurrenciesStore } from "@entities/currency";
import { useExpensesStore, useIncomesStore } from "@entities/transaction";

export const useLoadState = () => {
  const { fetchCurrencies } = useCurrenciesStore((state) => ({
    fetchCurrencies: state.fetchCurrencies,
  }));
  const { fetchAccounts } = useAccountsStore((state) => ({
    fetchAccounts: state.fetchAccounts,
  }));
  const { fetchExpenseCategories } = useExpenseCategoriesStore((state) => ({
    fetchExpenseCategories: state.fetchExpenseCategories,
  }));
  const { fetchExpenses } = useExpensesStore((state) => ({
    fetchExpenses: state.fetchExpenses,
  }));
  const { fetchIncomeCategories } = useIncomeCategoriesStore((state) => ({
    fetchIncomeCategories: state.fetchIncomeCategories,
  }));
  const { fetchIncomes } = useIncomesStore((state) => ({
    fetchIncomes: state.fetchIncomes,
  }));

  useEffect(() => {
    (async () => {
      await fetchCurrencies();
      await fetchAccounts();
      await fetchExpenseCategories();
      await fetchExpenses();
      await fetchIncomeCategories();
      await fetchIncomes();
    })();
  }, [
    fetchCurrencies,
    fetchAccounts,
    fetchExpenseCategories,
    fetchExpenses,
    fetchIncomeCategories,
    fetchIncomes,
  ]);
};
