import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";

import { useAccountsStore } from "@entities/account";
import { CurrencyID, useCurrenciesStore } from "@entities/currency";
import {
  useExpensesStore,
  useIncomesStore,
  useTransfersStore,
} from "@entities/transaction";

import { Button } from "@shared/ui/buttons";
import { TrashIcon } from "@shared/ui/icons";
import { Modal } from "@shared/ui/modals";

interface DeleteCurrencyButtonProps {
  id: CurrencyID;
  beforeDelete?(): void;
  className?: string;
}

export const DeleteCurrencyButton = ({
  id,
  beforeDelete,
  className,
}: DeleteCurrencyButtonProps) => {
  const navigate = useNavigate();
  const { deleteCurrency } = useCurrenciesStore((state) => ({
    deleteCurrency: state.deleteCurrency,
  }));
  const { deleteAccountsByCurrency } = useAccountsStore((state) => ({
    deleteAccountsByCurrency: state.deleteAccountsByCurrency,
  }));
  const { deleteExpensesByAccounts } = useExpensesStore((state) => ({
    deleteExpensesByAccounts: state.deleteExpensesByAccounts,
  }));
  const { deleteIncomesByAccounts } = useIncomesStore((state) => ({
    deleteIncomesByAccounts: state.deleteIncomesByAccounts,
  }));
  const { deleteTransfersByAccounts } = useTransfersStore((state) => ({
    deleteTransfersByAccounts: state.deleteTransfersByAccounts,
  }));
  const [confirmationIsOpen, setConfirmationIsOpen] = useState(false);

  const onDelete = async () => {
    beforeDelete && beforeDelete();
    await deleteCurrency(id);
    const accountIds = await deleteAccountsByCurrency(id);
    await deleteExpensesByAccounts(accountIds);
    await deleteIncomesByAccounts(accountIds);
    await deleteTransfersByAccounts(accountIds);
    navigate(-1);
  };

  const closeConfirmation = () => setConfirmationIsOpen(false);
  const openConfirmation = () => setConfirmationIsOpen(true);

  return (
    <>
      <button onClick={openConfirmation}>
        <TrashIcon
          size="sm"
          className={twMerge(
            "text-overlay1 active:text-overlay2 transition-colors",
            className,
          )}
        />
      </button>
      <Modal
        title="Are you sure?"
        description="If you delete this currency ALL related accounts and transactions will be also deleted. Make sure you have a backup."
        isOpen={confirmationIsOpen}
        onClose={closeConfirmation}
        actions={
          <div className="flex gap-3">
            <Button size="sm" variant="outlinedRed" onClick={onDelete}>
              Delete
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
