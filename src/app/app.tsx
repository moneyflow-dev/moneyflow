import { Capacitor } from "@capacitor/core";
import { StatusBar } from "@capacitor/status-bar";
import { NavigationBar } from "@hugotomazi/capacitor-navigation-bar";
import { useEffect } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { AccountOverviewPage } from "@pages/account-overview";
import { BalancesPage } from "@pages/balances";
import { CategoriesPage } from "@pages/categories";
import { CreateAccountPage } from "@pages/create-account";
import { CreateCurrencyPage } from "@pages/create-currency";
import { CreateExpenseCategoryPage } from "@pages/create-expense-category";
import { CreateIncomeCategoryPage } from "@pages/create-income-category";
import { CurrencyOverviewPage } from "@pages/currency-overview";
import { ExpenseCategoryOverviewPage } from "@pages/expense-category-overview";
import { IncomeCategoryOverviewPage } from "@pages/income-category-overview";
import { RootPage } from "@pages/root";
import { RootLayoutPage } from "@pages/root-layout";
import { SettingsPage } from "@pages/settings";

import { useLoadState } from "./hooks/use-load-state";

const router = createBrowserRouter([
  {
    element: <RootLayoutPage />,
    children: [
      { path: "/balances", element: <BalancesPage /> },
      {
        path: "/settings",
        element: <SettingsPage />,
      },
    ],
  },
  {
    path: "/",
    element: <RootPage />,
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
]);

export const App = () => {
  useLoadState();

  useEffect(() => {
    if (Capacitor.getPlatform() === "android") {
      StatusBar.setOverlaysWebView({ overlay: true });
      NavigationBar.setTransparency({ isTransparent: true });
    }
  }, []);
  return <RouterProvider router={router} />;
};
