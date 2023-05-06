export type ExpenseCategoryID = string;

export interface CreateExpenseCategory {
  title: string;
  parentId: ExpenseCategoryID | null;
}

export type UpdateExpenseCategory = CreateExpenseCategory;

export interface ExpenseCategory extends CreateExpenseCategory {
  id: ExpenseCategoryID;
}

export type ExpenseCategories = Record<string, ExpenseCategory>;

export type IncomeCategoryID = string;

export interface CreateIncomeCategory {
  title: string;
  parentId: IncomeCategoryID | null;
}

export type UpdateIncomeCategory = CreateIncomeCategory;

export interface IncomeCategory extends CreateIncomeCategory {
  id: IncomeCategoryID;
}

export type IncomeCategories = Record<string, IncomeCategory>;
