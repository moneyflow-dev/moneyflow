import { Tab as HeadlessTab } from "@headlessui/react";

import { Header } from "@widgets/header";

import { PageLayout } from "@shared/ui/layouts";
import { Tab, TabGroup, TabList } from "@shared/ui/tabs";

import { CurrenciesTabPanel } from "./currencies-tab-panel";

export const BalancesPage = () => {
  return (
    <PageLayout>
      <Header title="Balances" />
      <TabGroup>
        <TabList label="Group By">
          <Tab>Currencies</Tab>
        </TabList>
        <HeadlessTab.Panels>
          <CurrenciesTabPanel />
        </HeadlessTab.Panels>
      </TabGroup>
    </PageLayout>
  );
};
