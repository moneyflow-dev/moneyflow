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

  async setIncomes(incomes: IncomesDTO) {
    await this.setState(incomes);
  }

  async createIncome(expense: CreateIncomeDTO) {
    const incomes = await this.getState();

    const id = uuidv4();
    const createdIncome: IncomeDTO = {
      ...expense,
      id,
      createdAt: Date.now(),
    };

    incomes[id] = createdIncome;

    await this.setState(incomes);
    return createdIncome;
  }

  async updateIncome(id: string, expense: CreateIncomeDTO) {
    const incomes = await this.getState();

    incomes[id] = { ...incomes[id], ...expense, id };

    await this.setState(incomes);
    return incomes[id];
  }

  async deleteIncome(id: string): Promise<void> {
    const incomes = await this.getState();

    delete incomes[id];

    await this.setState(incomes);
  }

  async deleteIncomesByAccounts(accountIds: string[]) {
    const incomes = await this.getState();

    await this.setState(
      Object.fromEntries(
        Object.entries(incomes).filter(
          ([_, expense]) => !accountIds.includes(expense.accountId),
        ),
      ),
    );
  }

  async deleteIncomesByCategories(categoryIds: string[]) {
    const incomes = await this.getState();

    await this.setState(
      Object.fromEntries(
        Object.entries(incomes).filter(
          ([_, expense]) => !categoryIds.includes(expense.categoryId),
        ),
      ),
    );
  }
}
