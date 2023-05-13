import { useAccountsStore } from "@entities/account";
import {
  useExpenseCategoriesStore,
  useIncomeCategoriesStore,
} from "@entities/category";
import { useCurrenciesStore } from "@entities/currency";
import { SettingCard } from "@entities/settings";
import {
  useExpensesStore,
  useIncomesStore,
  useTransfersStore,
} from "@entities/transaction";

import { UploadIcon } from "@shared/ui/icons";

import { importBackup } from "../model/import";

export const ImportBackupSettingCard = () => {
  const { fetchExpenses } = useExpensesStore((state) => ({
    fetchExpenses: state.fetchExpenses,
  }));
  const { fetchIncomes } = useIncomesStore((state) => ({
    fetchIncomes: state.fetchIncomes,
  }));
  const { fetchTransfers } = useTransfersStore((state) => ({
    fetchTransfers: state.fetchTransfers,
  }));
  const { fetchCurrencies } = useCurrenciesStore((state) => ({
    fetchCurrencies: state.fetchCurrencies,
  }));
  const { fetchAccounts } = useAccountsStore((state) => ({
    fetchAccounts: state.fetchAccounts,
  }));
  const { fetchExpenseCategories } = useExpenseCategoriesStore((state) => ({
    fetchExpenseCategories: state.fetchExpenseCategories,
  }));
  const { fetchIncomeCategories } = useIncomeCategoriesStore((state) => ({
    fetchIncomeCategories: state.fetchIncomeCategories,
  }));

  const onImportBackup = async () => {
    await importBackup();
    await fetchCurrencies();
    await fetchAccounts();
    await fetchExpenseCategories();
    await fetchIncomeCategories();
    fetchExpenses();
    fetchIncomes();
    fetchTransfers();
  };

  return (
    <SettingCard
      icon={<UploadIcon size="md" />}
      title="Import backup"
      description="Import backup from file"
      onClick={onImportBackup}
    />
  );
};
