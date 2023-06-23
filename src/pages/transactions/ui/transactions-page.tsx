import { useRef } from "react";
import { useSearchParams } from "react-router-dom";

import { CreateTransactionButton } from "@widgets/create-transaction-button";
import { Header } from "@widgets/header";
import { GroupedTransactionList } from "@widgets/transaction-list";

import { TransactionFiltersButton } from "@features/filter-transactions";

import { PageLayout } from "@shared/ui/layouts";

import { useTransactionFiltersStore } from "../model/store";

export const TransactionsPage = () => {
  const pageLayoutRef = useRef<HTMLDivElement | null>(null);
  const { filters, setTransactionFilters } = useTransactionFiltersStore();
  const [params, setParams] = useSearchParams({
    filtersModalIsOpen: "false",
  });
  const filtersModalIsOpenParam = params.get("filtersModalIsOpen") ?? "false";
  const filtersModalIsOpen = filtersModalIsOpenParam === "false" ? false : true;

  return (
    <PageLayout ref={pageLayoutRef}>
      <Header
        title="Transactions"
        rightActions={
          <TransactionFiltersButton
            isOpen={filtersModalIsOpen}
            onIsOpenChange={(value) =>
              setParams({ filtersModalIsOpen: value.toString() })
            }
            onChange={setTransactionFilters}
            defaultValue={filters}
          />
        }
      />
      <main className="pb-8">
        <GroupedTransactionList showEmptyState filters={filters} />
        <CreateTransactionButton />
      </main>
    </PageLayout>
  );
};
