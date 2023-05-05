import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import { Header } from "@widgets/header";

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
import { PageLayout } from "@shared/ui/layouts";

export const CurrencyOverviewPage = () => {
  const { id } = useParams();
  if (typeof id === "undefined") {
    throw new Error("Impossible currency id");
  }

  const { getCurrency } = useCurrenciesStore((state) => ({
    getCurrency: state.getCurrency,
  }));

  const methods = useForm<UpdateCurrency>({
    defaultValues: getCurrency(id),
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
    <PageLayout>
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
        <CreateCurrencyFormFieldset />
      </FormProvider>
    </PageLayout>
  );
};
