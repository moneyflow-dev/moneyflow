import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { twMerge } from "tailwind-merge";

import { Header } from "@widgets/header";
import { GroupedTransactionList } from "@widgets/transaction-list";

import {
  CreateAccountFormFieldset,
  createAccountFormFieldsetSchema,
  CreateAccountFormFieldsetData,
  UpdateAccountButton,
} from "@features/create-account";
import { DeleteAccountButton } from "@features/delete-account";
import { getAccountBalance } from "@features/statistics";

import { useAccountsStore } from "@entities/account";
import {
  createCurrencyAmountString,
  useCurrenciesStore,
} from "@entities/currency";
import { useTransactions } from "@entities/transaction";

import { ColorPickerColor } from "@shared/ui/color-pickers";
import { Divider } from "@shared/ui/dividers";
import { PageLayout } from "@shared/ui/layouts";

const colorToBalanceClassName: Record<ColorPickerColor, string> = {
  yellow: "text-yellow",
  peach: "text-peach",
  green: "text-green",
  lavender: "text-lavender",
  mauve: "text-mauve",
  blue: "text-blue",
  sapphire: "text-sapphire",
  sky: "text-sky",
  teal: "text-teal",
  maroon: "text-maroon",
  red: "text-red",
  pink: "text-pink",
  flamingo: "text-flamingo",
  rosewater: "text-rosewater",
};

export const AccountOverviewPage = () => {
  const { id } = useParams();
  if (typeof id === "undefined") {
    throw new Error("Impossible account id");
  }

  const transactions = useTransactions();
  const { currencies } = useCurrenciesStore();
  const { getAccount } = useAccountsStore((state) => ({
    getAccount: state.getAccount,
  }));

  const account = getAccount(id);

  const methods = useForm<CreateAccountFormFieldsetData>({
    defaultValues: account,
    resolver: zodResolver(createAccountFormFieldsetSchema),
  });

  if (!account) {
    return null;
  }

  const { watch } = methods;

  const [color, currencyId] = watch(["color", "currencyId"]);

  if (currencyId === null) {
    throw new Error("Impossible currency id on the account overview page");
  }

  const currency = currencies.currencies[currencyId];

  return (
    <PageLayout hasBottomPadding>
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
        <main className="flex flex-col gap-4">
          <div className="flex flex-col gap-3 items-center">
            <div className="flex gap-4 items-center justify-between px-4 w-full whitespace-nowrap">
              <span className="text-base text-subtext0 font-bold">Balance</span>
              <span
                className={twMerge(
                  "text-xl font-extrabold overflow-x-auto",
                  colorToBalanceClassName[color],
                )}
              >
                {createCurrencyAmountString({
                  currency,
                  amount: getAccountBalance(
                    account.id,
                    account.initialBalance,
                    transactions,
                  ),
                })}
              </span>
            </div>
            <Divider />
          </div>
          <div className="flex flex-col gap-6">
            <CreateAccountFormFieldset currencies={currencies} />
            <Divider />
            {account && <GroupedTransactionList filters={{ accountId: id }} />}
          </div>
        </main>
      </FormProvider>
    </PageLayout>
  );
};
