import { Link } from "@shared/ui/links";

import { createExpenseAmountString } from "../lib";
import { ExpenseID } from "../model/models";

import { TransactionCard } from "./transaction-card";

interface ExpenseCardExpense {
  id: ExpenseID;
  title: string;
  formattedAmount: string;
  categoryTitle: string;
  accountTitle: string;
  time: string;
}

interface ExpenseCardProps {
  expense: ExpenseCardExpense;
}

export const ExpenseCard = ({ expense }: ExpenseCardProps) => {
  const formattedAmount = createExpenseAmountString(expense.formattedAmount);
  return (
    <Link to={`/expenses/${expense.id}`}>
      <TransactionCard
        title={expense.title}
        formattedAmount={formattedAmount}
        time={expense.time}
        firstProperty={{ title: "Category", value: expense.categoryTitle }}
        secondProperty={{ title: "Account", value: expense.accountTitle }}
        className="border-red"
        amountClassName="text-red"
      />
    </Link>
  );
};
