import { App as AppPlugin } from "@capacitor/app";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import {
  BackButtonHandler,
  useBackButtonContext,
} from "@shared/lib/back-button-context";

export const RootPage = () => {
  const navigate = useNavigate();
  const { register, unregister } = useBackButtonContext();

  useEffect(() => {
    const handler: BackButtonHandler = ({ canGoBack }) => {
      if (!canGoBack) {
        AppPlugin.minimizeApp();
      } else {
        navigate(-1);
      }
    };
    register(handler, 0);

    return () => unregister(handler);
  }, [navigate, register, unregister]);

  return <Outlet />;
};
