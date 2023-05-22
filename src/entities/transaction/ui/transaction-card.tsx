import { twMerge } from "tailwind-merge";

interface TransactionCardPropertyProps {
  title: string;
  value: string;
  className?: string;
}

const TransactionCardProperty = ({
  title,
  value,
  className,
}: TransactionCardPropertyProps) => {
  return (
    <div className={twMerge("flex flex-col gap-0.5", className)}>
      <span className="text-xxs text-subtext0">{title}</span>
      <span className="text-xs text-subtext0 font-medium">{value}</span>
    </div>
  );
};

interface TransactionLayoutProps {
  title: string;
  formattedAmount: string;
  time: string;
  firstProperty: TransactionCardPropertyProps;
  secondProperty: TransactionCardPropertyProps;
  amountClassName?: string;
  className?: string;
}

export const TransactionCard = ({
  title,
  formattedAmount,
  time,
  firstProperty,
  secondProperty,
  className,
  amountClassName,
}: TransactionLayoutProps) => {
  return (
    <div
      className={twMerge(
        "flex flex-col gap-2 rounded border-l-[1rem]",
        "py-3 pl-2.5 pr-5 transition-colors bg-surface0 active:bg-surface1",
        className,
      )}
    >
      <div className="flex gap-4 justify-between">
        <span className="text-sm font-bold text-text truncate">{title}</span>
        <span
          className={twMerge(
            "text-sm font-bold pt-1 whitespace-nowrap",
            amountClassName,
          )}
        >
          {formattedAmount}
        </span>
      </div>
      <div className="flex justify-between items-end gap-4">
        <div className="flex flex-1 justify-between gap-4">
          <TransactionCardProperty className="flex-1" {...firstProperty} />
          <TransactionCardProperty className="flex-1" {...secondProperty} />
        </div>
        <span className="text-xxs text-subtext0">{time}</span>
      </div>
    </div>
  );
};
