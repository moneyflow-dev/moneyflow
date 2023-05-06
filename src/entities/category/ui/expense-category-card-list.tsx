import { twMerge } from "tailwind-merge";

import {
  ExpenseCategoryCard,
  ExpenseCategoryCardCategory,
} from "./expense-category-card";

interface ExpenseCategoryCardListProps {
  categories: ExpenseCategoryCardCategory[];
  className?: string;
}

export const ExpenseCategoryCardList = ({
  categories,
  className,
}: ExpenseCategoryCardListProps) => {
  return (
    <div className={twMerge("flex flex-col gap-4", className)}>
      {categories.map((category) => (
        <ExpenseCategoryCard key={category.id} category={category} />
      ))}
    </div>
  );
};
