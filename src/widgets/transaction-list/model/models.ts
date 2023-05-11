import { Expense, Income, Transfer } from "@entities/transaction";

export const TransactionType = {
  expense: "expense",
  income: "income",
  transfer: "transfer",
} as const;
export type TransactionType =
  (typeof TransactionType)[keyof typeof TransactionType];

export interface TransactionListExpense extends Expense {
  type: "expense";
}

export interface TransactionListIncome extends Income {
  type: "income";
}

export interface TransactionListTransfer extends Transfer {
  type: "transfer";
}

export type TransactionListTransaction =
  | TransactionListExpense
  | TransactionListIncome
  | TransactionListTransfer;
