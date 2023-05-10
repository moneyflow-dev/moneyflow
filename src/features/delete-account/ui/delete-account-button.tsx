import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";

import { AccountID, useAccountsStore } from "@entities/account";
import { useExpensesStore } from "@entities/transaction";

import { Button } from "@shared/ui/buttons";
import { TrashIcon } from "@shared/ui/icons";
import { Modal } from "@shared/ui/modals";

interface DeleteAccountButtonProps {
  id: AccountID;
  beforeDelete?(): void;
  className?: string;
}

export const DeleteAccountButton = ({
  id,
  beforeDelete,
  className,
}: DeleteAccountButtonProps) => {
  const navigate = useNavigate();
  const { deleteAccount } = useAccountsStore((state) => ({
    deleteAccount: state.deleteAccount,
  }));
  const { deleteExpensesByAccounts } = useExpensesStore((state) => ({
    deleteExpensesByAccounts: state.deleteExpensesByAccounts,
  }));
  const [confirmationIsOpen, setConfirmationIsOpen] = useState(false);

  const onDelete = async () => {
    beforeDelete && beforeDelete();
    await deleteAccount(id);
    await deleteExpensesByAccounts([id]);
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
        description="If you delete this account ALL related transactions will be also deleted. Make sure you have a backup."
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
