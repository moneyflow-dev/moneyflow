import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { twMerge } from "tailwind-merge";

import { Header } from "@widgets/header";

import {
  TransactionFiltersButton,
  filterTransactions,
} from "@features/filter-transactions";
import {
  CategoriesStatisticsSection,
  CurrencyTotalCard,
  getCurrenciesStatistics,
} from "@features/statistics";

import { useAccountsStore } from "@entities/account";
import {
  useExpenseCategoriesStore,
  useIncomeCategoriesStore,
} from "@entities/category";
import { useCurrenciesStore } from "@entities/currency";
import { useTransactions } from "@entities/transaction";

import { Divider } from "@shared/ui/dividers";
import { PageLayout } from "@shared/ui/layouts";

import { useStatisticsFiltersStore } from "../model/store";

export const StatisticsPage = () => {
  const { filters, setStatisticsFilters } = useStatisticsFiltersStore();
  const [params, setParams] = useSearchParams({
    filtersModalIsOpen: "false",
  });
  const filtersModalIsOpenParam = params.get("filtersModalIsOpen") ?? "false";
  const filtersModalIsOpen = filtersModalIsOpenParam === "true";

  const {
    currencies: { order: currenciesOrder, currencies },
  } = useCurrenciesStore((state) => ({
    currencies: state.currencies,
  }));
  const { accounts } = useAccountsStore((state) => ({
    accounts: state.accounts,
  }));
  const { expenseCategories } = useExpenseCategoriesStore((state) => ({
    expenseCategories: state.expenseCategories,
  }));
  const { incomeCategories } = useIncomeCategoriesStore((state) => ({
    incomeCategories: state.incomeCategories,
  }));
  const transactions = useTransactions();
  const filteredTransactions = useMemo(
    () =>
      filterTransactions(
        transactions,
        filters,
        accounts,
        expenseCategories,
        incomeCategories,
      ),
    [transactions, filters, accounts, expenseCategories, incomeCategories],
  );
  const statistics = useMemo(
    () =>
      getCurrenciesStatistics(
        accounts,
        expenseCategories,
        incomeCategories,
        filteredTransactions,
      ),
    [accounts, expenseCategories, incomeCategories, filteredTransactions],
  );

  const fromDateString = filters.fromDateTimeRange?.toLocaleString({
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  const toDateString = filters.toDateTimeRange?.toLocaleString({
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  let dateRangeString: string;
  if (fromDateString && toDateString) {
    dateRangeString = `${fromDateString} - ${toDateString}`;
  } else if (fromDateString) {
    dateRangeString = `From ${fromDateString}`;
  } else if (toDateString) {
    dateRangeString = `To ${toDateString}`;
  } else {
    dateRangeString = "All time";
  }

  return (
    <PageLayout>
      <Header
        title="Statistics"
        rightActions={
          <TransactionFiltersButton
            isOpen={filtersModalIsOpen}
            onIsOpenChange={(value) =>
              setParams({ filtersModalIsOpen: value.toString() })
            }
            onChange={setStatisticsFilters}
            defaultValue={filters}
          />
        }
      />
      {filteredTransactions.length ? (
        <main className="flex flex-col gap-4">
          {currenciesOrder.map((currencyId) => {
            if (!(currencyId in statistics)) {
              return null;
            }

            const currencyStatistics = statistics[currencyId];

            if (
              currencyStatistics.expenseAmount === "0" &&
              currencyStatistics.incomeAmount === "0"
            ) {
              return null;
            }

            const currency = currencies[currencyId];

            return (
              <div key={currency.id} className="flex flex-col gap-4 group">
                <span className="text-sm text-subtext0 font-medium ">
                  {dateRangeString}
                </span>
                <div className="flex flex-col gap-6">
                  <div className="grid grid-cols-2 gap-4">
                    <CurrencyTotalCard
                      type="expense"
                      currency={currency}
                      amount={currencyStatistics.expenseAmount}
                    />
                    <CurrencyTotalCard
                      type="income"
                      currency={currency}
                      amount={currencyStatistics.incomeAmount}
                    />
                  </div>
                  {currencyStatistics.expenseRootCategories.categories
                    .length ? (
                    <CategoriesStatisticsSection
                      categoryType="expense"
                      totalAmount={
                        currencyStatistics.expenseRootCategories.totalAmount
                      }
                      currency={currency}
                      categories={currencyStatistics.expenseRootCategories.categories.map(
                        (category) => ({
                          id: category.categoryId,
                          amount: category.amount,
                          percentage: category.percentage,
                          title: expenseCategories[category.categoryId].title,
                        }),
                      )}
                    />
                  ) : null}
                  {currencyStatistics.incomeRootCategories.categories.length ? (
                    <CategoriesStatisticsSection
                      categoryType="income"
                      totalAmount={
                        currencyStatistics.incomeRootCategories.totalAmount
                      }
                      currency={currency}
                      categories={currencyStatistics.incomeRootCategories.categories.map(
                        (category) => ({
                          id: category.categoryId,
                          amount: category.amount,
                          percentage: category.percentage,
                          title: incomeCategories[category.categoryId].title,
                        }),
                      )}
                    />
                  ) : null}
                </div>
                <Divider className="group-last:hidden" />
              </div>
            );
          })}
        </main>
      ) : (
        <p
          className={twMerge(
            "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[75%]",
            "text-center text-base/[1.75] font-medium text-subtext0 whitespace-pre-line",
          )}
        >
          There is no transactions for selected filters
        </p>
      )}
    </PageLayout>
  );
};
