import { AccountID } from "../accounts-api/dtos";
import { IncomeCategoryID } from "../income-categories-api/dtos";

import {
  CreateIncomeDTO,
  IncomeDTO,
  IncomeID,
  IncomesDTO,
  UpdateIncomeDTO,
} from "./dtos";

export interface IncomesAPI {
  getIncomes(): Promise<IncomesDTO>;
  createIncome(expense: CreateIncomeDTO): Promise<IncomeDTO>;
  updateIncome(id: IncomeID, expense: UpdateIncomeDTO): Promise<IncomeDTO>;
  deleteIncome(id: IncomeID): Promise<void>;
  deleteIncomesByAccounts(accountIds: AccountID[]): Promise<void>;
  deleteIncomesByCategories(categoryIds: IncomeCategoryID[]): Promise<void>;
}
