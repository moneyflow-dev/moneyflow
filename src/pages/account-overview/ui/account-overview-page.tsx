import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

import { Header } from "@widgets/header";

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

  const methods = useForm<CreateAccountFormFieldsetData>({
    defaultValues: getAccount(id),
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
    <PageLayout>
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
        <CreateAccountFormFieldset currencies={currencies} />
      </FormProvider>
    </PageLayout>
  );
};
