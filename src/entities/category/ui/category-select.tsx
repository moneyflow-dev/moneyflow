import { mapFlatToTree, mapTreeToFlat } from "@shared/lib/tree";
import {
  Select,
  SelectButton,
  SelectOption,
  SelectOptions,
  SelectProps,
} from "@shared/ui/selects";

import { createCategoryString } from "../lib/format";
import {
  ExpenseCategories,
  ExpenseCategoryID,
  IncomeCategories,
  IncomeCategoryID,
} from "../model/models";

interface ExpenseCategorySelectCategory {
  id: ExpenseCategoryID;
  title: string;
  parentId: ExpenseCategoryID | null;
}

interface IncomeCategorySelectCategory {
  id: IncomeCategoryID;
  title: string;
  parentId: IncomeCategoryID | null;
}

interface ExpenseCategorySelectProps
  extends SelectProps<ExpenseCategoryID | null, ExpenseCategoryID | null> {
  categories: ExpenseCategories;
}

interface IncomeCategorySelectProps
  extends SelectProps<IncomeCategoryID | null, IncomeCategoryID | null> {
  categories: IncomeCategories;
}

export function CategorySelect({
  categories,
  value,
  ...props
}: IncomeCategorySelectProps | ExpenseCategorySelectProps) {
  const categoriesTree = mapFlatToTree<
    IncomeCategoryID | ExpenseCategoryID,
    ExpenseCategorySelectCategory | IncomeCategorySelectCategory
  >(Object.values(categories), null);
  const flattenCategoriesTree = mapTreeToFlat(categoriesTree);

  return (
    <Select {...props}>
      <SelectButton
        value={value}
        notSelectedValue={null}
        placeholder="Tap to select"
      >
        {value && createCategoryString(categories, value)}
      </SelectButton>
      <SelectOptions className="max-h-52">
        {flattenCategoriesTree.map((category) => (
          <SelectOption
            key={category.value.id}
            value={category.value.id}
            style={{ paddingInlineStart: `${16 * category.depth}px` }}
          >
            {category.value.title}
          </SelectOption>
        ))}
      </SelectOptions>
    </Select>
  );
}
