import { DateTime } from "luxon";

export type ExpenseID = string;

export interface CreateExpense {
  title: string;
  accountId: string;
  categoryId: string;
  amount: string;
  datetime: DateTime;
}

export type UpdateExpense = CreateExpense;

export interface Expense extends CreateExpense {
  id: ExpenseID;
  createdAt: DateTime;
}

export type Expenses = Record<ExpenseID, Expense>;
