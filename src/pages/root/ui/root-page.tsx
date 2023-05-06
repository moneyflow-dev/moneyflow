import { App as AppPlugin } from "@capacitor/app";
import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export const RootPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    AppPlugin.addListener("backButton", ({ canGoBack }) => {
      if (!canGoBack) {
        AppPlugin.minimizeApp();
      } else {
        navigate(-1);
      }
    });
    return () => {
      AppPlugin.removeAllListeners();
    };
  }, [navigate]);

  return <Navigate to="/balances" replace />;
};
