import { twMerge } from "tailwind-merge";

import { useAccountsStore } from "@entities/account";
import {
  createCategoryString,
  useExpenseCategoriesStore,
  useIncomeCategoriesStore,
} from "@entities/category";
import {
  createCurrencyAmountString,
  useCurrenciesStore,
} from "@entities/currency";
import {
  ExpenseCard,
  IncomeCard,
  TransferCard,
  TransactionType,
  Transaction,
  sortTransactionsByDateTime,
} from "@entities/transaction";

import { createTransactionGroupDateString } from "../lib/date";
import { TransactionGroup } from "../lib/group";

interface TransactionListGroupProps {
  transactionGroup: TransactionGroup;
  className?: string;
}

export const TransactionListGroup = ({
  transactionGroup,
  className,
}: TransactionListGroupProps) => {
  const { expenseCategories } = useExpenseCategoriesStore();
  const { incomeCategories } = useIncomeCategoriesStore();
  const { accounts } = useAccountsStore();
  const {
    currencies: { currencies },
  } = useCurrenciesStore();
  const datetime = transactionGroup.datetime;
  const transactions = sortTransactionsByDateTime(
    transactionGroup.transactions,
  );

  const renderTransaction = (transaction: Transaction) => {
    switch (transaction.type) {
      case TransactionType.expense: {
        const account = accounts[transaction.accountId];
        const currency = currencies[account.currencyId];
        return (
          <ExpenseCard
            key={transaction.id}
            expense={{
              ...transaction,
              formattedAmount: createCurrencyAmountString({
                currency,
                amount: transaction.amount,
              }),
              categoryTitle: createCategoryString(
                expenseCategories,
                transaction.categoryId,
              ),
              accountTitle: account.title,
              time: transaction.datetime.toFormat("T"),
            }}
          />
        );
      }
      case TransactionType.income: {
        const account = accounts[transaction.accountId];
        const currency = currencies[account.currencyId];
        return (
          <IncomeCard
            key={transaction.id}
            income={{
              ...transaction,
              formattedAmount: createCurrencyAmountString({
                currency,
                amount: transaction.amount,
              }),
              categoryTitle: createCategoryString(
                incomeCategories,
                transaction.categoryId,
              ),
              accountTitle: account.title,
              time: transaction.datetime.toFormat("T"),
            }}
          />
        );
      }
      case TransactionType.transfer: {
        const fromAccount = accounts[transaction.fromAccount.accountId];
        const fromAccountCurrency = currencies[fromAccount.currencyId];
        const toAccount = accounts[transaction.toAccount.accountId];
        const toAccountCurrency = currencies[toAccount.currencyId];

        return (
          <TransferCard
            key={transaction.id}
            transfer={{
              id: transaction.id,
              title: transaction.title,
              fromAccount: {
                accountTitle: fromAccount.title,
                amount: createCurrencyAmountString({
                  currency: fromAccountCurrency,
                  amount: transaction.fromAccount.amount,
                }),
              },
              toAccount: {
                accountTitle: toAccount.title,
                amount: createCurrencyAmountString({
                  currency: toAccountCurrency,
                  amount: transaction.toAccount.amount,
                }),
              },
              sameCurrencies: fromAccountCurrency.id === toAccountCurrency.id,
              time: transaction.datetime.toFormat("T"),
            }}
          />
        );
      }
      default:
        throw new Error("Impossible transaction type");
    }
  };

  return (
    <div className={twMerge("flex flex-col gap-4", className)}>
      <span className="text-sm text-text font-medium">
        {createTransactionGroupDateString(datetime)}
      </span>
      <div className="flex flex-col gap-2.5">
        {transactions.map(renderTransaction)}
      </div>
    </div>
  );
};
