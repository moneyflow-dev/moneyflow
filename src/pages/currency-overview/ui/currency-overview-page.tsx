import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

import { Header } from "@widgets/header";

import {
  CreateCurrencyFormFieldset,
  createCurrencyFormFieldsetSchema,
} from "@features/create-currency";
import { DeleteCurrencyButton } from "@features/delete-currency";
import { UpdateCurrencyButton } from "@features/update-currency";

import { UpdateCurrency, useCurrenciesStore } from "@entities/currency";

import { PageLayout } from "@shared/ui/layouts";

export const CurrencyOverviewPage = () => {
  const { id } = useParams();
  if (typeof id === "undefined") {
    throw new Error("Impossible currency id");
  }

  const { currencies } = useCurrenciesStore();
  const currency = currencies.currencies[id];
  if (typeof currency === "undefined") {
    throw new Error("Impossible currency id");
  }

  const methods = useForm<UpdateCurrency>({
    defaultValues: {
      symbol: currency.symbol,
      symbolPosition: currency.symbolPosition,
      color: currency.color,
      hasSpaceBetweenAmountAndSymbol: currency.hasSpaceBetweenAmountAndSymbol,
    },
    resolver: zodResolver(createCurrencyFormFieldsetSchema),
  });

  return (
    <PageLayout>
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
        <CreateCurrencyFormFieldset />
      </FormProvider>
    </PageLayout>
  );
};
