import { Controller, useFormContext } from "react-hook-form";
import { z } from "zod";

import { AccountID, AccountIcon, AccountPicker } from "@entities/account";
import {
  CategorySelect,
  ExpenseCategoryID,
  ExpenseCategories,
} from "@entities/category";
import {
  CurrenciesMap,
  CurrencyID,
  createCurrencyAmountString,
} from "@entities/currency";
import {
  ExpenseID,
  Expenses,
  TransactionTitleAutocomplete,
  TransactionTitleAutocompleteProps,
  createExpenseAmountString,
  sortTransactionsByDateTime,
} from "@entities/transaction";

import { positiveDecimalRegex } from "@shared/lib/regex";
import { ColorPickerColor } from "@shared/ui/color-pickers";
import { CalendarIcon } from "@shared/ui/icons";
import { Input } from "@shared/ui/inputs";

interface CreateExpenseFormAccount {
  id: AccountID;
  title: string;
  color: ColorPickerColor;
  icon: AccountIcon;
  currencyId: CurrencyID;
}

export interface CreateExpenseFormData {
  title: string;
  categoryId: ExpenseCategoryID | null;
  accountId: AccountID | null;
  amount: string;
  datetime: string;
}

export interface CreateExpenseFormFieldsetProps
  extends Pick<TransactionTitleAutocompleteProps, "searchTransactionsByTitle"> {
  expenses: Expenses;
  categories: ExpenseCategories;
  accounts: {
    order: AccountID[];
    accounts: Record<AccountID, CreateExpenseFormAccount>;
  };
  currencies: CurrenciesMap;
}

export const createExpenseFormSchema = z.object({
  title: z.string(),
  categoryId: z.string(),
  accountId: z.string(),
  amount: z.string().regex(positiveDecimalRegex),
  datetime: z.string().nonempty(),
});

export const CreateExpenseFormFieldset = ({
  expenses,
  categories,
  accounts,
  currencies,
  searchTransactionsByTitle,
}: CreateExpenseFormFieldsetProps) => {
  const { control, register, watch, reset } =
    useFormContext<CreateExpenseFormData>();

  const [accountId, title] = watch(["accountId", "title"]);
  const currencySymbol =
    accountId === null
      ? undefined
      : currencies[accounts.accounts[accountId].currencyId]?.symbol;
  const sortedExpenses = sortTransactionsByDateTime(Object.values(expenses));
  const formattedExpenses = sortedExpenses.map((expense) => ({
    ...expense,
    formattedAmount: createExpenseAmountString(
      createCurrencyAmountString({
        currency: currencies[accounts.accounts[expense.accountId].currencyId],
        amount: expense.amount,
      }),
    ),
  }));

  const onSelectAutocompleteExpenseId = (value: ExpenseID) => {
    const expense = expenses[value];
    reset({
      title: expense.title,
      categoryId: expense.categoryId,
      accountId: expense.accountId,
      amount: expense.amount,
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <TransactionTitleAutocomplete
        transactions={formattedExpenses}
        title={title}
        amountColor="red"
        inputProps={{
          label: "Title",
          placeholder: "e.g. Bananas, Bread, ...",
          value: title,
          ...register("title"),
          // onChange: (event) => setTitle(event.target.value),
        }}
        searchTransactionsByTitle={searchTransactionsByTitle}
        onSelect={onSelectAutocompleteExpenseId}
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
