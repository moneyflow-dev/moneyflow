import { Controller, useFormContext } from "react-hook-form";
import { z } from "zod";

import { AccountID, AccountIcon, AccountPicker } from "@entities/account";
import {
  CategorySelect,
  IncomeCategoryID,
  IncomeCategories,
} from "@entities/category";
import {
  CurrenciesMap,
  CurrencyID,
  createCurrencyAmountString,
} from "@entities/currency";
import {
  IncomeID,
  Incomes,
  TransactionTitleAutocomplete,
  TransactionTitleAutocompleteProps,
  createIncomeAmountString,
  sortTransactionsByDateTime,
} from "@entities/transaction";

import { positiveDecimalRegex } from "@shared/lib/regex";
import { ColorPickerColor } from "@shared/ui/color-pickers";
import { CalendarIcon } from "@shared/ui/icons";
import { Input } from "@shared/ui/inputs";

interface CreateIncomeFormAccount {
  id: AccountID;
  title: string;
  color: ColorPickerColor;
  icon: AccountIcon;
  currencyId: CurrencyID;
}

export interface CreateIncomeFormData {
  title: string;
  categoryId: IncomeCategoryID | null;
  accountId: AccountID | null;
  amount: string;
  datetime: string;
}

export interface CreateIncomeFormFieldsetProps
  extends Pick<TransactionTitleAutocompleteProps, "searchTransactionsByTitle"> {
  incomes: Incomes;
  categories: IncomeCategories;
  accounts: {
    order: AccountID[];
    accounts: Record<AccountID, CreateIncomeFormAccount>;
  };
  currencies: CurrenciesMap;
}

export const createIncomeFormSchema = z.object({
  title: z.string(),
  categoryId: z.string(),
  accountId: z.string(),
  amount: z.string().regex(positiveDecimalRegex),
  datetime: z.string().nonempty(),
});

export const CreateIncomeFormFieldset = ({
  incomes,
  categories,
  accounts,
  currencies,
  searchTransactionsByTitle,
}: CreateIncomeFormFieldsetProps) => {
  const { control, register, watch, reset } =
    useFormContext<CreateIncomeFormData>();

  const [accountId, title] = watch(["accountId", "title"]);
  const currencySymbol =
    accountId === null
      ? undefined
      : currencies[accounts.accounts[accountId].currencyId]?.symbol;
  const sortedIncomes = sortTransactionsByDateTime(Object.values(incomes));
  const formattedIncomes = sortedIncomes.map((income) => ({
    ...income,
    formattedAmount: createIncomeAmountString(
      createCurrencyAmountString({
        currency: currencies[accounts.accounts[income.accountId].currencyId],
        amount: income.amount,
      }),
    ),
  }));

  const onSelectAutocompleteIncomeId = (value: IncomeID) => {
    const income = incomes[value];
    reset({
      title: income.title,
      categoryId: income.categoryId,
      accountId: income.accountId,
      amount: income.amount,
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <TransactionTitleAutocomplete
        transactions={formattedIncomes}
        title={title}
        amountColor="green"
        inputProps={{
          label: "Title",
          placeholder: "e.g. Salary, ...",
          value: title,
          ...register("title"),
        }}
        searchTransactionsByTitle={searchTransactionsByTitle}
        onSelect={onSelectAutocompleteIncomeId}
      />
      <Controller
        control={control}
        name="categoryId"
        render={({ field: { value, onChange } }) => (
          <CategorySelect
            categories={categories}
            label="Category"
            required
            value={value}
            onChange={onChange}
          />
        )}
      />
      <Controller
        control={control}
        name="accountId"
        render={({ field: { value, onChange } }) => (
          <AccountPicker
            accounts={accounts.order.map((accountId) => {
              const account = accounts.accounts[accountId];
              return {
                ...account,
                currencySymbol: currencies[account.currencyId].symbol,
              };
            })}
            label="Account"
            required
            value={value}
            onChange={onChange}
          />
        )}
      />
      <Input
        label="Amount"
        placeholder="15.8"
        required
        type="number"
        leftAddon={currencySymbol}
        {...register("amount")}
      />
      <Input
        label="Date & Time"
        required
        type="datetime-local"
        leftAddon={<CalendarIcon size="sm" />}
        inputBoxClassName="gap-3"
        {...register("datetime")}
      />
    </div>
  );
};
