export type ExpenseCategoryID = string;

export interface CreateExpenseCategoryDTO {
  title: string;
  parentId: ExpenseCategoryID | null;
}

export type UpdateExpenseCategoryDTO = CreateExpenseCategoryDTO;

export interface ExpenseCategoryDTO extends CreateExpenseCategoryDTO {
  id: ExpenseCategoryID;
}

export type ExpenseCategoriesDTO = Record<string, ExpenseCategoryDTO>;
