import { Outlet } from "react-router-dom";

import { NavBar } from "@widgets/navigation";

export const RootLayoutPage = () => {
  return (
    <div className="pb-26">
      <Outlet />
      <NavBar />
    </div>
  );
};
