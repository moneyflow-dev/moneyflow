import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

import { Header } from "@widgets/header";

import {
  CreateAccountFormFieldset,
  createAccountFormFieldsetSchema,
} from "@features/create-account";
import { DeleteAccountButton } from "@features/delete-account";
import { UpdateAccountButton } from "@features/update-account";

import { UpdateAccount, useAccountsStore } from "@entities/account";
import { useCurrenciesStore } from "@entities/currency";

import { PageLayout } from "@shared/ui/layouts";

export const AccountOverviewPage = () => {
  const { id } = useParams();
  if (typeof id === "undefined") {
    throw new Error("Impossible account id");
  }

  const { accounts } = useAccountsStore();
  const account = accounts[id];
  if (typeof account === "undefined") {
    throw new Error("Impossible account id");
  }

  const { currencies } = useCurrenciesStore();

  const methods = useForm<UpdateAccount>({
    defaultValues: {
      title: account.title,
      currencyId: account.currencyId,
      color: account.color,
      icon: account.icon,
      initialBalance: account.initialBalance,
    },
    resolver: zodResolver(createAccountFormFieldsetSchema),
  });

  return (
    <PageLayout>
      <FormProvider {...methods}>
        <Header
          title="Account Overview"
          backButton
          rightActions={
            <>
              <DeleteAccountButton id={id} />
              <UpdateAccountButton id={id} />
            </>
          }
        />
        <CreateAccountFormFieldset currencies={currencies} />
      </FormProvider>
    </PageLayout>
  );
};
