import { twMerge } from "tailwind-merge";

import { iconSizeToClassName } from "./theme";
import { IconProps } from "./types";

export const DownArrowIcon = ({ size, className }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      className={twMerge(iconSizeToClassName[size], className)}
    >
      <path d="M7.26475 15.6652C7.67044 16.1116 8.32927 16.1116 8.73496 15.6652L13.9277 9.95055C14.3334 9.5041 14.3334 8.77906 13.9277 8.33261C13.522 7.88615 12.8632 7.88615 12.4575 8.33261L9.03679 12.1007V1.14292C9.03679 0.510743 8.57268 0 7.99823 0C7.42378 0 6.95968 0.510743 6.95968 1.14292V12.0971L3.53893 8.33618C3.13325 7.88973 2.47442 7.88973 2.06873 8.33618C1.66304 8.78263 1.66304 9.50767 2.06873 9.95413L7.26151 15.6687L7.26475 15.6652Z" />
    </svg>
  );
};
