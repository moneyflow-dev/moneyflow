import { DateTime } from "luxon";

export type ExpenseCategoryID = string;

export interface CreateExpenseCategory {
  title: string;
  parentId: ExpenseCategoryID | null;
}

export type UpdateExpenseCategory = CreateExpenseCategory;

export interface ExpenseCategory extends CreateExpenseCategory {
  id: ExpenseCategoryID;
  createdAt: DateTime;
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
  createdAt: DateTime;
}

export type IncomeCategories = Record<string, IncomeCategory>;
