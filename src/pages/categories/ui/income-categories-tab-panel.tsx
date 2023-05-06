import { Tab as HeadlessTab } from "@headlessui/react";
import { twMerge } from "tailwind-merge";

import {
  IncomeCategoryCardList,
  useIncomeCategoriesStore,
} from "@entities/category";

import { FloatingActionButton } from "@shared/ui/buttons";
import { PlusIcon } from "@shared/ui/icons";
import { Link } from "@shared/ui/links";

export const IncomeCategoriesTabPanel = () => {
  const { incomeCategories } = useIncomeCategoriesStore();
  const rootCategories = Object.values(incomeCategories).filter(
    (category) => category.parentId === null,
  );

  return (
    <HeadlessTab.Panel>
      {rootCategories.length ? (
        <IncomeCategoryCardList categories={rootCategories} />
      ) : (
        <p
          className={twMerge(
            "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[75%]",
            "text-center text-base/[1.75] font-medium text-subtext0 whitespace-pre-line",
          )}
        >
          You don’t have any income categories yet. To add first tap add button
        </p>
      )}

      <Link
        to="/income-categories/create"
        className="absolute bottom-20 left-1/2 -translate-x-1/2"
      >
        <FloatingActionButton>
          <PlusIcon size="lg" />
        </FloatingActionButton>
      </Link>
    </HeadlessTab.Panel>
  );
};
