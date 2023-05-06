import { ReactNode } from "react";

export interface SettingCardGroupProps {
  title: string;
  children?: ReactNode;
}

export const SettingCardGroup = ({
  title,
  children,
}: SettingCardGroupProps) => {
  return (
    <div className="flex flex-col gap-1">
      <h2 className="text-h2 text-text ms-5">{title}</h2>
      <div className="flex flex-col">{children}</div>
    </div>
  );
};
