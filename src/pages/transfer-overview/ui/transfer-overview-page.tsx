import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

import { Header } from "@widgets/header";

import {
  CreateTransferFormFieldset,
  createTransferFormSchema,
  CreateTransferFormData,
  UpdateTransferButton,
} from "@features/create-transfer";
import { DeleteTransferButton } from "@features/delete-transfer";

import { useAccountsStore } from "@entities/account";
import { useCurrenciesStore } from "@entities/currency";
import { useTransfersStore } from "@entities/transaction";

import { toLocalDatetime } from "@shared/lib/date";
import { PageLayout } from "@shared/ui/layouts";

export const TransferOverviewPage = () => {
  const { id } = useParams();
  if (typeof id === "undefined") {
    throw new Error("Impossible transfer id");
  }

  const { accounts, order: accountsOrder } = useAccountsStore();
  const { currencies } = useCurrenciesStore();
  const { getTransfer } = useTransfersStore((state) => ({
    getTransfer: state.getTransfer,
  }));

  const transfer = getTransfer(id);

  const methods = useForm<CreateTransferFormData>({
    defaultValues: transfer && {
      title: transfer.title,
      fromAccountId: transfer.fromAccount.accountId,
      fromAccountAmount: transfer.fromAccount.amount,
      toAccountId: transfer.toAccount.accountId,
      toAccountAmount: transfer.toAccount.amount,
      datetime: toLocalDatetime(transfer.datetime),
    },
    resolver: zodResolver(createTransferFormSchema),
  });

  return (
    <PageLayout>
      <FormProvider {...methods}>
        <Header
          title="Transfer Overview"
          backButton
          rightActions={
            <>
              <DeleteTransferButton id={id} />
              <UpdateTransferButton id={id} />
            </>
          }
        />
        <CreateTransferFormFieldset
          accounts={{ accounts, order: accountsOrder }}
          currencies={currencies.currencies}
        />
      </FormProvider>
    </PageLayout>
  );
};
