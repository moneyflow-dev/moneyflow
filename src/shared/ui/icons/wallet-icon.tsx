import { twMerge } from "tailwind-merge";

import { iconSizeToClassName } from "./theme";
import { IconProps } from "./types";

export const WalletIcon = ({ size, className }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      className={twMerge(iconSizeToClassName[size], className)}
    >
      <path d="M2 1C0.896875 1 0 1.89688 0 3V13C0 14.1031 0.896875 15 2 15H14C15.1031 15 16 14.1031 16 13V6C16 4.89688 15.1031 4 14 4H2.5C2.225 4 2 3.775 2 3.5C2 3.225 2.225 3 2.5 3H14C14.5531 3 15 2.55313 15 2C15 1.44687 14.5531 1 14 1H2ZM13 10.5C12.4469 10.5 12 10.0531 12 9.5C12 8.94687 12.4469 8.5 13 8.5C13.5531 8.5 14 8.94687 14 9.5C14 10.0531 13.5531 10.5 13 10.5Z" />
    </svg>
  );
};
