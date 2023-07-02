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

export type IncomeID = string;

export interface CreateIncome {
  title: string;
  accountId: string;
  categoryId: string;
  amount: string;
  datetime: DateTime;
}

export type UpdateIncome = CreateIncome;

export interface Income extends CreateIncome {
  id: IncomeID;
  createdAt: DateTime;
}

export type Incomes = Record<IncomeID, Income>;

export type TransferID = string;

export interface CreateTransferAccount {
  accountId: string;
  amount: string;
}

export interface CreateTransfer {
  title: string;
  fromAccount: CreateTransferAccount;
  toAccount: CreateTransferAccount;
  datetime: DateTime;
}

export type UpdateTransfer = CreateTransfer;

export interface Transfer extends CreateTransfer {
  id: TransferID;
  createdAt: DateTime;
}

export type Transfers = Record<TransferID, Transfer>;

export type TransactionID = ExpenseID | IncomeID | TransferID;

export const TransactionType = {
  expense: "expense",
  income: "income",
  transfer: "transfer",
} as const;
export type TransactionType =
  (typeof TransactionType)[keyof typeof TransactionType];

export interface TypedExpense extends Expense {
  type: "expense";
}

export interface TypedIncome extends Income {
  type: "income";
}

export interface TypedTransfer extends Transfer {
  type: "transfer";
}

export type Transaction = TypedExpense | TypedIncome | TypedTransfer;
