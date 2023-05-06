import {
  CreateIncomeCategoryDTO,
  IncomeCategoriesDTO,
  IncomeCategoryDTO,
  IncomeCategoryID,
  UpdateIncomeCategoryDTO,
} from "./dtos";

export interface IncomeCategoriesAPI {
  getIncomeCategories(): Promise<IncomeCategoriesDTO>;
  createIncomeCategory(
    category: CreateIncomeCategoryDTO,
  ): Promise<IncomeCategoryDTO>;
  updateIncomeCategory(
    id: IncomeCategoryID,
    category: UpdateIncomeCategoryDTO,
  ): Promise<void>;
  deleteIncomeCategory(id: IncomeCategoryID): Promise<IncomeCategoryID[]>;
}
