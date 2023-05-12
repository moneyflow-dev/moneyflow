import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

import { Header } from "@widgets/header";
import { GroupedTransactionList } from "@widgets/transaction-list";

import {
  CreateAccountFormFieldset,
  createAccountFormFieldsetSchema,
  CreateAccountFormFieldsetData,
  UpdateAccountButton,
} from "@features/create-account";
import { DeleteAccountButton } from "@features/delete-account";

import { AccountIcon, useAccountsStore } from "@entities/account";
import { useCurrenciesStore } from "@entities/currency";

import { ColorPickerColor } from "@shared/ui/color-pickers";
import { Divider } from "@shared/ui/dividers";
import { PageLayout } from "@shared/ui/layouts";

export const AccountOverviewPage = () => {
  const { id } = useParams();
  if (typeof id === "undefined") {
    throw new Error("Impossible account id");
  }

  const { currencies } = useCurrenciesStore();

  const { getAccount } = useAccountsStore((state) => ({
    getAccount: state.getAccount,
  }));

  const account = getAccount(id);

  const methods = useForm<CreateAccountFormFieldsetData>({
    defaultValues: account,
    resolver: zodResolver(createAccountFormFieldsetSchema),
  });
  const { reset } = methods;

  const beforeDelete = () => {
    reset({
      title: "",
      currencyId: null,
      color: ColorPickerColor.peach,
      icon: AccountIcon.cash,
      initialBalance: "0",
    });
  };

  return (
    <PageLayout hasBottomPadding>
      <FormProvider {...methods}>
        <Header
          title="Account Overview"
          backButton
          rightActions={
            <>
              <DeleteAccountButton id={id} beforeDelete={beforeDelete} />
              <UpdateAccountButton id={id} />
            </>
          }
        />
        <main className="flex flex-col gap-6">
          <CreateAccountFormFieldset currencies={currencies} />
          <Divider />
          {account && <GroupedTransactionList filters={{ accountId: id }} />}
        </main>
      </FormProvider>
    </PageLayout>
  );
};
