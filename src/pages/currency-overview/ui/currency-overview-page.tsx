import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

import { Header } from "@widgets/header";
import { GroupedTransactionList } from "@widgets/transaction-list";

import {
  CreateCurrencyFormFieldset,
  createCurrencyFormFieldsetSchema,
} from "@features/create-currency";
import { DeleteCurrencyButton } from "@features/delete-currency";
import { UpdateCurrencyButton } from "@features/update-currency";

import {
  CurrencySymbolPosition,
  UpdateCurrency,
  useCurrenciesStore,
} from "@entities/currency";

import { ColorPickerColor } from "@shared/ui/color-pickers";
import { Divider } from "@shared/ui/dividers";
import { PageLayout } from "@shared/ui/layouts";

export const CurrencyOverviewPage = () => {
  const { id } = useParams();
  if (typeof id === "undefined") {
    throw new Error("Impossible currency id");
  }

  const { getCurrency } = useCurrenciesStore((state) => ({
    getCurrency: state.getCurrency,
  }));

  const currency = getCurrency(id);

  const methods = useForm<UpdateCurrency>({
    defaultValues: currency,
    resolver: zodResolver(createCurrencyFormFieldsetSchema),
  });
  const { reset } = methods;

  const beforeDelete = () => {
    reset({
      symbol: "",
      symbolPosition: CurrencySymbolPosition.left,
      color: ColorPickerColor.peach,
      hasSpaceBetweenAmountAndSymbol: false,
    });
  };

  return (
    <PageLayout hasBottomPadding>
      <FormProvider {...methods}>
        <Header
          title="Currency Overview"
          backButton
          rightActions={
            <>
              <DeleteCurrencyButton id={id} beforeDelete={beforeDelete} />
              <UpdateCurrencyButton id={id} />
            </>
          }
        />

        <main className="flex flex-col gap-6">
          <CreateCurrencyFormFieldset />
          <Divider />
          {currency && <GroupedTransactionList filters={{ currencyId: id }} />}
        </main>
      </FormProvider>
    </PageLayout>
  );
};
