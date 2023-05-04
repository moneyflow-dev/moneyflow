import { useEffect } from "react";

import { useAccountsStore } from "@entities/account";
import { useCurrenciesStore } from "@entities/currency";

export const useLoadState = () => {
  const { fetchCurrencies } = useCurrenciesStore((state) => ({
    fetchCurrencies: state.fetchCurrencies,
  }));
  const { fetchAccounts } = useAccountsStore((state) => ({
    fetchAccounts: state.fetchAccounts,
  }));

  useEffect(() => {
    fetchCurrencies();
    fetchAccounts();
  }, [fetchCurrencies, fetchAccounts]);
};
