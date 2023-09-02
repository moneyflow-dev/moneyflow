import { twMerge } from "tailwind-merge";

interface ProgressBarProps {
  progress: string;
  backgroundClassName?: string;
  progressClassName?: string;
}

export function ProgressBar({
  progress,
  backgroundClassName,
  progressClassName,
}: ProgressBarProps) {
  return (
    <div
      className={twMerge(
        "h-4 w-full bg-surface0 rounded-sm overflow-hidden",
        backgroundClassName,
      )}
    >
      <div
        className={twMerge("h-full rounded-sm bg-lavender", progressClassName)}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
