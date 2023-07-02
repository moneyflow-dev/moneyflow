import { useEffect, useMemo, useRef, useState } from "react";
import { Virtuoso } from "react-virtuoso";

import { useDebounce, useElementIsFocused } from "@shared/lib/hooks";
import {
  Autocomplete,
  AutocompleteOptions,
  AutocompleteOption,
} from "@shared/ui/comboboxes";
import { Input, InputProps } from "@shared/ui/inputs";

import { Transaction, TransactionID } from "../model/models";

type AmountColor = "red" | "green" | "blue";

export interface TransactionTitleAutocompleteTransaction
  extends Pick<Transaction, "title" | "id"> {
  formattedAmount: string;
}

const amountColorToClassName: Record<AmountColor, string> = {
  red: "text-red",
  green: "text-green",
  blue: "text-blue",
};

export interface TransactionTitleAutocompleteProps {
  transactions: TransactionTitleAutocompleteTransaction[];
  searchTransactionsByTitle: (
    transactions: TransactionTitleAutocompleteTransaction[],
    searchTerm: string,
  ) => TransactionTitleAutocompleteTransaction[];
  inputProps: InputProps & { ref: React.RefCallback<HTMLInputElement> };
  title: string;
  onSelect: (value: TransactionID) => void;
  amountColor: AmountColor;
  className?: string;
}

export function TransactionTitleAutocomplete({
  transactions,
  searchTransactionsByTitle,
  title,
  onSelect,
  inputProps: { ref: inputPropsRef, ...inputProps },
  amountColor,
  className,
}: TransactionTitleAutocompleteProps) {
  const debouncedTitle = useDebounce(title, 300);
  const filteredTransactions = useMemo(
    () => searchTransactionsByTitle(transactions, debouncedTitle),
    [debouncedTitle, searchTransactionsByTitle, transactions],
  );
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const inputIsFocused = useElementIsFocused(inputRef);

  const close = () => setIsOpen(false);
  const selectAndClose = (value: TransactionID) => {
    onSelect(value);
    close();
  };

  useEffect(() => {
    setIsOpen(
      Boolean(title.trim() && filteredTransactions.length && inputIsFocused),
    );
  }, [title, filteredTransactions, inputIsFocused]);

  return (
    <Autocomplete className={className}>
      <Input
        label="Title"
        styleFocused={isOpen}
        ref={(instance) => {
          inputPropsRef(instance);
          inputRef.current = instance;
        }}
        {...inputProps}
      />
      {
        <AutocompleteOptions
          isOpen={isOpen}
          onClose={close}
          className="max-h-60 z-10"
        >
          <Virtuoso
            style={{ height: "15rem" }}
            overscan={270}
            data={filteredTransactions}
            itemContent={(_, transaction) => (
              <AutocompleteOption
                key={transaction.id}
                className="flex justify-between gap-4"
                value={transaction.id}
                onSelect={selectAndClose}
              >
                <span className="text-sm truncate">{transaction.title}</span>
                <span
                  className={`text-sm font-bold whitespace-nowrap ${amountColorToClassName[amountColor]}`}
                >
                  {transaction.formattedAmount}
                </span>
              </AutocompleteOption>
            )}
          />
        </AutocompleteOptions>
      }
    </Autocomplete>
  );
}
