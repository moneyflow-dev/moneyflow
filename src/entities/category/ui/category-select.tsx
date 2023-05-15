import { mapFlatToTree, mapTreeToFlat } from "@shared/lib/tree";
import { PlusIcon } from "@shared/ui/icons";
import { Link } from "@shared/ui/links";
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
  createCategoryButtonLink: string;
}

interface IncomeCategorySelectProps
  extends SelectProps<IncomeCategoryID | null, IncomeCategoryID | null> {
  categories: IncomeCategories;
  createCategoryButtonLink: string;
}

export function CategorySelect({
  categories,
  value,
  createCategoryButtonLink,
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
      <SelectOptions className="max-h-52 z-10">
        {flattenCategoriesTree.map((category) => (
          <SelectOption
            key={category.value.id}
            value={category.value.id}
            style={{ paddingInlineStart: `${category.depth}rem` }}
          >
            {category.value.title}
          </SelectOption>
        ))}
        <Link
          to={createCategoryButtonLink}
          className="flex gap-3 items-center py-2.5 px-4 text-subtext0 font-bold text-sm transition-colors active:bg-surface1"
        >
          <PlusIcon size="xs" />
          Add category
        </Link>
      </SelectOptions>
    </Select>
  );
}
