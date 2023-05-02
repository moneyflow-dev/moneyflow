import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";

import { CurrencyID, useCurrenciesStore } from "@entities/currency";

import { Button } from "@shared/ui/buttons";
import { TrashIcon } from "@shared/ui/icons";
import { Modal } from "@shared/ui/modals";

interface DeleteCurrencyButtonProps {
  id: CurrencyID;
  className?: string;
}

export const DeleteCurrencyButton = ({
  id,
  className,
}: DeleteCurrencyButtonProps) => {
  const { deleteCurrency } = useCurrenciesStore((state) => ({
    deleteCurrency: state.deleteCurrency,
  }));
  const [confirmationIsOpen, setConfirmationIsOpen] = useState(false);
  const navigate = useNavigate();

  const onDelete = async () => {
    await deleteCurrency(id);
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
