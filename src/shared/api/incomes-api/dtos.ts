export type IncomeID = string;

export interface CreateIncomeDTO {
  title: string;
  accountId: string;
  categoryId: string;
  amount: string;
  datetime: number;
}

export type UpdateIncomeDTO = CreateIncomeDTO;

export interface IncomeDTO extends CreateIncomeDTO {
  id: IncomeID;
  createdAt: number;
}

export type IncomesDTO = Record<IncomeID, IncomeDTO>;
