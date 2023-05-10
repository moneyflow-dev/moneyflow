import { useEffect } from "react";

import { useAccountsStore } from "@entities/account";
import { useExpenseCategoriesStore } from "@entities/category";
import { useCurrenciesStore } from "@entities/currency";
import { useExpensesStore } from "@entities/transaction";

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

  useEffect(() => {
    (async () => {
      await fetchCurrencies();
      await fetchAccounts();
      await fetchExpenseCategories();
      await fetchExpenses();
    })();
  }, [fetchCurrencies, fetchAccounts, fetchExpenseCategories, fetchExpenses]);
};
