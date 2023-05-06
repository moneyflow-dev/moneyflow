import { Link } from "@shared/ui/links";

import { ExpenseCategoryID } from "../model/models";

import { CategoryCard } from "./category-card";

export interface ExpenseCategoryCardCategory {
  id: ExpenseCategoryID;
  title: string;
}

interface ExpenseCategoryCardProps {
  category: ExpenseCategoryCardCategory;
  className?: string;
}

export const ExpenseCategoryCard = ({
  category,
  className,
}: ExpenseCategoryCardProps) => {
  return (
    <Link to={`/expense-categories/${category.id}`}>
      <CategoryCard className={className}>{category.title}</CategoryCard>
    </Link>
  );
};
