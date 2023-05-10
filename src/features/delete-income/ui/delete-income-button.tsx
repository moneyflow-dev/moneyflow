import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";

import { IncomeID, useIncomesStore } from "@entities/transaction";

import { Button } from "@shared/ui/buttons";
import { TrashIcon } from "@shared/ui/icons";
import { Modal } from "@shared/ui/modals";

interface DeleteIncomeButtonProps {
  id: IncomeID;
  beforeDelete?(): void;
  className?: string;
}

export const DeleteIncomeButton = ({
  id,
  beforeDelete,
  className,
}: DeleteIncomeButtonProps) => {
  const navigate = useNavigate();
  const { deleteIncome } = useIncomesStore((state) => ({
    deleteIncome: state.deleteIncome,
  }));
  const [confirmationIsOpen, setConfirmationIsOpen] = useState(false);

  const onDelete = async () => {
    beforeDelete && beforeDelete();
    await deleteIncome(id);
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
        description="You will not be able to undo this action. Make sure you have a backup."
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
