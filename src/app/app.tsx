import { Capacitor } from "@capacitor/core";
import { StatusBar } from "@capacitor/status-bar";
import { NavigationBar } from "@hugotomazi/capacitor-navigation-bar";
import { useEffect } from "react";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

import { AccountOverviewPage } from "@pages/account-overview";
import { BalancesPage } from "@pages/balances";
import { CategoriesPage } from "@pages/categories";
import { CreateAccountPage } from "@pages/create-account";
import { CreateCurrencyPage } from "@pages/create-currency";
import { CreateExpensePage } from "@pages/create-expense";
import { CreateExpenseCategoryPage } from "@pages/create-expense-category";
import { CreateIncomePage } from "@pages/create-income";
import { CreateIncomeCategoryPage } from "@pages/create-income-category";
import { CreateTransferPage } from "@pages/create-transfer";
import { CurrencyOverviewPage } from "@pages/currency-overview";
import { ExpenseCategoryOverviewPage } from "@pages/expense-category-overview";
import { ExpenseOverviewPage } from "@pages/expense-overview";
import { IncomeCategoryOverviewPage } from "@pages/income-category-overview";
import { IncomeOverviewPage } from "@pages/income-overview";
import { RootPage } from "@pages/root";
import { RootLayoutPage } from "@pages/root-layout";
import { SettingsPage } from "@pages/settings";
import { StatisticsPage } from "@pages/statistics";
import { TransactionsPage } from "@pages/transactions";
import { TransferOverviewPage } from "@pages/transfer-overview";

import { NotificationsScheduler } from "@features/notifications";

import { BackButtonContextProvider } from "@shared/lib/back-button-context";

import { useLoadState } from "./hooks/use-load-state";

const router = createBrowserRouter([
  {
    element: <RootPage />,
    children: [
      {
        element: <RootLayoutPage />,
        children: [
          { path: "/transactions", element: <TransactionsPage /> },
          { path: "/statistics", element: <StatisticsPage /> },
          { path: "/balances", element: <BalancesPage /> },
          {
            path: "/settings",
            element: <SettingsPage />,
          },
        ],
      },
      {
        path: "/",
        element: <Navigate to="/transactions" replace />,
      },
      {
        path: "/currencies/:id",
        element: <CurrencyOverviewPage />,
      },
      {
        path: "/currencies/create",
        element: <CreateCurrencyPage />,
      },
      {
        path: "/accounts/:id",
        element: <AccountOverviewPage />,
      },
      {
        path: "/accounts/create",
        element: <CreateAccountPage />,
      },
      {
        path: "/categories",
        element: <CategoriesPage />,
      },
      {
        path: "/expense-categories/create",
        element: <CreateExpenseCategoryPage />,
      },
      {
        path: "/expense-categories/:id",
        element: <ExpenseCategoryOverviewPage />,
      },
      {
        path: "/income-categories/create",
        element: <CreateIncomeCategoryPage />,
      },
      {
        path: "/income-categories/:id",
        element: <IncomeCategoryOverviewPage />,
      },
      {
        path: "/expenses/create",
        element: <CreateExpensePage />,
      },
      {
        path: "/expenses/:id",
        element: <ExpenseOverviewPage />,
      },
      {
        path: "/incomes/create",
        element: <CreateIncomePage />,
      },
      {
        path: "/incomes/:id",
        element: <IncomeOverviewPage />,
      },
      {
        path: "/transfers/create",
        element: <CreateTransferPage />,
      },
      {
        path: "/transfers/:id",
        element: <TransferOverviewPage />,
      },
    ],
  },
]);

export const App = () => {
  useLoadState();

  useEffect(() => {
    if (Capacitor.getPlatform() === "android") {
      StatusBar.setBackgroundColor({ color: "#24273a" });
      NavigationBar.setColor({ color: "#24273a" });
    }
  }, []);
  return (
    <BackButtonContextProvider>
      <RouterProvider router={router} />
      <NotificationsScheduler />
    </BackButtonContextProvider>
  );
};
