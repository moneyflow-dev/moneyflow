import { Link } from "@shared/ui/links";

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
  const formattedAmount = `-${expense.formattedAmount}`;
  return (
    <Link to={`/expenses/${expense.id}`}>
      <TransactionCard
        title={expense.title}
        formattedAmount={formattedAmount}
        time={expense.time}
        firstProperty={{ title: "Category", value: expense.categoryTitle }}
        secondProperty={{ title: "Account", value: expense.accountTitle }}
        className="border-green"
        amountClassName="text-green"
      />
    </Link>
  );
};
