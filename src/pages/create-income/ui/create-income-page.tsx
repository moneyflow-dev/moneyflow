import { Header } from "@widgets/header";

import { CreateIncomeForm } from "@features/create-income";
import { searchTransactionsByTitle } from "@features/search-transactions";

import { PageLayout } from "@shared/ui/layouts";

export const CreateIncomePage = () => {
  return (
    <PageLayout className="h-full">
      <Header title="Add Income" backButton />
      <CreateIncomeForm
        className="flex-1"
        searchTransactionsByTitle={searchTransactionsByTitle}
      />
    </PageLayout>
  );
};
