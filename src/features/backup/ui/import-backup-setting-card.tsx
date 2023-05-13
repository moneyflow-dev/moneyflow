import { useState } from "react";

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

import { Button } from "@shared/ui/buttons";
import { UploadIcon } from "@shared/ui/icons";
import { Modal } from "@shared/ui/modals";

import { importBackup } from "../model/import";

export const ImportBackupSettingCard = () => {
  const [confirmationIsOpen, setConfirmationIsOpen] = useState(false);

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

  const onClick = () => setConfirmationIsOpen(true);
  const closeConfirmation = () => setConfirmationIsOpen(false);

  const onImportBackup = async () => {
    await importBackup();
    await fetchCurrencies();
    await fetchAccounts();
    await fetchExpenseCategories();
    await fetchIncomeCategories();
    fetchExpenses();
    fetchIncomes();
    fetchTransfers();
    closeConfirmation();
  };

  return (
    <>
      <SettingCard
        icon={<UploadIcon size="md" />}
        title="Import backup"
        description="Import backup from file"
        onClick={onClick}
      />
      <Modal
        title="Are you sure?"
        description="If you import backup it will override your current settings. Make sure you have a backup."
        isOpen={confirmationIsOpen}
        onClose={closeConfirmation}
        actions={
          <div className="flex gap-3">
            <Button size="sm" variant="outlined" onClick={onImportBackup}>
              Import
            </Button>
            <Button size="sm" onClick={closeConfirmation}>
              Cancel
            </Button>
          </div>
        }
      />
    </>
  );
};
