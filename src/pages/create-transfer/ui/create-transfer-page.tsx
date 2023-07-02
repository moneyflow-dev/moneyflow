import { Header } from "@widgets/header";

import { CreateTransferForm } from "@features/create-transfer";
import { searchTransactionsByTitle } from "@features/search-transactions";

import { PageLayout } from "@shared/ui/layouts";

export const CreateTransferPage = () => {
  return (
    <PageLayout className="h-full">
      <Header title="Add Transfer" backButton />
      <CreateTransferForm
        className="flex-1"
        searchTransactionsByTitle={searchTransactionsByTitle}
      />
    </PageLayout>
  );
};
