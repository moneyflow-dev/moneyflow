import { Tab as HeadlessTab } from "@headlessui/react";

import { Header } from "@widgets/header";

import { PageLayout } from "@shared/ui/layouts";
import { Tab, TabGroup, TabList } from "@shared/ui/tabs";

import { useCategoriesPageStore } from "../model/store";

import { ExpenseCategoriesTabPanel } from "./expense-categories-tab-panel";
import { IncomeCategoriesTabPanel } from "./income-categories-tab-panel";

export const CategoriesPage = () => {
  const { tab, onChangeTab } = useCategoriesPageStore();

  return (
    <PageLayout>
      <Header title="Categories" backButton />
      <main className="pb-44">
        <TabGroup selectedIndex={tab} onChange={onChangeTab}>
          <TabList label="Category type">
            <Tab>Expense</Tab>
            <Tab>Income</Tab>
          </TabList>
          <HeadlessTab.Panels>
            <ExpenseCategoriesTabPanel />
            <IncomeCategoriesTabPanel />
          </HeadlessTab.Panels>
        </TabGroup>
      </main>
    </PageLayout>
  );
};
