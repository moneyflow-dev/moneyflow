import { useEffect } from "react";

import { useAccountsStore } from "@entities/account";
import { useExpenseCategoriesStore } from "@entities/category";
import { useCurrenciesStore } from "@entities/currency";

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

  useEffect(() => {
    fetchCurrencies();
    fetchAccounts();
    fetchExpenseCategories();
  }, [fetchCurrencies, fetchAccounts, fetchExpenseCategories]);
};
