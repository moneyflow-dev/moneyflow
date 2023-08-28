import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { twMerge } from "tailwind-merge";

import { Header } from "@widgets/header";
import { GroupedTransactionList } from "@widgets/transaction-list";

import {
  CreateCurrencyFormFieldset,
  createCurrencyFormFieldsetSchema,
  CreateCurrencyFormFieldsetSchema,
  UpdateCurrencyButton,
} from "@features/create-currency";
import { DeleteCurrencyButton } from "@features/delete-currency";
import { getCurrencyBalance } from "@features/statistics";

import { useAccountsStore } from "@entities/account";
import {
  createCurrencyAmountString,
  Currency,
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

export const CurrencyOverviewPage = () => {
  const { id } = useParams();
  if (typeof id === "undefined") {
    throw new Error("Impossible currency id");
  }

  const { getCurrency } = useCurrenciesStore((state) => ({
    getCurrency: state.getCurrency,
  }));
  const { accounts } = useAccountsStore((state) => ({
    accounts: state.accounts,
  }));
  const transactions = useTransactions();

  const currency = getCurrency(id);

  const methods = useForm<CreateCurrencyFormFieldsetSchema>({
    defaultValues: {
      ...currency,
      precision: currency?.precision?.toString(),
    },
    resolver: zodResolver(createCurrencyFormFieldsetSchema),
  });

  if (!currency) {
    return null;
  }

  const { watch } = methods;

  const color = watch("color");

  return (
    <PageLayout hasBottomPadding>
      <FormProvider {...methods}>
        <Header
          title="Currency Overview"
          backButton
          rightActions={
            <>
              <DeleteCurrencyButton id={id} />
              <UpdateCurrencyButton id={id} />
            </>
          }
        />

        <main className="flex flex-col gap-4">
          <div className="flex flex-col gap-3 items-center">
            <span
              className={twMerge(
                "text-xl font-extrabold px-4",
                colorToBalanceClassName[color],
              )}
            >
              {createCurrencyAmountString({
                currency,
                amount: getCurrencyBalance(currency.id, accounts, transactions),
              })}
            </span>
            <Divider />
          </div>
          <div className="flex flex-col gap-6">
            <CreateCurrencyFormFieldset />
            <Divider />
            {currency && (
              <GroupedTransactionList filters={{ currencyId: id }} />
            )}
          </div>
        </main>
      </FormProvider>
    </PageLayout>
  );
};
