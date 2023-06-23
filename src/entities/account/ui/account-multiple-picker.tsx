import { Button } from "@shared/ui/buttons";
import {
  RadioLikeCheckboxGroup,
  RadioLikeCheckboxGroupProps,
} from "@shared/ui/checkboxes";
import { PlusIcon } from "@shared/ui/icons";
import { Link } from "@shared/ui/links";

export const AccountMultiplePicker = ({
  children,
  ...props
}: RadioLikeCheckboxGroupProps) => {
  return (
    <RadioLikeCheckboxGroup label="Choose accounts" {...props}>
      {children}
      <Link to="/accounts/create">
        <Button
          type="button"
          size="md"
          variant="outlinedOverlay1"
          className="gap-2.5 min-w-max"
        >
          <PlusIcon size="xs" />
          Add account
        </Button>
      </Link>
    </RadioLikeCheckboxGroup>
  );
};
