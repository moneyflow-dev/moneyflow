import { Tab as HeadlessTab } from "@headlessui/react";

import { Header } from "@widgets/header";

import { PageLayout } from "@shared/ui/layouts";
import { Tab, TabGroup, TabList } from "@shared/ui/tabs";

import { useBalancesPageStore } from "../model/store";

import { AccountsTabPanel } from "./accounts-tab-panel";
import { CurrenciesTabPanel } from "./currencies-tab-panel";

export const BalancesPage = () => {
  const { tab, onChangeTab } = useBalancesPageStore();
  return (
    <PageLayout>
      <Header title="Balances" />
      <TabGroup selectedIndex={tab} onChange={onChangeTab}>
        <TabList label="Group By">
          <Tab>Accounts</Tab>
          <Tab>Currencies</Tab>
        </TabList>
        <HeadlessTab.Panels>
          <AccountsTabPanel />
          <CurrenciesTabPanel />
        </HeadlessTab.Panels>
      </TabGroup>
    </PageLayout>
  );
};
