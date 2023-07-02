import { twMerge } from "tailwind-merge";

interface AutocompleteOptionProps<T> {
  value: T;
  onSelect: (value: T) => void;
  className?: string;
  children?: React.ReactNode;
}

export function AutocompleteOption<T>({
  value,
  onSelect,
  className,
  children,
}: AutocompleteOptionProps<T>) {
  return (
    <div
      className={twMerge(
        "py-2.5 px-4 text-text text-sm transition-colors active:bg-surface1",
        className,
      )}
      onMouseUp={() => onSelect(value)}
    >
      {children}
    </div>
  );
}
