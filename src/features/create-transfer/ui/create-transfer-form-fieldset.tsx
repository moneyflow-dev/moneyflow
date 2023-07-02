import { Controller, useFormContext } from "react-hook-form";
import { z } from "zod";

import { AccountID, AccountIcon, AccountPicker } from "@entities/account";
import {
  CurrenciesMap,
  CurrencyID,
  createCurrencyAmountString,
} from "@entities/currency";
import {
  TransactionTitleAutocomplete,
  TransactionTitleAutocompleteProps,
  TransferID,
  Transfers,
  createTransferAmountString,
  sortTransactionsByDateTime,
} from "@entities/transaction";

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

export interface CreateTransferFormFieldsetProps
  extends Pick<TransactionTitleAutocompleteProps, "searchTransactionsByTitle"> {
  transfers: Transfers;
  accounts: {
    order: AccountID[];
    accounts: Record<AccountID, CreateTransferFormAccount>;
  };
  currencies: CurrenciesMap;
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
  transfers,
  accounts,
  currencies,
  searchTransactionsByTitle,
}: CreateTransferFormFieldsetProps) => {
  const { control, register, watch, reset } =
    useFormContext<CreateTransferFormData>();

  const [fromAccountId, toAccountId, title] = watch([
    "fromAccountId",
    "toAccountId",
    "title",
  ]);
  const fromAccountCurrencySymbol =
    fromAccountId === null
      ? undefined
      : currencies[accounts.accounts[fromAccountId].currencyId]?.symbol;
  const toAccountCurrencySymbol =
    toAccountId === null
      ? undefined
      : currencies[accounts.accounts[toAccountId].currencyId]?.symbol;
  const sortedTransfers = sortTransactionsByDateTime(Object.values(transfers));
  const formattedTransfers = sortedTransfers.map((transfer) => {
    const fromAccount = accounts.accounts[transfer.fromAccount.accountId];
    const fromCurrency = currencies[fromAccount.currencyId];
    const toAccount = accounts.accounts[transfer.toAccount.accountId];
    const toCurrency = currencies[toAccount.currencyId];
    return {
      ...transfer,
      formattedAmount: createTransferAmountString({
        fromAmount: createCurrencyAmountString({
          currency: fromCurrency,
          amount: transfer.fromAccount.amount,
        }),
        toAmount: createCurrencyAmountString({
          currency: toCurrency,
          amount: transfer.toAccount.amount,
        }),
        sameCurrencies: fromAccount.currencyId === toAccount.currencyId,
      }),
    };
  });

  const onSelectAutocompleteTransferId = (value: TransferID) => {
    const transfer = transfers[value];
    reset({
      title: transfer.title,
      fromAccountId: transfer.fromAccount.accountId,
      fromAccountAmount: transfer.fromAccount.amount,
      toAccountId: transfer.toAccount.accountId,
      toAccountAmount: transfer.toAccount.amount,
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <TransactionTitleAutocomplete
        transactions={formattedTransfers}
        title={title}
        amountColor="blue"
        inputProps={{
          label: "Title",
          placeholder: "e.g. Withdraw cash, ...",
          value: title,
          ...register("title"),
        }}
        searchTransactionsByTitle={searchTransactionsByTitle}
        onSelect={onSelectAutocompleteTransferId}
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
