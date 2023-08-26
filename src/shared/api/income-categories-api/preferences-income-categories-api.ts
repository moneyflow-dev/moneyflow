import { Preferences } from "@capacitor/preferences";
import { v4 as uuidv4 } from "uuid";

import {
  CreateIncomeCategoryDTO,
  IncomeCategoriesDTO,
  IncomeCategoryDTO,
  IncomeCategoryID,
} from "./dtos";
import { IncomeCategoriesAPI } from "./income-categories-api.interface";

export class PreferencesIncomeCategoriesAPI implements IncomeCategoriesAPI {
  private async getState(): Promise<IncomeCategoriesDTO> {
    const { value } = await Preferences.get({ key: "income-categories" });
    if (value === null) {
      const state: IncomeCategoriesDTO = {};
      await this.setState(state);
      return state;
    }
    return JSON.parse(value);
  }

  private async setState(state: IncomeCategoriesDTO) {
    await Preferences.set({
      key: "income-categories",
      value: JSON.stringify(state),
    });
  }

  async getIncomeCategories() {
    return await this.getState();
  }

  async setIncomeCategories(categories: IncomeCategoriesDTO) {
    await this.setState(categories);
  }

  async createIncomeCategory(
    category: CreateIncomeCategoryDTO,
  ): Promise<IncomeCategoryDTO> {
    const categories = await this.getState();

    const id = uuidv4();
    const createdCategory: IncomeCategoryDTO = {
      ...category,
      id,
      createdAt: Date.now(),
    };

    categories[id] = createdCategory;

    await this.setState(categories);
    return createdCategory;
  }

  async updateIncomeCategory(id: string, category: CreateIncomeCategoryDTO) {
    const categories = await this.getState();

    categories[id] = { ...categories[id], ...category, id };

    await this.setState(categories);

    return categories[id];
  }

  private deleteCategoryTree(
    id: string,
    categories: IncomeCategoriesDTO,
  ): IncomeCategoryID[] {
    const deletedIds: IncomeCategoryID[] = [id];

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

  async deleteIncomeCategory(id: string) {
    const categories = await this.getState();

    const deletedIds = this.deleteCategoryTree(id, categories);

    await this.setState(categories);

    return deletedIds;
  }
}
