import { Preferences } from "@capacitor/preferences";
import { v4 as uuidv4 } from "uuid";

import { CreateIncomeDTO, IncomeDTO, IncomesDTO } from "./dtos";
import { IncomesAPI } from "./incomes-api.interface";

export class PreferencesIncomesAPI implements IncomesAPI {
  private async getState(): Promise<IncomesDTO> {
    const { value } = await Preferences.get({ key: "incomes" });
    if (value === null) {
      const state: IncomesDTO = {};
      await this.setState(state);
      return state;
    }
    return JSON.parse(value);
  }

  private async setState(state: IncomesDTO) {
    await Preferences.set({
      key: "incomes",
      value: JSON.stringify(state),
    });
  }

  async getIncomes() {
    return await this.getState();
  }

  async createIncome(expense: CreateIncomeDTO) {
    const expenses = await this.getState();

    const id = uuidv4();
    const createdIncome: IncomeDTO = {
      ...expense,
      id,
      createdAt: Date.now(),
    };

    expenses[id] = createdIncome;

    await this.setState(expenses);
    return createdIncome;
  }

  async updateIncome(id: string, expense: CreateIncomeDTO) {
    const expenses = await this.getState();

    expenses[id] = { ...expenses[id], ...expense, id };

    await this.setState(expenses);
    return expenses[id];
  }

  async deleteIncome(id: string): Promise<void> {
    const expenses = await this.getState();

    delete expenses[id];

    await this.setState(expenses);
  }

  async deleteIncomesByAccounts(accountIds: string[]) {
    const expenses = await this.getState();

    await this.setState(
      Object.fromEntries(
        Object.entries(expenses).filter(
          ([_, expense]) => !accountIds.includes(expense.accountId),
        ),
      ),
    );
  }

  async deleteIncomesByCategories(categoryIds: string[]) {
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
