import { Tab as HeadlessTab } from "@headlessui/react";
import { twMerge } from "tailwind-merge";

import { getAccountBalance } from "@features/statistics";

import { AccountCardList, useAccountsStore } from "@entities/account";
import {
  createCurrencyAmountString,
  useCurrenciesStore,
} from "@entities/currency";
import { useTransactions } from "@entities/transaction";

import { FloatingActionButton } from "@shared/ui/buttons";
import { PlusIcon } from "@shared/ui/icons";
import { Link } from "@shared/ui/links";

export const AccountsTabPanel = () => {
  const { order, accounts } = useAccountsStore();
  const {
    currencies: { currencies },
  } = useCurrenciesStore();
  const transactions = useTransactions();

  return (
    <HeadlessTab.Panel as="div" className="text-text">
      {order.length ? (
        <AccountCardList
          accounts={order.map((accountId) => {
            const account = accounts[accountId];
            return {
              account,
              formattedBalance: createCurrencyAmountString({
                currency: currencies[account.currencyId],
                amount: getAccountBalance(
                  accountId,
                  account.initialBalance,
                  transactions,
                ),
              }),
            };
          })}
        />
      ) : (
        <p
          className={twMerge(
            "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[75%]",
            "text-center text-base/[1.75] font-medium text-subtext0 whitespace-pre-line",
          )}
        >
          You don’t have any accounts yet. To add first tap add button
        </p>
      )}
      <Link
        to="/accounts/create"
        className="fixed bottom-20 left-1/2 -translate-x-1/2 z-10"
      >
        <FloatingActionButton>
          <PlusIcon size="lg" />
        </FloatingActionButton>
      </Link>
    </HeadlessTab.Panel>
  );
};
