import { useRef } from "react";
import { useSearchParams } from "react-router-dom";

import { CreateTransactionButton } from "@widgets/create-transaction-button";
import { Header } from "@widgets/header";
import { GroupedTransactionList } from "@widgets/transaction-list";

import { TransactionFiltersButton } from "@features/filter-transactions";
import { TransactionsSearchBar } from "@features/search-transactions";

import { PageLayout } from "@shared/ui/layouts";

import { useTransactionFiltersStore } from "../model/store";

export const TransactionsPage = () => {
  const pageLayoutRef = useRef<HTMLDivElement | null>(null);
  const { filters, searchTerm, setSearchTerm, setTransactionFilters } =
    useTransactionFiltersStore();
  const [params, setParams] = useSearchParams({
    filtersModalIsOpen: "false",
  });
  const filtersModalIsOpenParam = params.get("filtersModalIsOpen") ?? "false";
  const filtersModalIsOpen = filtersModalIsOpenParam === "true";

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
      <main className="flex flex-col gap-4 pb-8">
        <TransactionsSearchBar value={searchTerm} onChange={setSearchTerm} />
        <GroupedTransactionList
          showEmptyState
          filters={filters}
          searchTerm={searchTerm}
        />
        <CreateTransactionButton />
      </main>
    </PageLayout>
  );
};
