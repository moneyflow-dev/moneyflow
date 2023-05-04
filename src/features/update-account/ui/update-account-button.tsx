import { useFormContext } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";

import { AccountID, UpdateAccount, useAccountsStore } from "@entities/account";

import { CheckIcon } from "@shared/ui/icons";

interface UpdateAccountButtonProps {
  id: AccountID;
  className?: string;
}

export const UpdateAccountButton = ({
  id,
  className,
}: UpdateAccountButtonProps) => {
  const { updateAccount } = useAccountsStore((state) => ({
    updateAccount: state.updateAccount,
  }));
  const navigate = useNavigate();
  const { handleSubmit, formState } = useFormContext<UpdateAccount>();

  const onUpdate = async (account: UpdateAccount) => {
    await updateAccount(id, account);
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
