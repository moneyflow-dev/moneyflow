import { Button } from "@shared/ui/buttons";
import {
  RadioLikeCheckboxGroup,
  RadioLikeCheckboxGroupProps,
} from "@shared/ui/checkboxes";
import { PlusIcon } from "@shared/ui/icons";
import { Link } from "@shared/ui/links";

export const CurrencyMultiplePicker = ({
  children,
  ...props
}: RadioLikeCheckboxGroupProps) => {
  return (
    <RadioLikeCheckboxGroup label="Choose currencies" {...props}>
      {children}
      <Link to="/currencies/create">
        <Button
          type="button"
          size="md"
          variant="outlinedOverlay1"
          className="gap-2.5 min-w-max"
        >
          <PlusIcon size="xs" />
          Add currency
        </Button>
      </Link>
    </RadioLikeCheckboxGroup>
  );
};
