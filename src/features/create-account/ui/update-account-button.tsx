import { useFormContext } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";

import { AccountID, useAccountsStore } from "@entities/account";

import { CheckIcon } from "@shared/ui/icons";

import { CreateAccountFormFieldsetData } from "./create-account-form-fieldset";

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
  const { handleSubmit, formState } =
    useFormContext<CreateAccountFormFieldsetData>();

  const onUpdate = async (account: CreateAccountFormFieldsetData) => {
    if (account.currencyId === null) {
      throw new Error("Impossible currencyId on account creation");
    }
    // Remap object because type guard
    await updateAccount(id, { ...account, currencyId: account.currencyId });
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
