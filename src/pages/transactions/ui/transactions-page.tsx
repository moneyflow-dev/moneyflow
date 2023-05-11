import { CreateTransactionButton } from "@widgets/create-transaction-button";
import { Header } from "@widgets/header";
import { GroupedTransactionList } from "@widgets/transaction-list";

import { PageLayout } from "@shared/ui/layouts";

export const TransactionsPage = () => {
  return (
    <PageLayout>
      <Header title="Transactions" />
      <main className="pb-16">
        <GroupedTransactionList />
        <CreateTransactionButton />
      </main>
    </PageLayout>
  );
};
