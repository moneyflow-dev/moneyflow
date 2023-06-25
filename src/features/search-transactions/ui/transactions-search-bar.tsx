import { SearchIcon } from "@shared/ui/icons";
import { Input } from "@shared/ui/inputs";

interface TransactionsSearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export const TransactionsSearchBar = ({
  value,
  onChange,
}: TransactionsSearchBarProps) => {
  return (
    <Input
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder="Search"
      leftAddon={<SearchIcon size="sm" />}
    ></Input>
  );
};
