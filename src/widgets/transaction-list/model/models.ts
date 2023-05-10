import { Expense, Income } from "@entities/transaction";

export const TransactionType = {
  expense: "expense",
  income: "income",
} as const;
export type TransactionType =
  (typeof TransactionType)[keyof typeof TransactionType];

export interface TransactionListExpense extends Expense {
  type: "expense";
}

export interface TransactionListIncome extends Income {
  type: "income";
}

export type TransactionListTransaction =
  | TransactionListExpense
  | TransactionListIncome;
