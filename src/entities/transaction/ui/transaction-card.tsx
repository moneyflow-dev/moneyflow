import { twMerge } from "tailwind-merge";

interface TransactionCardPropertyProps {
  title: string;
  value: string;
}

const TransactionCardProperty = ({
  title,
  value,
}: TransactionCardPropertyProps) => {
  return (
    <div className="flex flex-col gap-0.5">
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
      <div className="flex justify-between">
        <span className="text-sm font-bold text-text">{title}</span>
        <span className={twMerge("text-sm font-bold pt-1", amountClassName)}>
          {formattedAmount}
        </span>
      </div>
      <div className="flex justify-between items-end">
        <div className="flex justify-between gap-4 w-[65%]">
          <TransactionCardProperty {...firstProperty} />
          <TransactionCardProperty {...secondProperty} />
        </div>
        <span className="text-xxs text-subtext0">{time}</span>
      </div>
    </div>
  );
};
