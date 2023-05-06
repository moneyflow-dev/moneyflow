import { Link } from "@shared/ui/links";

import { IncomeCategoryID } from "../model/models";

import { CategoryCard } from "./category-card";

export interface IncomeCategoryCardCategory {
  id: IncomeCategoryID;
  title: string;
}

interface IncomeCategoryCardProps {
  category: IncomeCategoryCardCategory;
  className?: string;
}

export const IncomeCategoryCard = ({
  category,
  className,
}: IncomeCategoryCardProps) => {
  return (
    <Link to={`/income-categories/${category.id}`}>
      <CategoryCard className={className}>{category.title}</CategoryCard>
    </Link>
  );
};
