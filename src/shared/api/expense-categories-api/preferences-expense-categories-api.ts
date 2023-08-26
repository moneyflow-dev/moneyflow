import { Preferences } from "@capacitor/preferences";
import { v4 as uuidv4 } from "uuid";

import {
  CreateExpenseCategoryDTO,
  ExpenseCategoriesDTO,
  ExpenseCategoryDTO,
  ExpenseCategoryID,
} from "./dtos";
import { ExpenseCategoriesAPI } from "./expense-categories-api.interface";

export class PreferencesExpenseCategoriesAPI implements ExpenseCategoriesAPI {
  private async getState(): Promise<ExpenseCategoriesDTO> {
    const { value } = await Preferences.get({ key: "expense-categories" });
    if (value === null) {
      const state: ExpenseCategoriesDTO = {};
      await this.setState(state);
      return state;
    }
    return JSON.parse(value);
  }

  private async setState(state: ExpenseCategoriesDTO) {
    await Preferences.set({
      key: "expense-categories",
      value: JSON.stringify(state),
    });
  }

  async getExpenseCategories() {
    return await this.getState();
  }

  async setExpenseCategories(categories: ExpenseCategoriesDTO) {
    await this.setState(categories);
  }

  async createExpenseCategory(
    category: CreateExpenseCategoryDTO,
  ): Promise<ExpenseCategoryDTO> {
    const categories = await this.getState();

    const id = uuidv4();
    const createdCategory: ExpenseCategoryDTO = {
      ...category,
      id,
      createdAt: Date.now(),
    };

    categories[id] = createdCategory;

    await this.setState(categories);
    return createdCategory;
  }

  async updateExpenseCategory(id: string, category: CreateExpenseCategoryDTO) {
    const categories = await this.getState();

    categories[id] = { ...categories[id], ...category, id };

    await this.setState(categories);

    return categories[id];
  }

  private deleteCategoryTree(
    id: string,
    categories: ExpenseCategoriesDTO,
  ): ExpenseCategoryID[] {
    const deletedIds: ExpenseCategoryID[] = [id];

    delete categories[id];

    const subCategories = Object.values(categories).filter(
      (category) => category.parentId === id,
    );
    for (const subCategory of subCategories) {
      const subCategoryDeletedIds = this.deleteCategoryTree(
        subCategory.id,
        categories,
      );
      deletedIds.push(...subCategoryDeletedIds);
    }

    return deletedIds;
  }

  async deleteExpenseCategory(id: string) {
    const categories = await this.getState();

    const deletedIds = this.deleteCategoryTree(id, categories);

    await this.setState(categories);

    return deletedIds;
  }
}
