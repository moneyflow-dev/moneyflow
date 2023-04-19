import { twMerge } from "tailwind-merge";

import { iconSizeToClassName } from "./theme";
import { IconProps } from "./types";

export const CheckIcon = ({ size, className }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      className={twMerge(iconSizeToClassName[size], className)}
    >
      <path d="M15.6652 2.62047C16.1116 3.06683 16.1116 3.79172 15.6652 4.23808L6.52338 13.3795C6.077 13.8259 5.35208 13.8259 4.9057 13.3795L0.334784 8.80879C-0.111595 8.36244 -0.111595 7.63755 0.334784 7.19119C0.781163 6.74483 1.50608 6.74483 1.95246 7.19119L5.71633 10.9513L14.0511 2.62047C14.4975 2.17412 15.2224 2.17412 15.6688 2.62047H15.6652Z" />
    </svg>
  );
};
