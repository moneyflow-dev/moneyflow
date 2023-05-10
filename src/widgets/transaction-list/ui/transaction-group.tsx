import { useAccountsStore } from "@entities/account";
import {
  createCategoryString,
  useExpenseCategoriesStore,
} from "@entities/category";
import {
  createCurrencyAmountString,
  useCurrenciesStore,
} from "@entities/currency";
import { ExpenseCard } from "@entities/transaction";

import { createTransactionGroupDateString } from "../lib/date";
import { TransactionGroup } from "../lib/group";
import { TransactionType } from "../model/models";

interface TransactionListGroupProps {
  transactionGroup: TransactionGroup;
}

export const TransactionListGroup = ({
  transactionGroup,
}: TransactionListGroupProps) => {
  const { expenseCategories } = useExpenseCategoriesStore();
  const { accounts } = useAccountsStore();
  const {
    currencies: { currencies },
  } = useCurrenciesStore();
  const datetime = transactionGroup.datetime;
  const transactions = transactionGroup.transactions.sort(
    (a, b) => b.datetime.valueOf() - a.datetime.valueOf(),
  );

  return (
    <div key={datetime.valueOf()} className="flex flex-col gap-4">
      <span className="text-sm text-text font-medium">
        {createTransactionGroupDateString(datetime)}
      </span>
      <div className="flex flex-col gap-2.5">
        {transactions.map((transaction) => {
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
            default:
              throw new Error("Impossible transaction type");
          }
        })}
      </div>
    </div>
  );
};
