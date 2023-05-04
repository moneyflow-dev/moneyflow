import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";

import { useAccountsStore } from "@entities/account";
import { useCurrenciesStore } from "@entities/currency";

import { Button } from "@shared/ui/buttons";

import { useCreateAccountStore } from "../model/store";

import {
  CreateAccountFormFieldset,
  CreateAccountFormFieldsetData,
  createAccountFormFieldsetSchema,
} from "./create-account-form-fieldset";

interface CreateAccountFormProps {
  className?: string;
}

export const CreateAccountForm = ({ className }: CreateAccountFormProps) => {
  const navigate = useNavigate();
  const { currencies } = useCurrenciesStore();
  const { createAccount } = useAccountsStore((state) => ({
    createAccount: state.createAccount,
  }));

  const {
    getAccountFormState,
    setAccountFormState,
    resetAccountFormState,
    setCurrencyId,
  } = useCreateAccountStore();

  const methods = useForm<CreateAccountFormFieldsetData>({
    defaultValues: getAccountFormState(),
    resolver: zodResolver(createAccountFormFieldsetSchema),
  });
  const { formState, handleSubmit, watch } = methods;

  const formFields = watch();
  const { title, currencyId, color, icon, initialBalance } = formFields;

  useEffect(() => {
    const currency =
      currencyId === null
        ? currencyId
        : currencies.currencies[currencyId] ?? null;
    if (currency === null) {
      setCurrencyId(null);
    }
  }, [currencyId, currencies.currencies, setCurrencyId]);

  useEffect(() => {
    setAccountFormState({ title, currencyId, color, icon, initialBalance });
  }, [title, currencyId, color, icon, initialBalance, setAccountFormState]);

  const onCreateAccount = async (account: CreateAccountFormFieldsetData) => {
    if (account.currencyId === null) {
      throw new Error("Impossible currencyId on account creation");
    }
    // Remap object because type guard
    await createAccount({ ...account, currencyId: account.currencyId });
    resetAccountFormState();
    navigate(-1);
  };

  return (
    <FormProvider {...methods}>
      <form
        className={twMerge(
          "flex flex-col justify-between items-center pb-7",
          className,
        )}
      >
        <CreateAccountFormFieldset currencies={currencies} className="w-full" />
        <Button
          onClick={handleSubmit(onCreateAccount)}
          className="w-[75%] self-center"
          disabled={!formState.isValid}
        >
          Confirm
        </Button>
      </form>
    </FormProvider>
  );
};
