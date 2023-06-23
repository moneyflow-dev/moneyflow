import { DateTime } from "luxon";
import { useEffect } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { twMerge } from "tailwind-merge";

import {
  AccountCheckbox,
  AccountID,
  AccountMultiplePicker,
  useAccountsStore,
} from "@entities/account";
import {
  CategorySelect,
  ExpenseCategoryID,
  IncomeCategoryID,
  useExpenseCategoriesStore,
  useIncomeCategoriesStore,
} from "@entities/category";
import {
  CurrencyCheckbox,
  CurrencyID,
  CurrencyMultiplePicker,
  useCurrenciesStore,
} from "@entities/currency";

import { toLocalDatetime } from "@shared/lib/date";
import { Button } from "@shared/ui/buttons";
import { CalendarIcon, FilterIcon } from "@shared/ui/icons";
import { Input } from "@shared/ui/inputs";
import { ModalBottomSlide } from "@shared/ui/modals";

import { TransactionFilters } from "../model/filter";

interface TransactionFiltersFormData {
  currencies: { currencyId: CurrencyID; value: boolean }[];
  accounts: { accountId: AccountID; value: boolean }[];
  expenseCategoryId: ExpenseCategoryID | null;
  incomeCategoryId: IncomeCategoryID | null;
  fromDateTimeRange: string;
  toDateTimeRange: string;
}

interface TransactionFiltersButtonProps {
  isOpen: boolean;
  onIsOpenChange: (value: boolean) => void;
  defaultValue?: TransactionFilters;
  onChange?(filters: TransactionFilters): void;
  className?: string;
}

const mapFormDataToFilters = (
  data: TransactionFiltersFormData,
): TransactionFilters => {
  const currencyIds = data.currencies
    .filter((c) => c.value)
    .map((c) => c.currencyId);
  const accountIds = data.accounts
    .filter((a) => a.value)
    .map((a) => a.accountId);

  const fromDateTimeRange = data.fromDateTimeRange;
  const toDateTimeRange = data.toDateTimeRange;
  return {
    currencyId: currencyIds.length ? currencyIds : undefined,
    accountId: accountIds.length ? accountIds : undefined,
    expenseCategoryId: data.expenseCategoryId ?? undefined,
    incomeCategoryId: data.incomeCategoryId ?? undefined,
    fromDateTimeRange: fromDateTimeRange
      ? DateTime.fromISO(fromDateTimeRange)
      : undefined,
    toDateTimeRange: toDateTimeRange
      ? DateTime.fromISO(toDateTimeRange)
      : undefined,
  };
};

export const TransactionFiltersButton = ({
  isOpen,
  onIsOpenChange,
  defaultValue,
  onChange,
  className,
}: TransactionFiltersButtonProps) => {
  const {
    currencies: { currencies, order: currenciesOrder },
  } = useCurrenciesStore();
  const { accounts, order: accountsOrder } = useAccountsStore();
  const { expenseCategories } = useExpenseCategoriesStore();
  const { incomeCategories } = useIncomeCategoriesStore();

  const { control, watch, handleSubmit, register, setValue } =
    useForm<TransactionFiltersFormData>({
      defaultValues: {
        currencies: [],
        accounts: [],
        expenseCategoryId: defaultValue?.expenseCategoryId ?? null,
        incomeCategoryId: defaultValue?.incomeCategoryId ?? null,
        fromDateTimeRange:
          defaultValue?.fromDateTimeRange &&
          toLocalDatetime(defaultValue.fromDateTimeRange),
        toDateTimeRange:
          defaultValue?.toDateTimeRange &&
          toLocalDatetime(defaultValue.toDateTimeRange),
      },
    });
  const { fields: currencyFields } = useFieldArray({
    name: "currencies",
    control,
  });
  const { fields: accountFields, replace: replaceAccountFields } =
    useFieldArray({
      name: "accounts",
      control,
    });

  const formCurrencies = watch("currencies");
  // Hash of currency fields state for useEffect dependency, because array of currency fields as dependency causes recursive re-render
  const formCurrenciesHash = formCurrencies
    .map((c) => `${c.currencyId}${c.value}`)
    .join("");

  useEffect(() => {
    const selectedCurrencies = formCurrencies.filter((c) => c.value);
    const selectedCurrencyIds = selectedCurrencies.map((c) => c.currencyId);
    const recomputedAccounts = selectedCurrencyIds.length
      ? accountsOrder
          .filter((accountId) =>
            selectedCurrencyIds.includes(accounts[accountId].currencyId),
          )
          .map((accountId) => ({
            accountId,
            value: Boolean(defaultValue?.accountId?.includes(accountId)),
          }))
      : accountsOrder.map((accountId) => ({
          accountId,
          value: Boolean(defaultValue?.accountId?.includes(accountId)),
        }));
    replaceAccountFields(recomputedAccounts);
  }, [
    formCurrencies,
    formCurrenciesHash,
    replaceAccountFields,
    accountsOrder,
    accounts,
    defaultValue?.accountId,
  ]);

  useEffect(() => {
    setValue(
      "currencies",
      currenciesOrder.map((currencyId) => ({
        currencyId,
        value: Boolean(defaultValue?.currencyId?.includes(currencyId)),
      })),
    );
  }, [currencies, currenciesOrder, setValue, defaultValue?.currencyId]);

  const closeModal = () => onIsOpenChange(false);
  const openModal = () => onIsOpenChange(true);

  const onApply = (data: TransactionFiltersFormData) => {
    onChange?.(mapFormDataToFilters(data));
    closeModal();
  };

  return (
    <>
      <button onClick={openModal}>
        <FilterIcon
          size="sm"
          className={twMerge(
            "text-overlay1 active:text-overlay2 transition-colors",
            className,
          )}
        />
      </button>
      <ModalBottomSlide
        title="Transactions Filters"
        isOpen={isOpen}
        onClose={closeModal}
        pageLayoutClassName="h-full"
      >
        <div className="flex flex-col justify-between h-full pb-7 gap-4">
          <div className="flex flex-col gap-6">
            <CurrencyMultiplePicker>
              {currencyFields.map((currencyField, index) => (
                <Controller
                  key={currencyField.id}
                  control={control}
                  name={`currencies.${index}.value`}
                  render={({ field: { value, onChange } }) => (
                    <CurrencyCheckbox
                      checked={value}
                      currency={currencies[currencyField.currencyId]}
                      onChange={onChange}
                    />
                  )}
                />
              ))}
            </CurrencyMultiplePicker>
            <AccountMultiplePicker>
              {accountFields.map((accountField, index) => (
                <Controller
                  key={accountField.id}
                  control={control}
                  name={`accounts.${index}.value`}
                  render={({ field: { value, onChange } }) => (
                    <AccountCheckbox
                      checked={value}
                      account={{
                        ...accounts[accountField.accountId],
                        currencySymbol:
                          currencies[
                            accounts[accountField.accountId].currencyId
                          ].symbol,
                      }}
                      onChange={onChange}
                    />
                  )}
                />
              ))}
            </AccountMultiplePicker>
            <Controller
              control={control}
              name="expenseCategoryId"
              render={({ field: { value, onChange } }) => (
                <CategorySelect
                  categories={expenseCategories}
                  label="Expense category"
                  value={value}
                  onChange={onChange}
                />
              )}
            />
            <Controller
              control={control}
              name="incomeCategoryId"
              render={({ field: { value, onChange } }) => (
                <CategorySelect
                  categories={incomeCategories}
                  label="Income category"
                  value={value}
                  onChange={onChange}
                />
              )}
            />
            <Input
              label="From date time"
              type="datetime-local"
              leftAddon={<CalendarIcon size="sm" />}
              inputBoxClassName="gap-3"
              className=""
              placeholder="From"
              {...register("fromDateTimeRange")}
            />
            <Input
              label="To date time"
              type="datetime-local"
              leftAddon={<CalendarIcon size="sm" />}
              inputBoxClassName="gap-3"
              placeholder="To"
              {...register("toDateTimeRange")}
            />
          </div>
          <Button
            onClick={handleSubmit(onApply)}
            className="w-[75%] self-center"
          >
            Apply
          </Button>
        </div>
      </ModalBottomSlide>
    </>
  );
};
