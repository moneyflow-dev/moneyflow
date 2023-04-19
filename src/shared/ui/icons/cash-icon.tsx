import { twMerge } from "tailwind-merge";

import { iconSizeToClassName } from "./theme";
import { IconProps } from "./types";

export const CashIcon = ({ size, className }: IconProps) => {
  return (
    <svg
      viewBox="0 0 16 16"
      className={twMerge(iconSizeToClassName[size], className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M1.875 2.75C0.909766 2.75 0.125 3.53477 0.125 4.5V11.5C0.125 12.4652 0.909766 13.25 1.875 13.25H14.125C15.0902 13.25 15.875 12.4652 15.875 11.5V4.5C15.875 3.53477 15.0902 2.75 14.125 2.75H1.875ZM3.625 11.5H1.875V9.75C2.84023 9.75 3.625 10.5348 3.625 11.5ZM1.875 6.25V4.5H3.625C3.625 5.46523 2.84023 6.25 1.875 6.25ZM12.375 11.5C12.375 10.5348 13.1598 9.75 14.125 9.75V11.5H12.375ZM14.125 6.25C13.1598 6.25 12.375 5.46523 12.375 4.5H14.125V6.25ZM8 10.625C6.55078 10.625 5.375 9.44922 5.375 8C5.375 6.55078 6.55078 5.375 8 5.375C9.44922 5.375 10.625 6.55078 10.625 8C10.625 9.44922 9.44922 10.625 8 10.625Z" />
    </svg>
  );
};
