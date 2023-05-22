import { DateTime } from "luxon";
import { Virtuoso } from "react-virtuoso";
import { twMerge } from "tailwind-merge";

import {
  TransactionFilters,
  filterTransactions,
} from "@features/filter-transactions";

import { useAccountsStore } from "@entities/account";
import {
  useExpenseCategoriesStore,
  useIncomeCategoriesStore,
} from "@entities/category";
import { useTransactions } from "@entities/transaction";

import { groupTransactionsByDay } from "../lib/group";

import { TransactionListGroup } from "./transaction-group";

interface GroupedTransactionListProps {
  filters?: TransactionFilters;
  getScrollElement?(): Element | null;
  showEmptyState?: boolean;
}

export const GroupedTransactionList = ({
  filters = {},
  showEmptyState = false,
}: GroupedTransactionListProps) => {
  const { accounts } = useAccountsStore();
  const { expenseCategories } = useExpenseCategoriesStore();
  const { incomeCategories } = useIncomeCategoriesStore();
  const transactions = useTransactions();

  const filteredTransactions = filterTransactions(
    transactions,
    filters,
    accounts,
    expenseCategories,
    incomeCategories,
  );

  const transactionGroups = groupTransactionsByDay(filteredTransactions);

  return (
    <div>
      {transactionGroups.length ? (
        <Virtuoso
          useWindowScroll
          data={transactionGroups}
          itemContent={(_, transactionGroup) => (
            <TransactionListGroup
              className="pb-6 group-last:pb-0"
              transactionGroup={transactionGroup}
            />
          )}
        />
      ) : showEmptyState ? (
        <p
          className={twMerge(
            "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[75%]",
            "text-center text-base/[1.75] font-medium text-subtext0 whitespace-pre-line",
          )}
        >
          You don’t have any transactions yet. To add first tap add button
        </p>
      ) : null}
    </div>
  );
};
