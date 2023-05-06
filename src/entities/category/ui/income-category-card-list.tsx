import { twMerge } from "tailwind-merge";

import {
  IncomeCategoryCard,
  IncomeCategoryCardCategory,
} from "./income-category-card";

interface IncomeCategoryCardListProps {
  categories: IncomeCategoryCardCategory[];
  className?: string;
}

export const IncomeCategoryCardList = ({
  categories,
  className,
}: IncomeCategoryCardListProps) => {
  return (
    <div className={twMerge("flex flex-col gap-4", className)}>
      {categories.map((category) => (
        <IncomeCategoryCard key={category.id} category={category} />
      ))}
    </div>
  );
};
