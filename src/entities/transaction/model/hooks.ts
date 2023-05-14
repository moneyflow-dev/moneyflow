import { useExpensesStore } from "./expenses-store";
import { useIncomesStore } from "./incomes-store";
import { Transaction, TransactionType } from "./models";
import { useTransfersStore } from "./transfers-store";

export const useTransactions = (): Transaction[] => {
  const { expenses } = useExpensesStore();
  const { incomes } = useIncomesStore();
  const { transfers } = useTransfersStore();

  return [
    ...Object.values(expenses).map((expense) => ({
      ...expense,
      type: TransactionType.expense,
    })),
    ...Object.values(incomes).map((income) => ({
      ...income,
      type: TransactionType.income,
    })),
    ...Object.values(transfers).map((transfer) => ({
      ...transfer,
      type: TransactionType.transfer,
    })),
  ];
};
