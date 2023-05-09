import { Preferences } from "@capacitor/preferences";
import { v4 as uuidv4 } from "uuid";

import { CreateExpenseDTO, ExpenseDTO, ExpensesDTO } from "./dtos";
import { ExpensesAPI } from "./expenses-api.interface";

export class PreferencesExpensesAPI implements ExpensesAPI {
  private async getState(): Promise<ExpensesDTO> {
    const { value } = await Preferences.get({ key: "expenses" });
    if (value === null) {
      const state: ExpensesDTO = {};
      await this.setState(state);
      return state;
    }
    return JSON.parse(value);
  }

  private async setState(state: ExpensesDTO) {
    await Preferences.set({
      key: "expenses",
      value: JSON.stringify(state),
    });
  }

  async getExpenses() {
    return await this.getState();
  }

  async createExpense(expense: CreateExpenseDTO) {
    const expenses = await this.getState();

    const id = uuidv4();
    const createdExpense: ExpenseDTO = {
      ...expense,
      id,
      createdAt: Date.now(),
    };

    expenses[id] = createdExpense;

    await this.setState(expenses);
    return createdExpense;
  }

  async updateExpense(id: string, expense: CreateExpenseDTO) {
    const expenses = await this.getState();

    expenses[id] = { ...expenses[id], ...expense, id };

    await this.setState(expenses);
  }

  async deleteExpense(id: string): Promise<void> {
    const expenses = await this.getState();

    delete expenses[id];

    await this.setState(expenses);
  }

  async deleteExpensesByAccounts(accountIds: string[]) {
    const expenses = await this.getState();

    await this.setState(
      Object.fromEntries(
        Object.entries(expenses).filter(
          ([_, expense]) => !accountIds.includes(expense.accountId),
        ),
      ),
    );
  }

  async deleteExpensesByCategories(categoryIds: string[]) {
    const expenses = await this.getState();

    await this.setState(
      Object.fromEntries(
        Object.entries(expenses).filter(
          ([_, expense]) => !categoryIds.includes(expense.categoryId),
        ),
      ),
    );
  }
}
