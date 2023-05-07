import {
  ExpenseCategories,
  ExpenseCategoryID,
  IncomeCategories,
  IncomeCategoryID,
} from "../model/models";

export const createCategoryString = (
  categories: ExpenseCategories | IncomeCategories,
  categoryId: ExpenseCategoryID | IncomeCategoryID,
  delimiter = " / ",
): string => {
  const category = categories[categoryId];
  const titles: string[] = [category.title];

  let parentId = category.parentId;
  while (parentId !== null) {
    const parentCategory = categories[parentId];
    titles.push(parentCategory.title);
    parentId = parentCategory.parentId;
  }

  return titles.reverse().join(delimiter);
};
