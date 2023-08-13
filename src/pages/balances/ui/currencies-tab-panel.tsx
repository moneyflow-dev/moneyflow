import { Tab as HeadlessTab } from "@headlessui/react";

import { getCurrencyBalance } from "@features/statistics";

import { useAccountsStore } from "@entities/account";
import { CurrencyCard, useCurrenciesStore } from "@entities/currency";
import { useTransactions } from "@entities/transaction";

import { FloatingActionButton } from "@shared/ui/buttons";
import { PlusIcon } from "@shared/ui/icons";
import { Link } from "@shared/ui/links";

export const CurrenciesTabPanel = () => {
  const { currencies } = useCurrenciesStore();
  const { accounts } = useAccountsStore();
  const transactions = useTransactions();

  return (
    <HeadlessTab.Panel as="div" className="text-text flex flex-col gap-2.5">
      {currencies.order.map((id) => (
        <CurrencyCard
          key={id}
          currency={currencies.currencies[id]}
          balance={getCurrencyBalance(id, accounts, transactions)}
        />
      ))}
      <Link
        to="/currencies/create"
        className="fixed bottom-20 left-1/2 -translate-x-1/2 z-10"
      >
        <FloatingActionButton>
          <PlusIcon size="lg" />
        </FloatingActionButton>
      </Link>
    </HeadlessTab.Panel>
  );
};
