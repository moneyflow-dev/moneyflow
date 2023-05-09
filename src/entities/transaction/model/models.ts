export type ExpenseID = string;

export interface CreateExpense {
  title: string;
  accountId: string;
  categoryId: string;
  amount: string;
  datetime: number;
}

export type UpdateExpense = CreateExpense;

export interface Expense extends CreateExpense {
  id: ExpenseID;
  createdAt: number;
}

export type Expenses = Record<ExpenseID, Expense>;
