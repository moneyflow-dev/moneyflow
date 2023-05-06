import { useSearchParams } from "react-router-dom";

import { Header } from "@widgets/header";

import { CreateExpenseCategoryForm } from "@features/create-expense-category";

import { PageLayout } from "@shared/ui/layouts";

export const CreateExpenseCategoryPage = () => {
  const [searchParams] = useSearchParams();
  const parentId = searchParams.get("parentId");

  return (
    <PageLayout className="h-full">
      <Header title="Add Expense Category" backButton />
      <CreateExpenseCategoryForm parentId={parentId} className="flex-1" />
    </PageLayout>
  );
};
