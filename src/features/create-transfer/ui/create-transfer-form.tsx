import { zodResolver } from "@hookform/resolvers/zod";
import { DateTime } from "luxon";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";

import { useAccountsStore } from "@entities/account";
import { useCurrenciesStore } from "@entities/currency";
import { useTransfersStore } from "@entities/transaction";

import { getNowLocalDatetime } from "@shared/lib/date";
import { Button } from "@shared/ui/buttons";

import { useCreateTransferFormStore } from "../model/store";

import {
  CreateTransferFormData,
  CreateTransferFormFieldset,
  CreateTransferFormFieldsetProps,
  createTransferFormSchema,
} from "./create-transfer-form-fieldset";

interface CreateTransferFormProps
  extends Pick<CreateTransferFormFieldsetProps, "searchTransactionsByTitle"> {
  className?: string;
}

export const CreateTransferForm = ({
  className,
  searchTransactionsByTitle,
}: CreateTransferFormProps) => {
  const navigate = useNavigate();
  const { createTransfer, transfers } = useTransfersStore((state) => ({
    transfers: state.transfers,
    createTransfer: state.createTransfer,
  }));
  const { order: accountsOrder, accounts } = useAccountsStore();
  const {
    currencies: { currencies },
  } = useCurrenciesStore();
  const {
    getCreateTransferFormState,
    setCreateTransferFormState,
    setFromAccountId,
    setToAccountId,
    resetCreateTransferFormState,
  } = useCreateTransferFormStore();

  const defaultValues = getCreateTransferFormState();
  const methods = useForm<CreateTransferFormData>({
    defaultValues: {
      ...defaultValues,
      datetime: defaultValues.datetime
        ? defaultValues.datetime
        : getNowLocalDatetime(),
    },
    resolver: zodResolver(createTransferFormSchema),
  });
  const { handleSubmit, formState, watch } = methods;

  const {
    title,
    fromAccountId,
    fromAccountAmount,
    toAccountId,
    toAccountAmount,
    datetime,
  } = watch();

  useEffect(() => {
    const account =
      fromAccountId === null ? fromAccountId : accounts[fromAccountId] ?? null;
    if (account === null) {
      setFromAccountId(null);
    }
  }, [fromAccountId, accounts, setFromAccountId]);

  useEffect(() => {
    const account =
      toAccountId === null ? toAccountId : accounts[toAccountId] ?? null;
    if (account === null) {
      setToAccountId(null);
    }
  }, [toAccountId, accounts, setToAccountId]);

  useEffect(() => {
    setCreateTransferFormState({
      title,
      fromAccountId,
      fromAccountAmount,
      toAccountId,
      toAccountAmount,
      datetime,
    });
  }, [
    title,
    fromAccountId,
    fromAccountAmount,
    toAccountId,
    toAccountAmount,
    datetime,
    setCreateTransferFormState,
  ]);

  const onCreateTransfer = async (transfer: CreateTransferFormData) => {
    if (transfer.fromAccountId === null) {
      throw new Error("Impossible fromAccountId on transfer creation");
    }
    if (transfer.toAccountId === null) {
      throw new Error("Impossible toAccountId on transfer creation");
    }

    await createTransfer({
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
    resetCreateTransferFormState();
    navigate(-1);
  };

  return (
    <FormProvider {...methods}>
      <form
        className={twMerge(
          "flex flex-col justify-between gap-8 pb-7",
          className,
        )}
      >
        <CreateTransferFormFieldset
          transfers={transfers}
          accounts={{ order: accountsOrder, accounts }}
          currencies={currencies}
          searchTransactionsByTitle={searchTransactionsByTitle}
        />
        <Button
          onClick={handleSubmit(onCreateTransfer)}
          className="w-[75%] self-center"
          disabled={!formState.isValid}
        >
          Confirm
        </Button>
      </form>
    </FormProvider>
  );
};
