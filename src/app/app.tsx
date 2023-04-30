import { Capacitor } from "@capacitor/core";
import { StatusBar } from "@capacitor/status-bar";
import { NavigationBar } from "@hugotomazi/capacitor-navigation-bar";
import { useEffect } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { BalancesPage } from "@pages/balances";
import { RootLayoutPage } from "@pages/root-layout";

const router = createBrowserRouter([
  {
    element: <RootLayoutPage />,
    children: [{ path: "/balances", element: <BalancesPage /> }],
  },
]);

export const App = () => {
  useEffect(() => {
    if (Capacitor.getPlatform() === "android") {
      StatusBar.setOverlaysWebView({ overlay: true });
      NavigationBar.setTransparency({ isTransparent: true });
    }
  }, []);
  return <RouterProvider router={router} />;
};
