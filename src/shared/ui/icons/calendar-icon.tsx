import { twMerge } from "tailwind-merge";

import { iconSizeToClassName } from "./theme";
import { IconProps } from "./types";

export const CalendarIcon = ({ size, className }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      className={twMerge(iconSizeToClassName[size], className)}
    >
      <path d="M4 1V2H2.5C1.67188 2 1 2.67188 1 3.5V5H15V3.5C15 2.67188 14.3281 2 13.5 2H12V1C12 0.446875 11.5531 0 11 0C10.4469 0 10 0.446875 10 1V2H6V1C6 0.446875 5.55312 0 5 0C4.44688 0 4 0.446875 4 1ZM15 6H1V14.5C1 15.3281 1.67188 16 2.5 16H13.5C14.3281 16 15 15.3281 15 14.5V6Z" />
    </svg>
  );
};
