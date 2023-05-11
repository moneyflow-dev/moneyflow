import { DateTime } from "luxon";
import { useFormContext } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";

import { TransferID, useTransfersStore } from "@entities/transaction";

import { CheckIcon } from "@shared/ui/icons";

import { CreateTransferFormData } from "./create-transfer-form-fieldset";

interface UpdateTransferButtonProps {
  id: TransferID;
  className?: string;
}

export const UpdateTransferButton = ({
  id,
  className,
}: UpdateTransferButtonProps) => {
  const { updateTransfer } = useTransfersStore((state) => ({
    updateTransfer: state.updateTransfer,
  }));
  const navigate = useNavigate();
  const { handleSubmit, formState } = useFormContext<CreateTransferFormData>();

  const onUpdate = async (transfer: CreateTransferFormData) => {
    if (transfer.fromAccountId === null) {
      throw new Error("Impossible fromAccountId on transfer update");
    }
    if (transfer.toAccountId === null) {
      throw new Error("Impossible toAccountId on transfer update");
    }

    await updateTransfer(id, {
      title: transfer.title,
      fromAccount: {
        accountId: transfer.fromAccountId,
        amount: transfer.fromAccountAmount,
      },
      toAccount: {
        accountId: transfer.toAccountId,
        amount: transfer.toAccountAmount,
      },
      datetime: DateTime.fromISO(transfer.datetime),
    });
    navigate(-1);
  };

  const disabled = !formState.isValid;

  return (
    <button onClick={handleSubmit(onUpdate)} disabled={disabled}>
      <CheckIcon
        size="sm"
        className={twMerge(
          `text-overlay1 ${
            disabled ? "opacity-50" : "active:text-overlay2"
          } transition-colors`,
          className,
        )}
      />
    </button>
  );
};
