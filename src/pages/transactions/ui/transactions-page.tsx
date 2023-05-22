import { useRef } from "react";

import { CreateTransactionButton } from "@widgets/create-transaction-button";
import { Header } from "@widgets/header";
import { GroupedTransactionList } from "@widgets/transaction-list";

import { PageLayout } from "@shared/ui/layouts";

export const TransactionsPage = () => {
  const pageLayoutRef = useRef<HTMLDivElement | null>(null);

  return (
    <PageLayout ref={pageLayoutRef}>
      <Header title="Transactions" />
      <main className="pb-8">
        <GroupedTransactionList
          showEmptyState
          getScrollElement={() => pageLayoutRef.current}
        />
        <CreateTransactionButton />
      </main>
    </PageLayout>
  );
};
