import { Controller, useFormContext } from "react-hook-form";
import { z } from "zod";

import { AccountID, AccountIcon, AccountPicker } from "@entities/account";
import { CurrencyID } from "@entities/currency";

import { positiveDecimalRegex } from "@shared/lib/regex";
import { ColorPickerColor } from "@shared/ui/color-pickers";
import { CalendarIcon } from "@shared/ui/icons";
import { Input } from "@shared/ui/inputs";

interface CreateTransferFormAccount {
  id: AccountID;
  title: string;
  color: ColorPickerColor;
  icon: AccountIcon;
  currencyId: CurrencyID;
}

export interface CreateTransferFormData {
  title: string;
  fromAccountId: AccountID | null;
  fromAccountAmount: string;
  toAccountId: AccountID | null;
  toAccountAmount: string;
  datetime: string;
}

interface CreateTransferFormFieldsetProps {
  accounts: {
    order: AccountID[];
    accounts: Record<AccountID, CreateTransferFormAccount>;
  };
  currencies: Record<CurrencyID, { symbol: string }>;
}

export const createTransferFormSchema = z.object({
  title: z.string(),
  fromAccountId: z.string(),
  fromAccountAmount: z.string().regex(positiveDecimalRegex),
  toAccountId: z.string(),
  toAccountAmount: z.string().regex(positiveDecimalRegex),
  datetime: z.string().nonempty(),
});

export const CreateTransferFormFieldset = ({
  accounts,
  currencies,
}: CreateTransferFormFieldsetProps) => {
  const { control, register, watch } = useFormContext<CreateTransferFormData>();

  const [fromAccountId, toAccountId] = watch(["fromAccountId", "toAccountId"]);
  const fromAccountCurrencySymbol =
    fromAccountId === null
      ? undefined
      : currencies[accounts.accounts[fromAccountId].currencyId]?.symbol;
  const toAccountCurrencySymbol =
    toAccountId === null
      ? undefined
      : currencies[accounts.accounts[toAccountId].currencyId]?.symbol;

  return (
    <div className="flex flex-col gap-6">
      <Input
        label="Title"
        placeholder="e.g. Withdraw cash, ..."
        {...register("title")}
      />
      <div className="flex flex-col gap-3">
        <h2 className="text-h2 text-text ms-4">From</h2>
        <Controller
          control={control}
          name="fromAccountId"
          render={({ field: { value, onChange } }) => (
            <AccountPicker
              accounts={accounts.order.map((accountId) => {
                const account = accounts.accounts[accountId];
                return {
                  ...account,
                  currencySymbol: currencies[account.currencyId].symbol,
                };
              })}
              value={value}
              onChange={onChange}
            />
          )}
        />
      </div>
      <Input
        label="Amount"
        placeholder="15.8"
        required
        type="number"
        leftAddon={fromAccountCurrencySymbol}
        {...register("fromAccountAmount")}
      />
      <div className="flex flex-col gap-3">
        <h2 className="text-h2 text-text ms-4">To</h2>
        <Controller
          control={control}
          name="toAccountId"
          render={({ field: { value, onChange } }) => (
            <AccountPicker
              accounts={accounts.order.map((accountId) => {
                const account = accounts.accounts[accountId];
                return {
                  ...account,
                  currencySymbol: currencies[account.currencyId].symbol,
                };
              })}
              value={value}
              onChange={onChange}
            />
          )}
        />
      </div>
      <Input
        label="Amount"
        placeholder="15.8"
        required
        type="number"
        leftAddon={toAccountCurrencySymbol}
        {...register("toAccountAmount")}
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
