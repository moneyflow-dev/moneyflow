import { twMerge } from "tailwind-merge";

import { Link, LinkProps } from "@shared/ui/links";

export const NavBarLink = ({ children, ...props }: LinkProps) => {
  return (
    <Link
      replace
      className={({ isActive }) =>
        twMerge(
          "flex justify-center items-center py-10 cursor-default transition-colors",
          isActive ? "text-lavender" : "text-overlay1 active:text-overlay2",
        )
      }
      {...props}
    >
      {children}
    </Link>
  );
};
