import { Expense } from "@entities/transaction";

export const TransactionType = {
  expense: "expense",
} as const;
export type TransactionType =
  (typeof TransactionType)[keyof typeof TransactionType];

export interface TransactionListExpense extends Expense {
  type: "expense";
}

export type TransactionListTransaction = TransactionListExpense;
