import { Tab as HeadlessTab } from "@headlessui/react";

import { Header } from "@widgets/header";

import { PageLayout } from "@shared/ui/layouts";
import { Tab, TabGroup, TabList } from "@shared/ui/tabs";

import { useCategoriesPageStore } from "../model/store";

import { ExpenseCategoriesTabPanel } from "./expense-categories-tab-panel";

export const CategoriesPage = () => {
  const { tab, onChangeTab } = useCategoriesPageStore();

  return (
    <PageLayout>
      <Header title="Categories" backButton />
      <main>
        <TabGroup selectedIndex={tab} onChange={onChangeTab}>
          <TabList label="Category type">
            <Tab>Expense</Tab>
          </TabList>
          <HeadlessTab.Panels>
            <ExpenseCategoriesTabPanel />
          </HeadlessTab.Panels>
        </TabGroup>
      </main>
    </PageLayout>
  );
};
