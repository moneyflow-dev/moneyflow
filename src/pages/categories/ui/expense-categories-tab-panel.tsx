import { Tab as HeadlessTab } from "@headlessui/react";
import { twMerge } from "tailwind-merge";

import {
  ExpenseCategoryCardList,
  useExpenseCategoriesStore,
} from "@entities/category";

import { FloatingActionButton } from "@shared/ui/buttons";
import { PlusIcon } from "@shared/ui/icons";
import { Link } from "@shared/ui/links";

export const ExpenseCategoriesTabPanel = () => {
  const { expenseCategories } = useExpenseCategoriesStore();
  const rootCategories = Object.values(expenseCategories).filter(
    (category) => category.parentId === null,
  );

  return (
    <HeadlessTab.Panel>
      {rootCategories.length ? (
        <ExpenseCategoryCardList categories={rootCategories} />
      ) : (
        <p
          className={twMerge(
            "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[75%]",
            "text-center text-base/[1.75] font-medium text-subtext0 whitespace-pre-line",
          )}
        >
          You don’t have any expense categories yet. To add first tap add button
        </p>
      )}

      <Link
        to="/expense-categories/create"
        className="fixed bottom-20 left-1/2 -translate-x-1/2 z-10"
      >
        <FloatingActionButton>
          <PlusIcon size="lg" />
        </FloatingActionButton>
      </Link>
    </HeadlessTab.Panel>
  );
};
