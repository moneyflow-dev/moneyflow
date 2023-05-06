import {
  CreateExpenseCategoryDTO,
  ExpenseCategoriesDTO,
  ExpenseCategoryDTO,
  ExpenseCategoryID,
  UpdateExpenseCategoryDTO,
} from "./dtos";

export interface ExpenseCategoriesAPI {
  getExpenseCategories(): Promise<ExpenseCategoriesDTO>;
  createExpenseCategory(
    category: CreateExpenseCategoryDTO,
  ): Promise<ExpenseCategoryDTO>;
  updateExpenseCategory(
    id: ExpenseCategoryID,
    category: UpdateExpenseCategoryDTO,
  ): Promise<void>;
  deleteExpenseCategory(id: ExpenseCategoryID): Promise<ExpenseCategoryID[]>;
}
