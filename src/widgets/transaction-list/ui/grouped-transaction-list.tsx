import { twMerge } from "tailwind-merge";

import {
  useExpensesStore,
  useIncomesStore,
  useTransfersStore,
} from "@entities/transaction";

import { groupTransactionsByDay } from "../lib/group";
import {
  TransactionListExpense,
  TransactionListIncome,
  TransactionListTransfer,
  TransactionType,
} from "../model/models";

import { TransactionListGroup } from "./transaction-group";

export const GroupedTransactionList = () => {
  const { expenses } = useExpensesStore();
  const expenseTransactions: TransactionListExpense[] = Object.values(
    expenses,
  ).map((expense) => ({ ...expense, type: TransactionType.expense }));
  const { incomes } = useIncomesStore();
  const incomeTransactions: TransactionListIncome[] = Object.values(
    incomes,
  ).map((income) => ({ ...income, type: TransactionType.income }));
  const { transfers } = useTransfersStore();
  const transferTransactions: TransactionListTransfer[] = Object.values(
    transfers,
  ).map((transfer) => ({ ...transfer, type: TransactionType.transfer }));

  const transactions = [
    ...expenseTransactions,
    ...incomeTransactions,
    ...transferTransactions,
  ];

  const transactionGroups = groupTransactionsByDay(transactions);

  return (
    <div className="flex flex-col gap-6">
      {transactionGroups.length ? (
        transactionGroups.map((transactionGroup) => (
          <TransactionListGroup
            key={transactionGroup.datetime.valueOf()}
            transactionGroup={transactionGroup}
          />
        ))
      ) : (
        <p
          className={twMerge(
            "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[75%]",
            "text-center text-base/[1.75] font-medium text-subtext0 whitespace-pre-line",
          )}
        >
          You don’t have any transactions yet. To add first tap add button
        </p>
      )}
    </div>
  );
};
