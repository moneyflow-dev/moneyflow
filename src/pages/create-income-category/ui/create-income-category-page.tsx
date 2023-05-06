import { useSearchParams } from "react-router-dom";

import { Header } from "@widgets/header";

import { CreateIncomeCategoryForm } from "@features/create-income-category";

import { PageLayout } from "@shared/ui/layouts";

export const CreateIncomeCategoryPage = () => {
  const [searchParams] = useSearchParams();
  const parentId = searchParams.get("parentId");

  return (
    <PageLayout className="h-full">
      <Header title="Add Income Category" backButton />
      <CreateIncomeCategoryForm parentId={parentId} className="flex-1" />
    </PageLayout>
  );
};
