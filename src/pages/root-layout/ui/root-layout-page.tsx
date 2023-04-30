import { App as AppPlugin } from "@capacitor/app";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { NavBar } from "@widgets/navigation";

export const RootLayoutPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    AppPlugin.addListener("backButton", ({ canGoBack }) => {
      if (!canGoBack) {
        AppPlugin.minimizeApp();
      }
      navigate(-1);
    });
    navigate("/balances");
  }, [navigate]);

  return (
    <div className="flex flex-col justify-between h-full">
      <Outlet />
      <NavBar />
    </div>
  );
};
