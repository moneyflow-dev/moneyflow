import { AccountID } from "../accounts-api/dtos";

export type TransferID = string;

export interface CreateTransferAccountDTO {
  accountId: AccountID;
  amount: string;
}

export interface CreateTransferDTO {
  title: string;
  fromAccount: CreateTransferAccountDTO;
  toAccount: CreateTransferAccountDTO;
  datetime: number;
}

export type UpdateTransferDTO = CreateTransferDTO;

export interface TransferDTO extends CreateTransferDTO {
  id: TransferID;
  createdAt: number;
}

export type TransfersDTO = Record<TransferID, TransferDTO>;
