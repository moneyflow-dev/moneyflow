export type IncomeCategoryID = string;

export interface CreateIncomeCategoryDTO {
  title: string;
  parentId: IncomeCategoryID | null;
}

export type UpdateIncomeCategoryDTO = CreateIncomeCategoryDTO;

export interface IncomeCategoryDTO extends CreateIncomeCategoryDTO {
  id: IncomeCategoryID;
  createdAt: number;
}

export type IncomeCategoriesDTO = Record<string, IncomeCategoryDTO>;
