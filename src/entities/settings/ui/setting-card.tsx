import { ReactNode } from "react";

export interface SettingCardProps {
  title: string;
  description: string;
  icon?: ReactNode;
  rightAction?: ReactNode;
  onClick?(): void;
}

export const SettingCard = ({
  icon,
  title,
  description,
  rightAction,
  onClick,
}: SettingCardProps) => {
  return (
    <div
      className="py-4 px-5 flex items-center gap-4 transition-colors bg-base active:bg-surface0"
      onClick={onClick}
    >
      <span className="text-overlay1">{icon}</span>
      <div className="flex flex-1 flex-col gap-1">
        <span className="text-sm text-text font-medium">{title}</span>
        <span className="text-xs text-subtext0">{description}</span>
      </div>
      {rightAction}
    </div>
  );
};
