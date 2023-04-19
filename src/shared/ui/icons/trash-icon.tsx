import { twMerge } from "tailwind-merge";

import { iconSizeToClassName } from "./theme";
import { IconProps } from "./types";

export const TrashIcon = ({ size, className }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      className={twMerge(iconSizeToClassName[size], className)}
    >
      <path d="M5.225 0.553125L5 1H2C1.44687 1 1 1.44687 1 2C1 2.55312 1.44687 3 2 3H14C14.5531 3 15 2.55312 15 2C15 1.44687 14.5531 1 14 1H11L10.775 0.553125C10.6062 0.2125 10.2594 0 9.88125 0H6.11875C5.74062 0 5.39375 0.2125 5.225 0.553125ZM14 4H2L2.6625 14.5938C2.7125 15.3844 3.36875 16 4.15937 16H11.8406C12.6312 16 13.2875 15.3844 13.3375 14.5938L14 4Z" />
    </svg>
  );
};
