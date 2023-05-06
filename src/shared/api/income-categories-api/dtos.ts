export type IncomeCategoryID = string;

export interface CreateIncomeCategoryDTO {
  title: string;
  parentId: IncomeCategoryID | null;
}

export type UpdateIncomeCategoryDTO = CreateIncomeCategoryDTO;

export interface IncomeCategoryDTO extends CreateIncomeCategoryDTO {
  id: IncomeCategoryID;
}

export type IncomeCategoriesDTO = Record<string, IncomeCategoryDTO>;
