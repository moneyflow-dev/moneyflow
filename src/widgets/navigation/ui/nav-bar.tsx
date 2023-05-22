import {
  ListIcon,
  SettingsIcon,
  StatisticsIcon,
  WalletIcon,
} from "@shared/ui/icons";

import { NavBarLink } from "./nav-bar-link";

export const NavBar = () => {
  return (
    <nav className="grid grid-cols-4 justify-center px-[7.61%] w-full fixed bottom-0 bg-base-color">
      <NavBarLink to="/transactions">
        <ListIcon size="lg" />
      </NavBarLink>
      <NavBarLink to="/statistics">
        <StatisticsIcon size="lg" />
      </NavBarLink>
      <NavBarLink to="/balances">
        <WalletIcon size="lg" />
      </NavBarLink>
      <NavBarLink to="/settings">
        <SettingsIcon size="lg" />
      </NavBarLink>
    </nav>
  );
};
