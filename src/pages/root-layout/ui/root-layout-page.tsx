import { Outlet } from "react-router-dom";

import { NavBar } from "@widgets/navigation";

export const RootLayoutPage = () => {
  return (
    <div className="flex flex-col justify-between h-full">
      <Outlet />
      <NavBar />
    </div>
  );
};
