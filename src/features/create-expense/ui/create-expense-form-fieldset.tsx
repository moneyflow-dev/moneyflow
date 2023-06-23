import { Controller, useFormContext } from "react-hook-form";
import { z } from "zod";

import { AccountID, AccountIcon, AccountPicker } from "@entities/account";
import {
  CategorySelect,
  ExpenseCategoryID,
  ExpenseCategories,
} from "@entities/category";
import { CurrencyID } from "@entities/currency";

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

interface CreateExpenseFormFieldsetProps {
  categories: ExpenseCategories;
  accounts: {
    order: AccountID[];
    accounts: Record<AccountID, CreateExpenseFormAccount>;
  };
  currencies: Record<CurrencyID, { symbol: string }>;
}

export const createExpenseFormSchema = z.object({
  title: z.string(),
  categoryId: z.string(),
  accountId: z.string(),
  amount: z.string().regex(positiveDecimalRegex),
  datetime: z.string().nonempty(),
});

export const CreateExpenseFormFieldset = ({
  categories,
  accounts,
  currencies,
}: CreateExpenseFormFieldsetProps) => {
  const { control, register, watch } = useFormContext<CreateExpenseFormData>();

  const accountId = watch("accountId");
  const currencySymbol =
    accountId === null
      ? undefined
      : currencies[accounts.accounts[accountId].currencyId]?.symbol;

  return (
    <div className="flex flex-col gap-6">
      <Input
        label="Title"
        placeholder="e.g. Bananas, Bread, ..."
        {...register("title")}
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
