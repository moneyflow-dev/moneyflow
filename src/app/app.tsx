import { Capacitor } from "@capacitor/core";
import { StatusBar } from "@capacitor/status-bar";
import { NavigationBar } from "@hugotomazi/capacitor-navigation-bar";
import { useEffect } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { BalancesPage } from "@pages/balances";
import { CreateAccountPage } from "@pages/create-account";
import { CreateCurrencyPage } from "@pages/create-currency";
import { CurrencyOverviewPage } from "@pages/currency-overview";
import { RootLayoutPage } from "@pages/root-layout";

import { useLoadState } from "./hooks/use-load-state";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayoutPage />,
    children: [{ path: "/balances", element: <BalancesPage /> }],
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
    path: "/accounts/create",
    element: <CreateAccountPage />,
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
