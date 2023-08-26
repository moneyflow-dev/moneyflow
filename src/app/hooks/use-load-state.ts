import { SplashScreen } from "@capacitor/splash-screen";
import { useEffect } from "react";

import { useAccountsStore } from "@entities/account";
import {
  useExpenseCategoriesStore,
  useIncomeCategoriesStore,
} from "@entities/category";
import { useCurrenciesStore } from "@entities/currency";
import { useSettingsStore } from "@entities/settings";
import {
  useExpensesStore,
  useIncomesStore,
  useTransfersStore,
} from "@entities/transaction";

import { migrator } from "@shared/api/migrations";
import { versionApi } from "@shared/api/version-api";

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
  const { fetchTransfers } = useTransfersStore((state) => ({
    fetchTransfers: state.fetchTransfers,
  }));
  const { fetchSettings } = useSettingsStore((state) => ({
    fetchSettings: state.fetchSettings,
  }));

  useEffect(() => {
    (async () => {
      await migrator.migrate(await versionApi.getVersion());
      await fetchCurrencies();
      await fetchAccounts();
      await fetchExpenseCategories();
      await fetchExpenses();
      await fetchIncomeCategories();
      await fetchIncomes();
      await fetchTransfers();
      await fetchSettings();
      await SplashScreen.hide();
    })();
  }, [
    fetchCurrencies,
    fetchAccounts,
    fetchExpenseCategories,
    fetchExpenses,
    fetchIncomeCategories,
    fetchIncomes,
    fetchTransfers,
    fetchSettings,
  ]);
};
