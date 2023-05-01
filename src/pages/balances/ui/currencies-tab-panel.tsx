import { Tab as HeadlessTab } from "@headlessui/react";

import { CurrencyCard, useCurrenciesStore } from "@entities/currency";

import { FloatingActionButton } from "@shared/ui/buttons";
import { PlusIcon } from "@shared/ui/icons";
import { Link } from "@shared/ui/links";

export const CurrenciesTabPanel = () => {
  const { currencies } = useCurrenciesStore();

  return (
    <HeadlessTab.Panel as="div" className="text-text flex flex-col gap-2.5">
      {currencies.order.map((id) => (
        <CurrencyCard
          key={id}
          currency={currencies.currencies[id]}
          balance={"0"}
        />
      ))}
      <Link
        to="/currencies/create"
        className="absolute bottom-28 left-1/2 -translate-x-1/2"
      >
        <FloatingActionButton>
          <PlusIcon size="lg" />
        </FloatingActionButton>
      </Link>
    </HeadlessTab.Panel>
  );
};
