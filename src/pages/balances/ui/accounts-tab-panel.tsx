import { Tab as HeadlessTab } from "@headlessui/react";

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
