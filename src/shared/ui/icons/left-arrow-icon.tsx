import { twMerge } from "tailwind-merge";

import { iconSizeToClassName } from "./theme";
import { IconProps } from "./types";

export const LeftArrowIcon = ({ size, className }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      className={twMerge(iconSizeToClassName[size], className)}
    >
      <path d="M0.33484 7.19285C-0.111613 7.63927 -0.111613 8.36427 0.33484 8.8107L6.04944 14.525C6.4959 14.9714 7.22094 14.9714 7.66739 14.525C8.11384 14.0786 8.11384 13.3536 7.66739 12.9071L3.89932 9.14285H14.8571C15.4893 9.14285 16 8.63213 16 7.99999C16 7.36785 15.4893 6.85713 14.8571 6.85713H3.9029L7.66382 3.09285C8.11027 2.64642 8.11027 1.92142 7.66382 1.47499C7.21737 1.02856 6.49233 1.02856 6.04587 1.47499L0.331268 7.18927L0.33484 7.19285Z" />
    </svg>
  );
};
