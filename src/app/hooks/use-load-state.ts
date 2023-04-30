import { useEffect } from "react";

import { useCurrenciesStore } from "@entities/currency";

export const useLoadState = () => {
  const { fetchCurrencies } = useCurrenciesStore((state) => ({
    fetchCurrencies: state.fetchCurrencies,
  }));

  useEffect(() => {
    fetchCurrencies();
  }, [fetchCurrencies]);
};
